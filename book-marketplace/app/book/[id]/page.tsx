import { CreateVisualBook, GetBookMetadata, LikeBook } from "@/lib/database";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { book } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GiPositionMarker } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "@/components/tooltip";
import LikeButton from "./likeButton"
import { cookies } from 'next/headers';

import { revalidatePath } from "next/cache";

export const revalidate = 120;

type Props = {
   params: {
      id: number
   }
}


export async function generateMetadata( { params }: Props): Promise<Metadata> {
   // read route params
   const id = +params.id;
  
   // fetch data
   const bookResponse = await GetBookMetadata(id);
  
   if (!bookResponse.status) {
      notFound();
   }

   const book = bookResponse.result as book;
  
   return {
      title: book.title,
      description: book.description,
      keywords: [book.title, book.publisher, book.isbn!, "Libro usato"],
   };
 }

export default async function Page({ params }: Props) {
   const bookResponse = await GetBookMetadata(+params.id);

   if (!bookResponse.status) {
      notFound();
   }

   const book = bookResponse.result;
   const idBook = +params.id

   const session = await getServerSession(authOptions)

   async function likeBook(like:boolean) {
      "use server"
      
      const response = await LikeBook(idBook, !like);
      
      if (response.status) {
         revalidatePath("/");
         revalidatePath("/book/"+params.id);
      } 
   }



   const imageUrl = !book.img_id?.startsWith("http") ? `/api/image/${book.img_id!}` : book.img_id;
   let userImageUrl = !book.user.img_id?.startsWith("http") ? `/api/image/${book.user.img_id!}` : book.user.img_id;   
   if (userImageUrl === "/api/image/" || userImageUrl === "/api/image/null") userImageUrl = "/user.jpg";
   
   const data = (book.creation_date as Date)
   let stringaData = "";
   
   if (data.getFullYear() != new Date().getFullYear()) {
      stringaData = (book.creation_date as Date).toLocaleString('it-IT');
   } else {
      stringaData = data.getDate() + "/" + (data.getMonth()+1) + ", " + data.toLocaleTimeString('it-IT');
   }

   const thisBookIsOfTheUser = session?.user?.name === book.user.username;

   const likesBookArray = book.like_book as Array<{user:{username:string}}>
   const isLiked = likesBookArray.some(like=>like.user.username === session?.user?.name)
   
   await CreateVisualBook(idBook);

   

   return (
      <div>
         <div className="w-full h-[250px]">
            <div className="w-full h-full relative overflow-hidden">
               <Image alt={book.title} style={{objectFit:'contain'}} fill src={imageUrl} />
            </div>
         </div>
         <h1 className="text-xl text-center my-2 font-semibold">{book.title}</h1>
         <div className="w-full border-t-[1px] border-accent border-opacity-50"></div>
         <div className="flex justify-between items-center my-2">
            <div className="flex items-center gap-2 justify-center">
               <p className="font-normal text-sm text-slate-500 ">{stringaData}</p>
               <div className="h-[15px] bg-slate-500 w-[1px] bg-opacity-50"></div>
               {
                  session ? (
                     <LikeButton likeBook={likeBook} numberLike={likesBookArray.length} isLiked={isLiked}/>
                  ) : (
                     <p className="text-sm text-slate-500 font-light"><Link href={"/login?callbackUrl=/book/"+params.id} className="underline">Loggati</Link> per mettere like</p>
                  )

               }
            </div>
            <p className="font-normal text-sm text-slate-500 flex items-center capitalize">
               <GiPositionMarker className="" />{book.user.city}
            </p>
         </div>
         <div className="flex items-center justify-between py-2">
            <h2 className="font-bold text-2xl text-accent">{book.price}€</h2>
            <span className="bg-white bg-opacity-30 border-2 rounded-md px-2 py-1 border-primary text-primary font-semibold">
               <Tooltip testo={book.confirmed ? "Verificato" : "Non verificato"} dimensioni="sm" larghezzaInPx={300}>
                  L&apos;annuncio viene verificato dopo qualche giorno dalla pubblicazione
               </Tooltip>
            </span>
         </div>
         <div className="flex justify-between py-2 items-center">
            <div className="flex justify-start gap-3 items-center">
               <div className="w-[40px] h-[40px] rounded-full overflow-hidden drop-shadow-my">
                  <div className="w-full h-full relative">
                     <Image alt={book.user.name} style={{objectFit:'cover'}} fill src={userImageUrl} />
                  </div>
               </div>
               <Link href={`/profilo/${book.user.username}`} className="font-semibold underline">{book.user.username}</Link>
            </div>
            {
               thisBookIsOfTheUser ? (
                  <Link href={`/`} /*book/${book.id}/edit */ className="bg-primary text-white px-2 py-1 rounded-md text-base shadow-md opacity-50">Modifica annuncio</Link>
               ) : (
                  <button disabled className="bg-primary text-white px-2 py-1 rounded-md text-base shadow-md disabled:opacity-50">Contatta il venditore</button>
               )
            }
         </div>
         {
            book._count.visual_book > 0 ? (
               <p className="font-light text-slate-500 text-sm py-2">{`Questo annuncio l'ha${book._count.visual_book!=1?"nno":""} visto anche ${book._count.visual_book!=1?"altre":""} ${book._count.visual_book} person${book._count.visual_book==1?"a":"e"}`}</p>
            ) : (<></>)
         }
         <div className="w-full border-t-[1px] border-accent border-opacity-50"></div>
         {
            (book.description != null && (book.description as string).trim() != "") ? (
               <div className="py-2">
                  <h2 className="text-lg font-semibold">Descrizione</h2>
                  <p className="text-sm font-light">{book.description}</p>
               </div>
            ) : (<></>)
         }
         <div className="py-2">
            <h2 className="text-lg font-semibold">Dati principali</h2>
            <div className="text-sm font-light">
               <p><span className="font-semibold">ISBN</span>: {book.isbn ? book.isbn : "Non inserito"}</p>
               <p><span className="font-semibold">Editore</span>: {book.publisher ? book.publisher : "Non inserito"}</p>
               <p><span className="font-semibold">Anno di edizione</span>: {book.edition_year ? book.edition_year : "Non inserito"}</p>
            </div>
         </div>
      </div>
   )


   return <div className="overflow-auto">
      
      <pre>{JSON.stringify(session, null, 3)}</pre>
   </div>;
}
