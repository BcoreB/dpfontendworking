"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Menu/updatedNavbar";
import Navheader from "@/components/Menu/updatedHeader";
import Image from "next/image"; // Import the config file

const HideableNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const [employeeCode, setEmployeeCode] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve employeecode from localStorage
    const code = localStorage.getItem('employeecode');
    setEmployeeCode(code);
  }, []);

  const hideNavbarPaths = ["/", ""]; // Add paths to hide the Navbar
  useEffect(() => {
    // Detect screen size and set mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle Navbar visibility
  const toggleNavbar = () => {
    setIsNavbarVisible((prev) => !prev);
  };

  // Close Navbar if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbarElement = document.querySelector(".navbar-div");
      if (
        navbarElement &&
        !navbarElement.contains(event.target as Node) &&
        isNavbarVisible
      ) {
        setIsNavbarVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNavbarVisible]);

  // Hide Navbar on specified paths
  if (hideNavbarPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="pb-20 md:pb-0">
      <div className=" md:w-full"><Navheader employeeCode={employeeCode||''} /></div>
      <div className="w-full h-full px-5 lg:px-20 lg:pb-14 relative">
        {isMobile ? (
          <div className="absolute top-4 left-4 z-10">
            <Image
              src="/menu/menu.png"
              alt="Open Navbar"
              width={30}
              height={30}
              className="cursor-pointer"
              onClick={toggleNavbar}
            />
          </div>
        ) : (
          <div className="absolute left-0 navbar-div">
            <Navbar />
          </div>
        )}
        {isNavbarVisible && (
          <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 z-40">
            <div className="absolute left-0 navbar-div bg-white z-50">
              <Navbar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HideableNavbar;
