"use client"

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function Button({likeBook, numberLike, isLiked}:{likeBook:(like:boolean)=>void, numberLike:number, isLiked: boolean}){
   return (
      <div className="flex items-center gap-1">
         <button onClick={e=>likeBook(!isLiked)}>
            {
               isLiked ? (
                  <AiFillHeart className="text-sm text-slate-500 cursor-pointer" />
               ) : (
                  <AiOutlineHeart className="text-sm text-slate-500 cursor-pointer" />
               )
            }
         </button>
         <p className="font-normal text-sm text-slate-500">{numberLike}</p>
      </div>
   )
}