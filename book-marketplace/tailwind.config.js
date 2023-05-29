/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            primary: /* "#1abc9c"  "#028c9e"*/ "#28316c",
            secondary: "#c2cbff",
            accent: "#212959",
            colortext: "#010204",
            background: "#eceef8",

         },
         dropShadow: {
            "my":"0 4px 8px rgba(33,41,89,0.25)",
            "mytext":"0 4px 4px rgba(33,41,89,0.25)",
         },
      },
   },
   plugins: [],
};
