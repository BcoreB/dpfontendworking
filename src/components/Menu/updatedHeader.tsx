"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

export default function Navheader() {
  const router = useRouter();

  // Sample data with names and paths
  const items = [
    { name: 'Employee Master', path: '/masters/employeemaster' },
    { name: 'Leave Entry', path: '/documents/leaveentry' },
    { name: 'Departmen tMaster', path: '/masters/departmentmaster' },
    { name: 'Allowance Deduction Entry', path: '/documents/allowancedeductionentry' },
    { name: 'Allowance Deduction Master', path: '/OtherMaster/allowancedeductionmaster' },
    { name: 'Air Sector Master', path: '/masters/airsectormaster' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle the search filtering
  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value);
  };

  // Filtered list based on the search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle the click on a search result item
  const handleItemClick = (path:string) => {
    router.push(path); // Redirects to the path of the selected item
    setSearchTerm(''); // Clears the search bar after navigation
  };

  return (
    <div className="nav-header bg-white h-20 flex w-full justify-evenly items-center">
      <div className='w-1/6 flex items-center justify-between'>
        <Image height={100} width={100} alt='' src={'/BcoreLogo.png'} />
        <div className="vertical-line"></div>
      </div>
      <div className='w-3/6 flex justify-between'>
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
        <div className='flex gap-4 items-center'>
          <Image width={25} height={25} alt='' src={'/header/help.png'} className='opacity-50' />
          <Image width={25} height={25} alt='' src={'/header/Notification.png'} className='opacity-50' />
        </div>
      </div>
      <div className="w-1/6 flex items-center gap-6">
        <div className="vertical-line"></div>
        <Image width={25} height={25} alt='' src={'/header/downarrow.png'} className='opacity-50' />
        <h3>Anna James</h3>
        <Image width={50} height={50} className='rounded-full' alt='' src={'/header/anna-james.jpg'} />
      </div>
    </div>
  );
}
