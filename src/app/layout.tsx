
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

import { Inter } from "next/font/google";
import "./globals.css";
import { DirectionProvider } from './DirectionContext';
import HideableNavbar from "../components/Menu/HideableNavbar";
import { EmployeeProvider } from "./EmployeeContext";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DirectionProvider>
        <div className='{inter.className}'>
          <HideableNavbar />
          {children}
        </div>
    </DirectionProvider>
  );
}
