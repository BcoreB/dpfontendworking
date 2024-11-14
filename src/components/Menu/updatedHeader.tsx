"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { menulist, MenuItem } from './data/menulist';
import Navbar from "@/components/Menu/updatedNavbar";
import {getLanguageByEnglish} from '@/utils/languages';

// Sample employee data based on employee code
const employeeData: Record<string, { name: string; profileImg: string }> = {
  '12345': { name: 'Anna James', profileImg: '/header/anna-james.jpg' },
  '67890': { name: 'John Doe', profileImg: '/header/john-doe.jpeg' },
};

interface NavheaderProps {
  employeeCode: string;
}

export default function Navheader({ employeeCode }: NavheaderProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const employee = employeeData[employeeCode] || { name: 'Unknown', profileImg: '/header/default-profile.jpg' };

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNavbar = () => setIsNavbarVisible((prev) => !prev);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (path: string) => {
    if (path) {
      router.push(path);
      setSearchTerm('');
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleDropdownClick = (option: string) => setIsDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsNavbarVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = menulist.filter(item =>
    item.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={`nav-header fixed z-10 bg-white h-20 flex w-full justify-between md:justify-evenly items-center px-4 md:px-10 ${isMobile ? "w-[90%] mx-auto mt-4 rounded-lg shadow-lg " : ""}`}>
        {isMobile && (
          <div className="top-4 left-4 z-10">
            <Image
              src="/menu/menu.png"
              alt="Open Navbar"
              width={30}
              height={30}
              className="cursor-pointer"
              onClick={toggleNavbar}
            />
          </div>
        )}
        <div className="flex items-center gap-4 space-x-2 md:w-1/6">
          <Image height={50} width={50} alt="Logo" src={'/BcoreLogo.png'} className="max-w-full" />
          <div className="hidden md:block vertical-line"></div>
        </div>

        <div className="hidden md:flex items-center gap-6 md:w-3/6">
          <div className="relative flex-1">
            <input
              type="text"
              className="bg-[#EAF6FC] px-4 py-2 border-0 w-full max-w-full shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={getLanguageByEnglish("Search for an item...")}
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleItemClick(item.Link)}
                      className="p-3 cursor-pointer hover:bg-gray-100"
                    >
                      {item.Name}
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-red-500">{getLanguageByEnglish('No items found')}</li>
                )}
              </ul>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Image width={20} height={20} alt="Help" src={'/header/help.png'} className="opacity-50" />
            <Image width={20} height={20} alt="Notification" src={'/header/Notification.png'} className="opacity-50" />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:w-1/6 gap-4 relative">
          <div className="hidden md:block vertical-line"></div>
          <Image
            width={20}
            height={20}
            alt="Dropdown"
            src={'/header/downarrow.png'}
            className="opacity-50 cursor-pointer"
            onClick={toggleDropdown}
          />
          {isClient && (
            <>
              <h3 className="truncate max-w-[80px] md:max-w-[160px]">{employee.name}</h3>
              <Image width={40} height={40} className="rounded-full max-w-full" alt="Profile" src={employee.profileImg} />
            </>
          )}

          {isDropdownOpen && (
            <div className="absolute top-14 right-0 bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-48 z-10">
              <ul className="flex flex-col text-sm">
                <li
                  className="p-2 flex gap-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDropdownClick('View Profile')}
                >
                  <Image width={20} height={20} alt="User" src={'/header/user.png'} />
                  {getLanguageByEnglish('View Profile')}
                </li>
                <hr />
                <li
                  className="p-2 flex gap-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDropdownClick('Change Password')}
                >
                  <Image width={20} height={20} alt="Password" src={'/header/password.png'} />
                  {getLanguageByEnglish('Change Password')}
                </li>
                <hr />
                <li
                  className="p-2 flex gap-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDropdownClick('Logout')}
                >
                  <Image width={20} height={20} alt="Logout" src={'/header/logout.png'} />
                  {getLanguageByEnglish('Logout')}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {isMobile && isNavbarVisible && (
        <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 z-40">
          <div ref={sidebarRef} className="absolute left-0 navbar-div bg-white z-50">
            <Navbar />
          </div>
        </div>
      )}
    </>
  );
}
