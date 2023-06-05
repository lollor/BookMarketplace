import React from "react";
import SearchBox from "@/components/searchBox";
import Chats from "@/components/chats";
import Books, { CosaChiedi } from "@/components/books";
import Tooltip from "@/components/tooltip";
import Dialog from "@/components/dialog";
import { DeleteBook } from "@/lib/database";

export const revalidate = 1;

export const metadata = {
   title: "Book Marketplace",
   description: "Dove puoi vendere e comprare libri usati con facilità!",
};

export default async function Page() {

   //await DeleteBook(9)

   return (
      <div>
         <Dialog shouldOpenWithTime={false} timeInMs={1000}>
            <div className="">
               <h1 className="text-2xl font-bold">Benvenuto su BookMarketplace!</h1>
               <p className="text-center">Qui puoi vendere e comprare libri usati con facilità!</p>
            </div>
         </Dialog>
         <SearchBox />
         <div className="h-[30px]"></div>
         {/* @ts-ignore */}
         <Books cosaChiedi={CosaChiedi.MessiLike}/>
         {/* <Books titoloDiv="Libri in vendita vicino a te"/> */}
         <div className="h-[30px]"></div>
         {/* @ts-ignore */}
         <Books cosaChiedi={CosaChiedi.MessiRecentementeInVendita}/>
         {/* <Books titoloDiv="Libri cercati recentemente"/> */}
         <div className="h-[30px]"></div>
         {/* @ts-ignore */}
         {/* <Chats /> */}
         
      </div>
   );
}
