"use client"

import { useState } from "react"
import { BsSearch} from "react-icons/bs"

export default function SearchBox(){
   //const [books, setBooks] = useState([])
   //const [hasSearched, setHasSearched] = useState(false)
   const [search, setSearch] = useState("")
   //const [category, setCategory] = useState(0)
   //const [location, setLocation] = useState("")

   

   /* const submitOld = ()=>{
      console.log({
         search,
         category,
         location
      })

      setHasSearched(true)
      
      //TODO creare la query in cui si prendono i libri in base ai parametri
   }   */

   const changeSearch =async (e:any)=>{
      setSearch(e.target.value)
      if (e.keyCode == 13)
         alert("-"+e.target.value+"-")
   }

   return (
      <div className="flex items-center justify-between py-2 px-4 w-full rounded-3xl bg-white drop-shadow-my">
         <input onKeyUp={changeSearch} type="text" className="outline-none w-4/5" placeholder="Cerca per libro, autore, profilo" />
         <button onClick={(e)=>alert(search)}>
            <BsSearch className="" color="gray"/>
         </button>
      </div>
   )

   /* return (
      <div className="col-span-3">
         <div className="flex gap-3 py-2 lg:flex-row flex-col">
            <div className="gap-3 flex justify-between lg:flex-row flex-col">
               <input type="text" placeholder="Titolo, ISBN" onChange={e => setSearch(e.target.value)} className="w-full lg:w-[500px] px-2 py-1 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-primary" />
               <select onChange={e => setCategory(+e.target.value)} className=" px-2 py-1 rounded-xl border-2  border-gray-300 focus:outline-none focus:border-primary">
                  <option value="0">Tutti i libri</option>
                  <option value="1">Libri di testo</option>
                  <option value="2">Libri di scuola</option>
                  <option value="3">Libri di narrativa</option>
                  <option value="4">Libri di saggistica</option>
               </select>
               <input type="text" placeholder="Luogo" onChange={e => setLocation(e.target.value)} className="w-full lg:w-[200px]  px-2 py-1 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-primary" />
            </div>
            <button onClick={(e) => submit()} className="bg-primary text-white px-4 py-1 rounded-xl font-semibold text-shadow transition-all duration-300">Cerca</button>
         </div>
      </div>
      
   ) */
}