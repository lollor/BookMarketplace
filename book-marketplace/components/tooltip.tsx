export default function Tooltip({ children, testo, dimensioni, larghezzaInPx=120 }:{ children: React.ReactNode, testo : string, dimensioni: string, larghezzaInPx?: number }){
   return (
      <span className="relative inline-block group underline decoration-dotted decoration-primary underline-offset-2">
         { testo }
         <span className={`text-white text-center after:content-[''] group-hover:visible group-hover:opacity-100 after:absolute after:top-[100%] after:left-[50%] after:ml-[-5px] after:border-[5px] after:border-primary after:border-r-transparent after:border-l-transparent after:border-b-transparent invisible !w-[${larghezzaInPx}px] bg-primary px-2 py-1 rounded-md absolute z-10 bottom-[125%] left-[50%] ml-[-60px] opacity-0 transition-all duration-300 text-${dimensioni}`}>
            {children}
         </span>
      </span>
   )
}