
// "use client"

// import { Inter } from "next/font/google";
// import "./globals.css";
// import { DirectionProvider } from './DirectionContext';

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <DirectionProvider>
//       <div className={inter.className}>
//         {children}
//       </div>
//     </DirectionProvider>
//   );
// }


"use client";

// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { DirectionProvider } from './DirectionContext';
import { EmployeeProvider } from './EmployeeContext';
import HideableNavbar from "../components/Menu/HideableNavbar";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DirectionProvider>
<<<<<<< HEAD
      <EmployeeProvider>
        <div className={inter.className}>
=======
        <div className='{inter.className}'>
>>>>>>> 0e71afe813de9cf64f5ddfbbe7141072d4f33def
          <HideableNavbar />
          {children}
        </div>
    </DirectionProvider>
  );
}
