
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import getLanguageByEnglish from '@/utils/languages';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DROPDOWN_ITEM_DATA_SYSTEM, DROPDOWN_ITEM_DATA_MASTER_SETUP, DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT, DROPDOWN_ITEM_DATA_EXPLOYEE_SELF_SERVICE } from './data/menulist';
import { useDirection } from '../../app/DirectionContext';


export default function Navheader() {

     // Sample data for the list
  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Pineapple',
    'Grapes',
    'Watermelon',
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle the search filtering
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered list based on the search term
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );


    return (
        <>
            <div className="nav-header bg-white h-20 flex w-full justify-evenly items-center">
                <div className='w-1/6 flex items-center justify-between'>
                    <Image
                        height={100}
                        width={100}
                        alt=''
                        src={'/BcoreLogo.png'}
                    />
                    <div className="vertical-line"></div>
                </div>
                <div className='w-3/6 flex justify-between'>
                    {/* Search input */}
                    <div className="relative">
                        <input
                        type="text"
                        className=" bg-[#EAF6FC]  px-6 py-2 border-0 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search for an item..."
                        value={searchTerm}
                        onChange={handleSearch}
                        />

                        {/* Show the list only when the search term is not empty */}
                        {searchTerm && (
                        <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                            {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <li
                                key={index}
                                className="p-3 cursor-pointer hover:bg-gray-100"
                                >
                                {item}
                                </li>
                            ))
                            ) : (
                            <li className="p-3 text-red-500">No items found</li>
                            )}
                        </ul>
                        )}
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Image
                            width={25}
                            height={25}
                            alt=''
                            src={'/header/help.png'}
                            className='opacity-50'
                        />
                        <Image
                            width={25}
                            height={25}
                            alt=''
                            src={'/header/Notification.png'}
                            className='opacity-50'
                        />
                    </div>
                </div>
                <div className="w-1/6 flex items-center gap-6">
                    <div className="vertical-line"></div>
                    <Image
                                    width={25}
                                    height={25}
                                    alt=''
                                    src={'/header/downarrow.png'}
                                    className='opacity-50'
                    />
                    <h3>Anna James</h3>
                    <Image
                        width={50}
                        height={50}
                        className='rounded-full'
                        alt=''
                        src={'/header/anna-james.jpg'}
                    />
                </div>
            </div>
        </>
    )
}