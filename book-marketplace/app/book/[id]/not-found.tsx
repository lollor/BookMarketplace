import Image from 'next/image'

export default function NotFound() {
   return (
      <div>
         <div className="w-full h-[250px]">
            <div className="w-full h-full relative overflow-hidden">
               <Image
                  src="/not-found.png"
                  alt="not found"
               />
            </div>
         </div>
         <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl text-center my-2 font-semibold">404</h1>
            <h1 className="text-xl text-center my-2 font-semibold">Pagina non trovata</h1>
         </div>
      </div>
   )
}