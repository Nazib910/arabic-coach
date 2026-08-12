create extension if not exists pgcrypto;
create extension if not exists vector;

create type public.mastery_status as enum ('new','learning','unstable','stable','mastered');

create table public.learner_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  native_language text default 'Bengali',
  target_variant text default 'Modern Standard Arabic',
  current_level text default 'basic',
  daily_minutes integer default 60 check (daily_minutes between 10 and 240),
  learning_goal text default 'Balanced listening, speaking, reading, and writing',
  preferred_style text default 'English support with increasing Arabic immersion',
  current_day integer default 1 check (current_day between 1 and 400),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.lesson_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day integer not null check (day between 1 and 400),
  lesson_title text not null,
  answers jsonb not null default '[]'::jsonb,
  confidence integer not null default 3 check (confidence between 1 and 5),
  completed boolean not null default false,
  feedback jsonb,
  model_id text,
  score integer check (score between 0 and 100),
  attempt_number integer not null default 1,
  time_spent_minutes integer check (time_spent_minutes between 0 and 600),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, day, attempt_number)
);

create table public.skill_mastery (
  user_id uuid not null references auth.users(id) on delete cascade,
  skill text not null check (skill in ('reading','writing','listening','speaking','grammar','vocabulary','pronunciation','fluency')),
  score numeric(5,2) not null default 0 check (score between 0 and 100),
  sample_count integer not null default 0,
  trend numeric(5,2) not null default 0,
  last_assessed_at timestamptz,
  updated_at timestamptz default now() not null,
  primary key(user_id, skill)
);

create table public.error_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  repair_code text not null check (repair_code in ('P','S','M','G','V','C','F')),
  category text not null,
  error_pattern text not null,
  occurrences integer not null default 1,
  status public.mastery_status not null default 'learning',
  examples jsonb not null default '[]'::jsonb,
  first_seen_day integer,
  last_seen_day integer,
  next_review_day integer,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, category, error_pattern)
);

create table public.vocabulary_mastery (
  user_id uuid not null references auth.users(id) on delete cascade,
  word text not null,
  recognition_score numeric(5,2) not null default 0,
  production_score numeric(5,2) not null default 0,
  correct_count integer not null default 0,
  incorrect_count integer not null default 0,
  status public.mastery_status not null default 'new',
  last_reviewed_at timestamptz,
  next_review_at timestamptz,
  example_sentence text,
  updated_at timestamptz default now() not null,
  primary key(user_id, word)
);

create table public.memory_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  through_day integer not null check (through_day between 1 and 400),
  summary text not null,
  strengths jsonb not null default '[]'::jsonb,
  weaknesses jsonb not null default '[]'::jsonb,
  effective_methods jsonb not null default '[]'::jsonb,
  next_targets jsonb not null default '[]'::jsonb,
  context_tokens integer,
  created_at timestamptz default now() not null,
  unique(user_id, through_day)
);

create table public.checkpoint_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day integer not null check (day between 1 and 400),
  overall_score integer check (overall_score between 0 and 100),
  skill_scores jsonb not null default '{}'::jsonb,
  teacher_report jsonb not null default '{}'::jsonb,
  next_block_plan jsonb not null default '{}'::jsonb,
  model_id text,
  created_at timestamptz default now() not null,
  unique(user_id, day)
);

create index lesson_attempts_user_updated_idx on public.lesson_attempts(user_id, updated_at desc);
create index lesson_attempts_user_day_idx on public.lesson_attempts(user_id, day);
create index error_ledger_active_idx on public.error_ledger(user_id, status, next_review_day);
create index vocabulary_review_idx on public.vocabulary_mastery(user_id, next_review_at);
create index memory_snapshots_user_day_idx on public.memory_snapshots(user_id, through_day desc);

create or replace function public.set_updated_at() returns trigger language plpgsql security invoker set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;
create trigger learner_profiles_updated before update on public.learner_profiles for each row execute function public.set_updated_at();
create trigger lesson_attempts_updated before update on public.lesson_attempts for each row execute function public.set_updated_at();
create trigger skill_mastery_updated before update on public.skill_mastery for each row execute function public.set_updated_at();
create trigger error_ledger_updated before update on public.error_ledger for each row execute function public.set_updated_at();
create trigger vocabulary_mastery_updated before update on public.vocabulary_mastery for each row execute function public.set_updated_at();

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.learner_profiles(id,email,display_name)
  values(new.id,new.email,coalesce(new.raw_user_meta_data->>'display_name',split_part(coalesce(new.email,''),'@',1)));
  insert into public.skill_mastery(user_id,skill)
  select new.id, skill from unnest(array['reading','writing','listening','speaking','grammar','vocabulary','pronunciation','fluency']) skill;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table public.learner_profiles enable row level security;
alter table public.lesson_attempts enable row level security;
alter table public.skill_mastery enable row level security;
alter table public.error_ledger enable row level security;
alter table public.vocabulary_mastery enable row level security;
alter table public.memory_snapshots enable row level security;
alter table public.checkpoint_reports enable row level security;

create policy "profiles own read" on public.learner_profiles for select using ((select auth.uid()) = id);
create policy "profiles own update" on public.learner_profiles for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "attempts own read" on public.lesson_attempts for select using ((select auth.uid()) = user_id);
create policy "attempts own insert" on public.lesson_attempts for insert with check ((select auth.uid()) = user_id);
create policy "attempts own update" on public.lesson_attempts for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "attempts own delete" on public.lesson_attempts for delete using ((select auth.uid()) = user_id);

create policy "mastery own read" on public.skill_mastery for select using ((select auth.uid()) = user_id);
create policy "mastery own insert" on public.skill_mastery for insert with check ((select auth.uid()) = user_id);
create policy "mastery own update" on public.skill_mastery for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "errors own all" on public.error_ledger for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "vocab own all" on public.vocabulary_mastery for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "memory own all" on public.memory_snapshots for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "checkpoints own all" on public.checkpoint_reports for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

grant usage on schema public to authenticated;
grant select, update on public.learner_profiles to authenticated;
grant select, insert, update, delete on public.lesson_attempts to authenticated;
grant select, insert, update on public.skill_mastery to authenticated;
grant select, insert, update, delete on public.error_ledger to authenticated;
grant select, insert, update, delete on public.vocabulary_mastery to authenticated;
grant select, insert, update, delete on public.memory_snapshots to authenticated;
grant select, insert, update, delete on public.checkpoint_reports to authenticated;
