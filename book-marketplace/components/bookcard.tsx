import { book } from "@prisma/client";
import ClientSideRoute from "./clientsideroute";
import Image from "next/image";


type Props = {
   book: book
}

export default function Book({book}: Props) {
   const imageUrl = !book.img_id?.startsWith("http") ? `/api/image/${book.img_id!}` : book.img_id;
   return (
      <ClientSideRoute route={`/book/${book.id}`}>
         <div className="w-[150px] max-h-[250px] bg-white drop-shadow-my rounded-[10px] p-2">
            <div className="h-[200px] w-full bg-gray-300 rounded-[5px] relative overflow-hidden">
               <Image alt={book.title} style={{objectFit:'cover'}} fill src={imageUrl} />
               <div className="z-10 absolute bottom-1 left-1 bg-primary text-white rounded-md px-2 shadow-md">
                  <p className="text-sm font-semibold">€{book.price}</p>
               </div>
            </div>
            <p className="text-sm pt-2 line-clamp-1">{`${book.title}${book.publisher ? ` - ${book.publisher}`:""}`}</p>
         </div>
      </ClientSideRoute>
   )
}