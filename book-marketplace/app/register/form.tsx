"use client"

import { signIn } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from "react";



export default function Form(){

   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [confermaPassword, setConfermaPassword] = useState("")
   const [nome, setNome] = useState("")
   const [cognome, setCognome] = useState("")
   const [email, setEmail] = useState("")
   const [citta, setCitta] = useState("")
   const [checked, setChecked] = useState(false)
   const params = useSearchParams()
   const router = useRouter()

   let error = params?.get("error");
   switch (error) {
      case "CredentialsSignin":
         error = "Invalid username or password";
         break;
      case "PasswordNotMatch":
         error = "Le password non coincidono";
         break;
      case "UsernameAlreadyExists":
         error = "Username già in uso";
         break;
      case "EmailAlreadyExists":
         error = "Email già in uso";
         break;
      case "MissingParameters":
         error = "Parametri mancanti";
         break;
      case "InvalidPassword":
         error = "Password non valida. La password deve contenere almeno 8 caratteri, di cui almeno una lettera maiuscola, una minuscola, un numero";
         break;
      case "InvalidUsername":
         error = "Username non valido. L'username deve contenere dai 4 ai 20 caratteri";
         break;
      case null:
         error = "";
         break;
      default:
         error = "Errore";
         break;
   }

   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (password != confermaPassword) {
         router.replace("/register?error=PasswordNotMatch")
         return;
      }

      if (!checked) {
         return;
      }
      
      const response = await (await fetch("/api/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            username,
            password,
            nome,
            cognome,
            email,
            citta
         })
      })).json();
      
      if (response.status){
         await signIn("credentials", {
            username,
            password,
            callbackUrl: "/",
            redirect: true
         })
      } else {
         router.replace("/register?error="+response.result)
      }
      
   };

   return (
      <>
         <form onSubmit={submitHandler} className="flex flex-col gap-2 ">
            <div className="flex gap-2 ">
               <input type="text" required placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="drop-shadow-my px-2 py-1 w-full rounded-xl border-2 focus:outline-none border-primary text-black transition-all duration-300"/> 
               <input type="text" required placeholder="Cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} className="drop-shadow-my px-2 py-1 w-full rounded-xl border-2 focus:outline-none border-primary text-black transition-all duration-300"/> 
            </div>
            <input type="text" required placeholder="Città" value={citta} onChange={(e) => setCitta(e.target.value)} className="drop-shadow-my px-2 py-1 w-full rounded-xl border-2 focus:outline-none border-primary text-black transition-all duration-300"/> 
            <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-2 py-1 w-full rounded-xl border-2 focus:outline-none border-primary text-black transition-all duration-300 drop-shadow-my"/> 
            <input type="text" required placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="px-2 py-1 w-full rounded-xl border-2 focus:outline-none border-primary text-black transition-all duration-300 drop-shadow-my"/> 
            <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 py-1 w-full rounded-xl border-2 focus:outline-none border-primary text-black transition-all duration-300 drop-shadow-my"/> 
            <input type="password" required placeholder="Conferma password" value={confermaPassword} onChange={(e) => setConfermaPassword(e.target.value)} className="px-2 py-1 w-full rounded-xl border-2 focus:outline-none border-primary text-black transition-all duration-300 drop-shadow-my"/> 
            <div className="flex items-center gap-2">
               <input type="checkbox" required checked={checked} onChange={(e) => setChecked(e.target.checked)} className="w-4 h-4 rounded-xl border-4 focus:outline-none border-primary text-black transition-all duration-300 "/>
               <p className="text-sm font-semibold">Accetto i <a href="#" className="text-primary font-bold">Termini e condizioni</a></p>
            </div>
            <button className=" border-2 px-2 py-1 rounded-xl font-semibold text-shadow bg-primary border-primary text-white transition-all duration-300 hover:bg-white hover:text-primary drop-shadow-my" type="submit">Registrati</button>
         </form>
         {error!="" && <p className="mt-2 text-center px-4 py-2 font-bold text-red-500 bg-red-500 rounded-xl bg-opacity-20 border border-red-500 focus:outline-none focus:shadow-outline">{error}</p>}
      </>
   )
}