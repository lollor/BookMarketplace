"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { creaAnnuncio } from "./actions"
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default async function Form() {
   const router = useRouter()
   const session = await getSession()
   
   const action = async (data:FormData) => {
      try {
         const isCreated = await toast.promise(creaAnnuncio(data, session), {
            loading: "Caricamento...",
            success: "Caricato",
            error: e => e.message
         })
         if (isCreated) router.push("/")
      } catch (error:any) {
         /* toast.error(error.message) */
      }
      
   }

   return (
      <form action={action} className="my-4 flex flex-col gap-4">
         <div className="flex flex-col">
            <label htmlFor="titolo" className="font-light">Titolo del libro *</label>
            <input type="text" required name="titolo" id="titolo" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="editore" className="font-light">Editore del libro *</label>
            <input type="text" required name="editore" id="editore" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300"/>
         </div>
         <div className="flex flex-col">
            <label htmlFor="isbn" className="font-light">Codice ISBN *</label>
            <input type="text" required name="isbn" id="isbn" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="prezzo" className="font-light">Anno di edizione</label>
            <input type="number" name="anno" id="anno" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="descrizione" className="font-light">Descrizione (massimo 1000 caratteri) *</label>
            <textarea name="descrizione" required  maxLength={1000} id="descrizione" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="prezzo" className="font-light">Prezzo (non scrivere €) *</label>
            <input type="number" required name="prezzo" id="prezzo" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="foto" className="font-light">Una foto (il limite è 1mb) *</label>
            <label className="drop-shadow-my overflow-hidden bg-white text-center inline-block px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300">
               <input type="file" required name="foto" id="foto" className="" />
            </label>
         </div>
         <button className="disabled:hidden border-2 px-2 py-1 rounded-xl font-semibold drop-shadow-my text-shadow bg-primary border-primary text-white transition-all duration-300 hover:bg-white hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed">Metti online l&apos;annuncio
         </button>
      </form>
   )
   
}