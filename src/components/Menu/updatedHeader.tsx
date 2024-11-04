"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { menulist } from './data/menulist';
export default function Navheader() {
  const router = useRouter();


  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value);
  };

  // Flatten `menulist` structure to gather all menu items in one list for easier searching
  const allMenuItems = menulist.flatMap(menu =>
    menu.Sub.flatMap(category =>
      category.MenuList.map(item => ({
        name: item.Name,
        path: item.Link
      }))
    )
  );
// Filter menu items based on the search term
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

  const handleDropdownClick = (option:string) => {
    switch (option) {
      case 'View Profile':
        // Handle view profile action
        break;
      case 'Change Password':
        // Handle change password action
        break;
      case 'Logout':
        // Handle logout action
        break;
      default:
        break;
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="nav-header bg-white h-20 flex w-full justify-between md:justify-evenly items-center">
      <div className="w-1/6 flex items-center justify-between">
        <Image height={100} width={100} alt="" src={'/BcoreLogo.png'} />
        <div className="vertical-line"></div>
      </div>
      <div className="w-3/6 hidden md:flex justify-between">
        <div className="relative">
          <input
            type="text"
            className="bg-[#EAF6FC] px-6 py-2 border-0 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="flex gap-4 items-center">
          <Image width={25} height={25} alt="" src={'/header/help.png'} className="opacity-50" />
          <Image width={25} height={25} alt="" src={'/header/Notification.png'} className="opacity-50" />
        </div>
      </div>
      <div className="w-1/6 flex items-center gap-6 relative">
        <div className="vertical-line"></div>
        <Image
          width={25}
          height={25}
          alt=""
          src={'/header/downarrow.png'}
          className="opacity-50 cursor-pointer"
          onClick={toggleDropdown}
        />
        <h3>Anna James</h3>
        <Image width={50} height={50} className="rounded-full" alt="" src={'/header/anna-james.jpg'} />

        {isDropdownOpen && (
          <div className="absolute top-14 right-0 bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-64 z-10">
            <ul className="flex flex-col text-sm">
              <li
                className="p-2 flex gap-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDropdownClick('View Profile')}
              >
                <Image
                   width={25} height={25} alt="" src={'/header/user.png'}
                />
                View Profile
              </li>
              <hr />
              <li
                className="p-2 flex gap-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDropdownClick('Change Password')}
              >
                <Image
                   width={25} height={25} alt="" src={'/header/password.png'}
                />
                Change Password
              </li>
              <hr />
              <li
                className="p-2 flex gap-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDropdownClick('Logout')}
              >
                <Image
                   width={25} height={25} alt="" src={'/header/logout.png'}
                />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
