-- Transactional distributed quotas; callers cannot choose limits, time or another user.
create table public.api_quota (
  bucket text primary key,
  used integer not null check (used >= 0),
  expires_at timestamptz not null
);
alter table public.api_quota enable row level security;
revoke all on public.api_quota from public, anon, authenticated;

create or replace function public.consume_api_quota(p_action text, p_ip_hash text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid := auth.uid();
  v_limit integer;
  v_seconds integer;
  v_key text;
  v_used integer;
  v_expires timestamptz;
  v_now timestamptz := clock_timestamp();
begin
  if p_action = 'login' then
    -- Anonymous clients can only consume this shared login quota, never clear it.
    if p_ip_hash is null or p_ip_hash !~ '^[a-f0-9]{64}$' then raise exception 'invalid login bucket'; end if;
    v_key := 'login:' || p_ip_hash; v_limit := 8; v_seconds := 300;
  elsif p_action in ('tutor','tts') then
    if v_uid is null then raise insufficient_privilege; end if;
    v_key := p_action || ':' || v_uid::text;
    v_limit := case when p_action='tutor' then 15 else 120 end; v_seconds := 3600;
  else raise exception 'unsupported action'; end if;
  insert into public.api_quota(bucket,used,expires_at)
  values(v_key,1,v_now+make_interval(secs=>v_seconds))
  on conflict(bucket) do update set
    used=case when public.api_quota.expires_at<=v_now then 1 else least(public.api_quota.used+1,v_limit+1) end,
    expires_at=case when public.api_quota.expires_at<=v_now then v_now+make_interval(secs=>v_seconds) else public.api_quota.expires_at end
  returning used,expires_at into v_used,v_expires;
  delete from public.api_quota where expires_at < v_now - interval '1 day';
  return jsonb_build_object('allowed',v_used<=v_limit,'remaining',greatest(0,v_limit-v_used),'reset_at',v_expires);
end; $$;
revoke all on function public.consume_api_quota(text,text) from public;
grant execute on function public.consume_api_quota(text,text) to anon,authenticated;

-- Lock allocation AND insert in one transaction. No leaked session locks or MAX+1 race.
create or replace function public.save_tutor_attempt(p_day integer,p_title text,p_answers jsonb,p_confidence integer,p_feedback jsonb,p_model text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_user uuid := auth.uid(); v_number integer; v_id uuid;
begin
  if v_user is null then raise insufficient_privilege; end if;
  if p_day not between 1 and 400 or p_confidence not between 1 and 5 or jsonb_typeof(p_answers)<>'array' or jsonb_array_length(p_answers)>20 then raise exception 'invalid attempt'; end if;
  perform pg_advisory_xact_lock(hashtextextended(v_user::text || ':' || p_day::text,0));
  select greatest(2,coalesce(max(attempt_number),1)+1) into v_number from public.lesson_attempts where user_id=v_user and day=p_day;
  insert into public.lesson_attempts(user_id,day,lesson_title,answers,confidence,completed,feedback,score,model_id,attempt_number)
  values(v_user,p_day,p_title,p_answers,p_confidence,false,p_feedback,(p_feedback->>'score')::integer,p_model,v_number) returning id into v_id;
  return v_id;
end; $$;
revoke all on function public.save_tutor_attempt(integer,text,jsonb,integer,jsonb,text) from public;
grant execute on function public.save_tutor_attempt(integer,text,jsonb,integer,jsonb,text) to authenticated;
