import React from "react";
import SearchBox from "@/components/searchBox";
import Chats from "@/components/chats";
import Books, { CosaChiedi } from "@/components/books";
import Tooltip from "@/components/tooltip";

export const revalidate = 10;

export const metadata = {
   title: "Book Marketplace",
   description: "Dove puoi vendere e comprare libri usati con facilità!",
};

export default async function Page() {
   return (
      <div>
         <SearchBox />
         <div className="h-[30px]"></div>
         {/* @ts-ignore */}
         <Books cosaChiedi={CosaChiedi.ITuoiLibri}/>
         {/* <Books titoloDiv="Libri in vendita vicino a te"/> */}
         <div className="h-[30px]"></div>
         {/* @ts-ignore */}
         <Books cosaChiedi={CosaChiedi.MessiRecentementeInVendita}/>
         {/* <Books titoloDiv="Libri cercati recentemente"/> */}
         <div className="h-[30px]"></div>
         {/* @ts-ignore */}
         <Chats />
      </div>
   );
}
