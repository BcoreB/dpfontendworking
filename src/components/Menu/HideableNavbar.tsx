"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Menu/updatedNavbar";
import Navheader from "@/components/Menu/updatedHeader";
import { useEmployee } from '@/app/EmployeeContext';

const HideableNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const { employeeCode } = useEmployee(); // Access employeeCode from context

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide Navbar on specified paths
  const hideNavbarPaths = ["/", ""]; // Paths where the Navbar should not be displayed
  if (hideNavbarPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="pb-20">
      <div className="md:w-full flex justify-center mb-4 md:mb-0">
        <Navheader employeeCode={employeeCode || ''} />
      </div>

      {/* Always show Navbar on desktop */}
      {!isMobile && (
        <div className="fixed top-0 left-0 z-[50]">
          <div className="absolute left-0 top-0 navbar-div bg-white w-12h-screen z-[50] shadow-lg">
            <Navbar />
          </div>
        </div>
      )}
    </div>
  );
};

export default HideableNavbar;
