"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { menulist } from './data/menulist';

// Sample employee data based on employee code
const employeeData: Record<string, { name: string; profileImg: string }> = {
  '12345': { name: 'Anna James', profileImg: '/header/anna-james.jpg' },
  '67890': { name: 'John Doe', profileImg: '/header/john-doe.jpeg' },
  // Add more employee records as needed
};

interface NavheaderProps {
  employeeCode: string;
}

export default function Navheader({ employeeCode }: NavheaderProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const employee = employeeData[employeeCode] || { name: 'Unknown', profileImg: '/header/default-profile.jpg' };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const allMenuItems = menulist.flatMap(menu =>
    menu.Sub.flatMap(category =>
      category.MenuList.map(item => ({
        name: item.Name,
        path: item.Link
      }))
    )
  );

  const filteredItems = allMenuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (path: string) => {
    if (path) {
      router.push(path);
      setSearchTerm('');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClick = (option: string) => {
    setIsDropdownOpen(false);
    // Add actions for each option if needed
  };

  return (
    <div className="nav-header bg-white h-20 flex w-full justify-between md:justify-evenly items-center px-4 md:px-10">
      <div className="flex items-center space-x-2 md:w-1/6">
        <Image height={50} width={50} alt="Logo" src={'/BcoreLogo.png'} className="max-w-full" />
        <div className="hidden md:block vertical-line"></div>
      </div>

      <div className="hidden md:flex items-center space-x-4 md:w-3/6">
        <div className="relative flex-1">
          <input
            type="text"
            className="bg-[#EAF6FC] px-4 py-2 border-0 w-full max-w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for an item..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleItemClick(item.path)}
                    className="p-3 cursor-pointer hover:bg-gray-100"
                  >
                    {item.name}
                  </li>
                ))
              ) : (
                <li className="p-3 text-red-500">No items found</li>
              )}
            </ul>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <Image width={20} height={20} alt="Help" src={'/header/help.png'} className="opacity-50" />
          <Image width={20} height={20} alt="Notification" src={'/header/Notification.png'} className="opacity-50" />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:w-1/6 relative">
        <div className="hidden md:block vertical-line"></div>
        <Image
          width={20}
          height={20}
          alt="Dropdown"
          src={'/header/downarrow.png'}
          className="opacity-50 cursor-pointer"
          onClick={toggleDropdown}
        />
        <h3 className="truncate max-w-[80px] md:max-w-[160px]">{employee.name}</h3>
        <Image width={40} height={40} className="rounded-full max-w-full" alt="Profile" src={employee.profileImg} />

        {isDropdownOpen && (
          <div className="absolute top-14 right-0 bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-48 z-10">
            <ul className="flex flex-col text-sm">
              <li
                className="p-2 flex gap-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDropdownClick('View Profile')}
              >
                <Image width={20} height={20} alt="User" src={'/header/user.png'} />
                View Profile
              </li>
              <hr />
              <li
                className="p-2 flex gap-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDropdownClick('Change Password')}
              >
                <Image width={20} height={20} alt="Password" src={'/header/password.png'} />
                Change Password
              </li>
              <hr />
              <li
                className="p-2 flex gap-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDropdownClick('Logout')}
              >
                <Image width={20} height={20} alt="Logout" src={'/header/logout.png'} />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
