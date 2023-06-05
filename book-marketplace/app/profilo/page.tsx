import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { GetUserByUsername } from "@/lib/database";

export const metadata = {
   title: "Il tuo Profilo",
   description: "Il tuo profilo",
   keywords: "profilo, utente, account, informazioni, dati, per il tuo profilo",
}

export default async function Page() {
   /* const session = await getServerSession(authOptions);
   const responseUser = await GetUserByUsername(session?.user?.name!) 
   return (
      <div className="overflow-x-auto">
         <pre>{JSON.stringify(session, null, 3)}</pre>
         <pre>{JSON.stringify(responseUser.result, null, 3)}</pre>
      </div>
   ) */
   return (
      <p>Non ancora implementato</p>
   )
}