import { GetBooksFromUsername, GetLastAddedBook } from "@/lib/database";
import { Book, Response } from "@/typings";
import Image from "next/image";
import ClientSideRoute from "./clientsideroute";
import BookCard from "./bookcard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { book } from "@prisma/client";

/*async function Books({idUser}:{idUser:number}){
   if (idUser) {
      const response : Response = await DoQuery(`SELECT * FROM book WHERE idUser = '${idUser}'`);
      const books : Book[] = response.result;
      return (
      <div className="md:col-span-3 w-full border-2 border-primary rounded-lg px-4 py-2 my-4">
            <h2 className="text-[28px]">Libri</h2>
            <div className="flex flex-row flex-wrap p-4 gap-4 my-2">
               {books && books.map((book, index) => {
                  return (
                     <ClientSideRoute route={`/${book.isbn}`} key={index}>
                        <div className="w-[150px] ">
                           <div className="w-full h-[225px] relative shadow">
                              <Image alt={book.title} style={{objectFit:'cover'}} fill src={book.img_path} />
                           </div>
                           <div className="text-center">
                              <h3 className="text-[18px] font-bold">{book.title}</h3>
                              <p className="text-[14px]">{book.publisher}</p>
                              <p className="text-[14px] font-semibold">€{book.price}</p>
                           </div>
                        </div>
                     </ClientSideRoute>
                  )
               })}
            </div>
         </div>
      )
   } else {
      const response : Response = await DoQuery("SELECT * FROM book");
      const books : Book[] = response.result;
      return (
         <div className="md:col-span-3 w-full border-2 border-primary rounded-lg px-4 py-2">
            <h2 className="text-[28px]">Libri messi in vendita nella tua zona</h2>
            <div className="flex flex-row flex-wrap p-4 gap-4 my-2">
               {books && books.map((book, index) => {
                  return (
                     <ClientSideRoute route={`/${book.isbn}`} key={index}>
                        <div className="w-[150px] ">
                           <div className="w-full h-[225px] relative shadow">
                              <Image alt={book.title} style={{objectFit:'cover'}} fill src={book.img_path} />
                           </div>
                           <div className="text-center">
                              <h3 className="text-[18px] font-bold">{book.title}</h3>
                              <p className="text-[14px]">{book.publisher}</p>
                              <p className="text-[14px] font-semibold">€{book.price}</p>
                           </div>
                        </div>
                     </ClientSideRoute>
                  )
               })}
            </div>
         </div>
      )
   }
}*/

export enum CosaChiedi {
   CercatiRecentemente,
   VicinoATe,
   ITuoiLibri,
   MessiRecentementeInVendita
}
type Props = {
   cosaChiedi: CosaChiedi
}
export default async function NuoviBooks({cosaChiedi}:Props){

   
   switch (cosaChiedi) {
      case CosaChiedi.ITuoiLibri:
         const session = await getServerSession(authOptions);
         if (session != undefined) {
            const username = session.user?.name;
            const booksResponse = await GetBooksFromUsername(username!);
            
            if (booksResponse.result.length == 0) {
               return (<></>)
            }
            else 
               return (
                  <div>
                     <h2 className="font-semibold text-lg">I tuoi libri</h2>
                     <div className="flex gap-[20px] py-4 overflow-x-auto mx-[-20px] px-[20px]">
                     {booksResponse.result.map((book:book, index:any) => {
                        return (
                           <BookCard book={book} key={index}/>
                        )
                     })}
                     </div>
                  </div>
               )
         }
         break;
      case CosaChiedi.MessiRecentementeInVendita:
         const booksResponse = await GetLastAddedBook();
         return (
            <div>
               <h2 className="font-semibold text-lg">Messi recentemente in vendita</h2>
               <div className="flex gap-[20px] py-4 overflow-x-auto mx-[-20px] px-[20px]">
                  {booksResponse.result.map((book:book, index:any) => {
                     return (
                        <BookCard book={book} key={index}/>
                     )
                  })}
               </div>
            </div>
         )
         break;
      default:
         return (
            <div>
               <h2 className=""></h2>
               <div className="flex gap-[20px] py-4 overflow-x-auto mx-[-20px] px-[20px]">
               </div>
            </div>
         )
         break;
   }

   
}