import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Response } from "@/typings"
import { CheckBookRateLimit } from "@/lib/rateLimiter"
import { CreateBook } from "@/lib/database"


export const metadata = {
   title: "Crea un annuncio",
   description: "Crea un annuncio per vendere il tuo libro!",
   keywords: "annuncio, vendere libro, libro"
}

async function submitHandler(data: FormData) {
   "use server"

   const session = await getServerSession(authOptions)
   if (!session) {
      throw new Error("Unauthorized")
   }

   const newdata = new FormData()
   newdata.append("image", data.get("foto") as File)

   const canDo = await CheckBookRateLimit(session?.user?.name!)
   
   if (!canDo) {
      throw new Error("Non puoi creare un annuncio")
   }

   //"Authorization": `Bearer ${session.accessToken}`
   const responseUpload = await fetch(process.env.IMAGE_URL+"/upload", {
      method: "POST",
      body: newdata
   })
   const upload: Response = await responseUpload.json()
   
   if (!upload.status) {
      throw new Error(`Impossibile caricare l'immagine. ${upload.result}`)
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
   
   if (bookCreated.status){
      redirect("/book/" + bookCreated.result)
   } else {
      throw new Error("Impossibile creare l'annuncio")
   }
}

export default async function Page() {
   const session = await getServerSession(authOptions)

   if (!session) {
      redirect("/login?callbackUrl=/crea-annuncio")
   }
   return (
      <div>
         <h1 className="text-xl font-semibold text-center">Crea un annuncio</h1>
         <form action={submitHandler} className="my-4 flex flex-col gap-4">
         <div className="flex flex-col">
            <label htmlFor="titolo" className="font-light">Qui inserisci il titolo del libro</label>
            <input type="text" required name="titolo" id="titolo" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="editore" className="font-light">Adesso scrivi l&apos;editore del libro</label>
            <input type="text" required name="editore" id="editore" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300"/>
         </div>
         <div className="flex flex-col">
            <label htmlFor="isbn" className="font-light">Scrivi il codice ISBN</label>
            <input type="text" required name="isbn" id="isbn" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="prezzo" className="font-light">Anche l&apos;anno di edizione se puoi</label>
            <input type="number" name="anno" id="anno" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="descrizione" className="font-light">Inserisci una descrizione (massimo 1000 caratteri)</label>
            <textarea name="descrizione" required  maxLength={1000} id="descrizione" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="prezzo" className="font-light">Inserisci il prezzo (questo serve)</label>
            <input type="number" required name="prezzo" id="prezzo" className="drop-shadow-my px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300" />
         </div>
         <div className="flex flex-col">
            <label htmlFor="foto" className="font-light">Inserisci una foto (il limite è 1mb)</label>
            <label className="drop-shadow-my overflow-hidden bg-white text-center inline-block px-2 py-1 rounded-xl border-2 focus:outline-none text-black transition-all duration-300">
               <input type="file" required name="foto" id="foto" className="" />
            </label>
         </div>
         <button className="border-2 px-2 py-1 rounded-xl font-semibold drop-shadow-my text-shadow bg-primary border-primary text-white transition-all duration-300 hover:bg-white hover:text-primary">Metti online l&apos;annuncio</button>
      </form>
      </div>
   )
}