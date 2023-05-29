"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import {CgClose} from "react-icons/cg"
import { FormEvent, useEffect, useRef, useState } from "react"
import ClientSideRoute from "./clientsideroute"

export default function Navbar() {
   const {data:session} = useSession()
   const navbarPhone = useRef<HTMLDivElement>(null)
   const closeNavbar = useRef<HTMLAnchorElement>(null)
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
  
   
   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         const data = await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            username,
            password,
         });
         
         let error = "";
         switch (data!.error) {
            case "CredentialsSignin":
               error = "Invalid username or password";
               alert(error);
               break;
            case null:
               error = "";
               break;
            default:
               error = "Errore";
               alert(error);
               break;
         }
         
      } catch (error) {
         alert(error);
      }
   };

   const toggleNavbarPhone = (show:boolean) => {
      navbarPhone.current!.style.height = show ? "100%" : "0%"
   }

   return (
      <>
         <div className="w-full h-0 fixed z-10 left-0 top-0 bg-primary opacity-[0.97] overflow-x-hidden transition-all duration-300" ref={navbarPhone}>
            <span className="absolute top-[20px] right-[45px] text-white text-[50px]" onClick={(e)=>toggleNavbarPhone(false)}>&times;</span>
            <div className="relative top-1/4 w-full text-center mt-[30px] flex flex-col gap-2 items-center text-white">
               <Link href={"/"} className="font-semibold text-xl">Come funziona?</Link>
               {
                  session ? 
                  <>
                     {
                        ["Crea annuncio","Profilo"].map((item, index) => {
                           return <Link key={index} href={"/"+item.toLowerCase().replaceAll(" ","-")} className="font-semibold text-xl" onClick={(e)=>toggleNavbarPhone(false)}>{item}</Link>
                        })
                     }
                     <span onClick={(e)=>signOut({
                        callbackUrl: "/",
                     })} className="font-semibold text-xl">Esci</span>
                  </>
                  :
                  <Link href={"/login"} className="font-semibold text-xl" onClick={(e)=>toggleNavbarPhone(false)}>Login</Link>
               }
               
            </div>
         </div>
         <div className="flex justify-between w-full bg-transparent text-white p-[15px] items-center">
            <ClientSideRoute route="/">
               <div className="flex items-center gap-[15px]">
                     <div className="rounded-full w-[40px] h-[40px] bg-primary"></div>
                     <h1 className="text-lg font-bold text-colortext drop-shadow-mytext"><span className="text-accent">Book</span>Marketplace</h1>
               </div>
            </ClientSideRoute>
            <div className="flex flex-col gap-[6px]" onClick={(e)=>toggleNavbarPhone(true)}>
               <div className="h-[6px] w-[30px] rounded-[2px] bg-primary"></div>
               <div className="h-[6px] w-[30px] rounded-[2px] bg-primary"></div>
            </div>
         </div>
      </>
   )
}


{/* <div className="flex justify-between w-full bg-primary text-shadow text-white px-5 py-3 items-center">
         <div className="flex gap-4 items-baseline">
            <Link href={"/"} className="font-bold text-[24px]">BookMarketplace</Link>
            {
               session ? (
               <>
                  <Link href={"/vendi"} className="font-semibold  ">Vendi</Link>
                  <Link href={"/"} className="font-semibold  ">I tuoi ordini</Link>
                  <Link href={"/"} className="font-semibold  ">Messaggi</Link>
               </>
               ) : (<></>)
            }
            
            <Link href={"/"} className="font-semibold  ">Come funziona?</Link>
         </div>
         {
            session ? (
               <div className="flex justify-between items-center gap-5">
                  <Link href={"/profile"} className="font-semibold">{session?.user?.name}</Link>
                  <button className="border-white border-2 px-2 py-1 rounded-xl font-semibold text-shadow transition-all duration-300" onClick={()=>signOut()}>Sign out</button>
               </div>
            ) : (
               <form className="flex justify-between items-center gap-2" onSubmit={submitHandler}>
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="px-2 py-1 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-primary text-black transition-all duration-300"/> 
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 py-1 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-primary text-black transition-all duration-300"/> 
                  <button className="border-white border-2 px-2 py-1 rounded-xl font-semibold text-shadow transition-all duration-300 hover:bg-white hover:text-primary" type="submit">Sign in</button>
               </form>
            )
         }
      </div> */}