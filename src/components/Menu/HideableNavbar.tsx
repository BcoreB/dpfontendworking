"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Menu/updatedNavbar";
import Navheader from "@/components/Menu/updatedHeader";
const HideableNavbar: React.FC = () => {
  const pathname = usePathname();

  // Define paths where the Navbar should be hidden
  const hideNavbarPaths = ["/", ""]; // Add any paths where you want to hide the Navbar

  if (hideNavbarPaths.includes(pathname)) {
    return null;
  }

  return (
    <>
      <div className=''><Navheader/></div>
      <div className='w-full h-full px-5 lg:px-20 lg:pb-14'>
        <div className="absolute left-0 hidden md:block navbar-div">
                    <Navbar/>
        </div>
      </div>
    </>
  );
};

export default HideableNavbar;
