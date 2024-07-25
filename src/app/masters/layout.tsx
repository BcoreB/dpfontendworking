"use client"

import Sidebar from "../components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className='absolute right-0 z-5'>
            <Sidebar/>
        </div>    
        <main>{children}</main>
    </>
  );
}
