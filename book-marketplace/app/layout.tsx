import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
   generator: "Next.js",
   applicationName: "Next.js",
   referrer: "origin-when-cross-origin",
   keywords: ['Book', 'Marketplace', 'BookMarketplace', "Libri usati", "Libri in vendita", "Libri di scuola"],
   robots: "index, follow",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html>
         <head />
         <body className="bg-background">
            <p className="hidden sm:block">Utilizzare l&apos;applicazione su un telefono in senso verticale</p>
            <div className="sm:hidden">
               <Providers>
                  <Toaster />
                  <Navbar />
                  <div className="px-[20px] py-3 xl:px-20 lg:py-10">{children}</div>
               </Providers>
            </div>
         </body>
      </html>
   );
}
