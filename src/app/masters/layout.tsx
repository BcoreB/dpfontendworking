"use client"

import Sidebar from "../../components/Menu/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className='absolute right-0 z-5'>
            
        </div>    
        <main>{children}</main>
    </>
  );
}
