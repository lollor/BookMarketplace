import ClientSideRoute from "@/components/clientsideroute";
import Form from "./form";

export const metadata = {
   title: "Login",
   description: "Login page",
}

export default function Page() {
   return (
      <div>
         <div className="flex flex-col items-center justify-center h-[80vh]">
            <div className="w-full">
               <h1 className="text-4xl font-bold text-center mb-8 text-colortext">Login</h1>
               <Form />
               <div className="flex items-center justify-center gap-2 my-4">
                  <div className="h-[2px] w-full bg-colortext"></div>
                  <p className="text-colortext font-semibold">Oppure</p>
                  <div className="h-[2px] w-full bg-colortext"></div>
               </div>
               <ClientSideRoute route="/register">
                  <div className="text-center border-2 px-2 py-1 rounded-xl font-semibold text-shadow drop-shadow-my bg-primary border-primary text-white transition-all duration-300 hover:bg-white hover:text-primary" >Registrati</div>
               </ClientSideRoute>
            </div>
         </div>
      </div>
   )
}