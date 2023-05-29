'use client';
import { useEffect } from 'react';
 
export default function Error({ error, reset }: { error: Error; reset: () => void; }) {
   return (
      <div className='text-center mt-[90%] flex flex-col gap-4 items-center'>
         <h2 className="font-bold text-xl">Qualcosa è andato storto...</h2>
         <p className=''>{error.message}</p>
         <button onClick={() => reset()} className='bg-primary py-1 px-4 rounded-xl text-white font-semibold'>Riprova</button>
      </div>
   );
}