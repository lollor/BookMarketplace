export default function Loading(){
   return (
      <div>
         <div className="w-[150px] h-[250px] mx-auto bg-slate-400 animate-pulse rounded-xl"></div>
         <div className="w-[230px] h-[20px] mx-auto my-2 bg-slate-400 animate-pulse rounded-xl"></div>
         <div className="w-full border-t-[1px] border-accent border-opacity-50"></div>
         <div className="flex justify-between items-center my-2">
            <div className="w-[150px] h-[20px] bg-slate-400 animate-pulse rounded-xl"></div>
            <div className="w-[80px] h-[20px] bg-slate-400 animate-pulse rounded-xl"></div>
         </div>
         <div className="flex items-center justify-between py-2">
            <div className="w-[60px] h-[35px] bg-slate-400 animate-pulse rounded-xl"></div>
            <div className="w-[100px] h-[40px] bg-slate-400 animate-pulse rounded-xl"></div>
         </div>
         <div className="flex justify-between py-2 items-center">
            <div className="flex justify-start gap-3 items-center">
               <div className="w-[40px] h-[40px] rounded-full bg-slate-400 animate-pulse"></div>
               <div className="w-[70px] h-[30px] bg-slate-400 animate-pulse rounded-xl"></div>
            </div>
            <div className="w-[160px] h-[35px] bg-slate-400 animate-pulse rounded-xl"></div>
         </div>
         <div className="w-[260px] h-[20px] my-2 bg-slate-400 animate-pulse rounded-xl"></div>
         <div className="w-full border-t-[1px] border-accent border-opacity-50"></div>
         <div className="py-2">
            <div className="w-[160px] h-[25px] my-2 bg-slate-400 animate-pulse rounded-xl"></div>
            <div className="w-[260px] h-[150px] my-2 bg-slate-400 animate-pulse rounded-xl"></div>
         </div>
      </div>
   )
}