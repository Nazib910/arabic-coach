"use client";
import {useEffect,useState} from "react";
import {parseChecks,type CheckMap,type LessonCheck} from "./checkpoint";
export function useCheckProgress(userId:string){
 const key=`arabic-coach-checks-v1:${userId}`;
 const [checks,setChecks]=useState<CheckMap>({}),[storageError,setStorageError]=useState(false);
 useEffect(()=>{
  const load=()=>{try{setChecks(parseChecks(JSON.parse(localStorage.getItem(key)??"{}")));}catch{setStorageError(true);}};
  const frame=requestAnimationFrame(load);
  const change=(event:StorageEvent)=>{if(event.key===key)load();};
  window.addEventListener("storage",change);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener("storage",change);};
 },[key]);
 function save(result:LessonCheck){
  const next={...checks,[result.day]:result};
  setChecks(next);
  try{localStorage.setItem(key,JSON.stringify(next));setStorageError(false);}catch{setStorageError(true);}
 }
 return {checks,save,storageError};
}
