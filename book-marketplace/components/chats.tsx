
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense } from "react";
import ClientSideRoute from "./clientsideroute";
import { getServerSession } from "next-auth";
import Tooltip from "./tooltip";


async function Chats(){

   const {data:session} = useSession()

   if(!session){
      return (
         <div className="border-2 border-primary rounded-lg px-4 py-2">
            <h1 className="font-semibold text-[32px] text-center">Messaggi</h1>
            <p className="text-center">Devi essere loggato per vedere i tuoi messaggi</p>
         </div>
      )
   }
   else {
      return (
         <div className="border-2 border-primary rounded-lg px-4 py-2">
            <h1 className="font-semibold text-[32px] text-center">Messaggi</h1>
            <Suspense fallback={<SuspenseChat />}>
            <div>
               <p>Messaggio</p>
            </div> 
            </Suspense>
         </div>
      ) 
   }
}

function SuspenseChat(){
   return (
      <div className="flex flex-col gap-4 my-4">
         <div className="shadow p-4 max-w-sm w-full mx-auto border border-slate-300 rounded-sm">
            <div className="animate-pulse flex  space-x-4">
               <div className="rounded-full bg-slate-300 h-10 w-10"></div>
               <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-300 rounded w-1/3"></div>
                  <div className="space-y-3">
                     <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                     </div>
                     <div className="h-2 bg-slate-300 rounded"></div>
                  </div>
               </div>
            </div>
         </div>
         <div className="shadow p-4 max-w-sm w-full mx-auto border border-slate-300 rounded-sm">
            <div className="animate-pulse flex  space-x-4">
               <div className="rounded-full bg-slate-300 h-10 w-10"></div>
               <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-300 rounded w-1/3"></div>
                  <div className="space-y-3">
                     <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                     </div>
                     <div className="h-2 bg-slate-300 rounded"></div>
                  </div>
               </div>
            </div>
         </div>
         <div className="shadow p-4 max-w-sm w-full mx-auto border border-slate-300 rounded-sm">
            <div className="animate-pulse flex  space-x-4">
               <div className="rounded-full bg-slate-300 h-10 w-10"></div>
               <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-300 rounded w-1/3"></div>
                  <div className="space-y-3">
                     <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                     </div>
                     <div className="h-2 bg-slate-300 rounded"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default async function NewChats(){
   const session = await getServerSession(authOptions)

   if(!session){
      return (
         <div className="w-full bg-white max-h-[380px] rounded-[32px] drop-shadow-my p-6">
            <h2 className="font-bold text-2xl pb-2">Chat</h2>
            <p className="font-semibold"><Link href={"/login"} className="underline">Accedi</Link> per vedere i tuoi messaggi. </p>
         </div>
      )
   } else {
      return (
         <div className="w-full bg-white max-h-[380px] rounded-[32px] drop-shadow-my p-6">
            <h2 className="font-bold text-2xl pb-2">Chat</h2>
            <div className="py-2 flex flex-col gap-6">
               <Messaggino />
               <Messaggino />
               <Messaggino />
            </div>
            <ClientSideRoute route="/chats">
               <div className=" mt-4 text-center rounded-xl bg-secondary font-bold py-3 px-[65px]">Nuovo Messaggio</div>
            </ClientSideRoute>
         </div>
      )
   }
}

function Messaggino(){
   return (
      <ClientSideRoute route="/chats/1"> 
         <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
               <div className="w-[30px] h-[30px] bg-primary rounded-full"></div>
               <div className="flex flex-col gap-1">
                  <p className="font-semibold">Nome Cognome</p>
                  <p className="text-xs">Ultimo messaggio</p>
               </div>
            </div>
            <p className="font-light text-gray-500">2:50 PM</p>
         </div>
      </ClientSideRoute>
   )
}