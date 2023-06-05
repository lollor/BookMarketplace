"use server"

import { CreateBook } from "@/lib/database"
import { CheckBookRateLimit } from "@/lib/rateLimiter"
import { Response } from "@/typings"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { Session, getServerSession } from "next-auth"

enum ErrorType {
   Unauthorized = "Non sei autorizzato",
   ParametriVuoti = "Parametri vuoti",
   ImpossibileCaricareImmagine = "Impossibile caricare l'immagine",
   ImpossibileCreareAnnuncio = "Impossibile creare l'annuncio",
   AspettaPrimaDiCreareUnAltroAnnuncio = "Aspetta prima di creare un altro annuncio",
   ErroreISBNNotNumber = "ISBN non è un numero"
}

export async function creaAnnuncio(data: FormData, session: Session|null) {
   if (!session) {
      throw new Error(ErrorType.Unauthorized)
   }

   //controllo parametri vuoti
   if (
      (data.get("titolo") as string).trim() == "" ||
      (data.get("isbn") as string).trim() == "" ||
      (data.get("editore") as string).trim() == "" ||
      (data.get("descrizione") as string).trim() == "" ||
      data.get("foto") as string == null ||
      (data.get("prezzo") as string).trim() == ""
   ) {
      throw new Error(ErrorType.ParametriVuoti)
   }

   //controllo isbn solo numeri
   
   if (isNaN(+(data.get("isbn") as string))) {
      throw new Error(ErrorType.ErroreISBNNotNumber)
   }


   const newdata = new FormData()
   newdata.append("image", data.get("foto") as File)

   const canDo = await CheckBookRateLimit(session?.user?.name!)
   
   if (!canDo) {
      throw new Error(ErrorType.AspettaPrimaDiCreareUnAltroAnnuncio)
   }

   //"Authorization": `Bearer ${session.accessToken}`
   const responseUpload = await fetch(process.env.IMAGE_URL+"/upload", {
      method: "POST",
      body: newdata
   })
   const upload: Response = await responseUpload.json()
   
   if (!upload.status) {
      throw new Error(ErrorType.ImpossibileCaricareImmagine+". "+upload.result)
   }

   const bookCreated = await CreateBook(
      data.get("titolo") as string,
      data.get("isbn") as string,
      data.get("editore") as string,
      (data.get("anno") as string ) == "" ? null : +(data.get("anno") as string),
      data.get("descrizione") as string,
      upload.result as string,
      +(data.get("prezzo") as string),
      session?.user?.name!
   )
   
   if (!bookCreated.status){
      throw new Error(ErrorType.ImpossibileCreareAnnuncio)
   }

   return true
}
