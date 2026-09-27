import {test} from "node:test";
import assert from "node:assert/strict";
import type {SupabaseClient} from "@supabase/supabase-js";
import {hashIpForLimit,getClientIp,quotaResponse} from "./rateLimiter";
test("IP identifiers use keyed SHA256, not a collision-prone short hash",()=>{
 const secret="a".repeat(32);assert.match(hashIpForLimit('192.0.2.1',secret),/^[a-f0-9]{64}$/);
 assert.notEqual(hashIpForLimit('192.0.2.1',secret),hashIpForLimit('192.0.2.2',secret));assert.throws(()=>hashIpForLimit('x',''));
});
test("untrusted forwarding headers cannot select a login quota identity",()=>{
 assert.equal(getClientIp(new Headers({'x-forwarded-for':'fake'})),'unknown');
 assert.equal(getClientIp(new Headers({'x-vercel-forwarded-for':'192.0.2.1'})),'192.0.2.1');
});
test("migration-free release makes no paid API quota RPC calls",async()=>{
 const previous=process.env.API_QUOTAS_ENABLED;delete process.env.API_QUOTAS_ENABLED;
 try {let called=false;const client={rpc:async()=>{called=true;return{data:null,error:null};}} as unknown as SupabaseClient;
 assert.equal((await quotaResponse(client,'tutor'))?.status,503);assert.equal(called,false);
 }finally{if(previous===undefined)delete process.env.API_QUOTAS_ENABLED;else process.env.API_QUOTAS_ENABLED=previous;}
});
test("enabled quotas fail closed, and valid limits return retry-after",async()=>{
 const previous=process.env.API_QUOTAS_ENABLED;process.env.API_QUOTAS_ENABLED='true';
 try{const client=(data:unknown,error:unknown=null)=>({rpc:async()=>({data,error})}) as unknown as SupabaseClient;
 assert.equal((await quotaResponse(client(null,{message:'missing function'}),'tts'))?.status,503);
 const denied=await quotaResponse(client({allowed:false,reset_at:new Date(Date.now()+60000).toISOString()}),'tutor');assert.equal(denied?.status,429);assert.ok(Number(denied?.headers.get('Retry-After'))>0);
 assert.equal(await quotaResponse(client({allowed:true,reset_at:new Date().toISOString()}),'tutor'),null);
 }finally{if(previous===undefined)delete process.env.API_QUOTAS_ENABLED;else process.env.API_QUOTAS_ENABLED=previous;}
});
