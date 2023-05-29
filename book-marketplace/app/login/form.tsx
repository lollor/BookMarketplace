"use client"

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from "react";



export default function Form(){

   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const params = useSearchParams()

   let error = params?.get("error");
   switch (error) {
      case "CredentialsSignin":
         error = "Invalid username or password";
         break;
      case null:
         error = "";
         break;
      default:
         error = "Errore";
         break;
   }

   const redirectUrl = params?.get("callbackUrl") || "/";

   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
         await signIn("credentials", {
            redirect: true,
            callbackUrl: redirectUrl,
            username,
            password,
         });
      } catch {}
   };

   return (
      <>
         <form onSubmit={submitHandler} className="flex flex-col gap-2 ">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none border-primary text-black transition-all duration-300"/> 
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none border-primary text-black transition-all duration-300"/> 
            <button className=" border-2 px-2 py-1 rounded-xl font-semibold drop-shadow-my text-shadow bg-primary border-primary text-white transition-all duration-300 hover:bg-white hover:text-primary" type="submit">Sign in</button>
         </form>
         {error!="" && <p className="mt-2 text-center px-4 py-2 font-bold text-red-500 bg-red-500 rounded-xl bg-opacity-20 border border-red-500 focus:outline-none focus:shadow-outline">{error}</p>}
      </>
   )
}