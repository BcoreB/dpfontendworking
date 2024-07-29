"use client";

import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";

const HideableNavbar: React.FC = () => {
  const pathname = usePathname();

  // Define paths where the Navbar should be hidden
  const hideNavbarPaths = ["/","/home"]; // Add any paths where you want to hide the Navbar

  if (hideNavbarPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className='w-full h-full px-5 py-5 lg:px-20 lg:pb-14 lg:pt-8'>
      <Navbar />
    </div>
  );
};

export default HideableNavbar;
