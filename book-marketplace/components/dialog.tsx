"use client"

import { useEffect, useRef } from "react";

type Props = {
   children: React.ReactNode,
   shouldOpenWithTime?: boolean,
   timeInMs?: number
}

export default function Dialog(props: Props){
   const dialog = useRef<HTMLDialogElement>(null);

   useEffect(() => {
      if(props.shouldOpenWithTime){
         const timer = setTimeout(() => {
            dialog.current?.showModal();
         }, props.timeInMs || 100000);
      
         return () => clearTimeout(timer);
      }
   },[])
   

   return (
      <dialog ref={dialog} className="">
         <button className="absolute top-0 right-2 text-2xl outline-none" onClick={e => dialog.current?.close()}>&times;</button>
         {props.children}
         <div className="flex justify-evenly items-center">

         </div>
      </dialog>
   )
}