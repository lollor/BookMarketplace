import Form from "./form"



export const metadata = {
   title: "Crea un annuncio",
   description: "Crea un annuncio per vendere il tuo libro!",
   keywords: "annuncio, vendere libro, libro"
}


export default async function Page() {
   return (
      <div>
         <h1 className="text-xl font-semibold text-center">Crea un annuncio</h1>
         {/* @ts-ignore */}
         <Form/>
      </div>
   )
}