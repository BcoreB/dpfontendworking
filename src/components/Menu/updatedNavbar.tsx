"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import getLanguageByEnglish from '@/utils/languages';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DROPDOWN_ITEM_DATA_SYSTEM, DROPDOWN_ITEM_DATA_MASTER_SETUP, DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT, DROPDOWN_ITEM_DATA_EXPLOYEE_SELF_SERVICE } from './data/menulist';
import { useDirection } from '../../app/DirectionContext';

interface DropdownItem {
  title: string;
  href: string;
  icon: string;
}

interface DropdownCategory {
  category: string;
  items: DropdownItem[];
}

interface DropdownMenuItemProps {
  iconSrc: string;
  dropdownData: DropdownCategory[];
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isRtl } = useDirection(); // Get RTL direction from context

  return (
    <main className={`flex w-20 py-6 justify-between items-center flex-col h-screen bg-white ${isRtl ? 'rtl' : 'ltr'}`}>
      <div>
        <Image src={'/menu/rightarrow.png'} height={15} width={15} alt='' />
      </div>
      <nav className={`relative flex px-4 py-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <ul className={`flex flex-col gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <DropdownMenuItem iconSrc="/menu/Computer.png" dropdownData={DROPDOWN_ITEM_DATA_SYSTEM} />
          <DropdownMenuItem iconSrc="/menu/admin.png" dropdownData={DROPDOWN_ITEM_DATA_MASTER_SETUP} />
          <DropdownMenuItem iconSrc="/menu/cloud.png" dropdownData={DROPDOWN_ITEM_DATA_EXPLOYEE_SELF_SERVICE} />
          <DropdownMenuItem iconSrc="/menu/Computer.png" dropdownData={DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT} />
        </ul>
      </nav>
      <div className="controls flex flex-col gap-4">
        <Image src={'/header/help.png'} height={25} width={25} alt='' />
        <Image src={'/header/Notification.png'} height={25} width={25} alt='' />
        <Image src={'/header/Settings.png'} height={25} width={25} alt='' />
      </div>
    </main>
  );
}

function DropdownMenuItem({ iconSrc, dropdownData }: DropdownMenuItemProps) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const { isRtl } = useDirection();

  // Toggle dropdown visibility on icon click
  const handleIconClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center">
      {/* Icon with conditional background and click handler */}
      <img
        src={iconSrc}
        alt="Icon"
        ref={iconRef}
        onClick={handleIconClick}
        className={`w-8 h-8 cursor-pointer transition-colors duration-300 ${
          isDropdownVisible ? 'bg-gray-200' : ''
        }`}
      />

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className={`absolute w-72 top-0 left-full ml-8 bg-white z-100 text-black shadow-lg p-4 ${
            isRtl ? 'right-full ml-0 mr-4' : 'left-full ml-4'
          }`}
        >
          <ul className="grid gap-3">
            {dropdownData.map((category) => (
              <div key={category.category} className="pl-4">
                <h3 className="font-bold mb-2">{getLanguageByEnglish(category.category)}</h3>
                <ul className="list-none">
                  {category.items.map((item) => (
                    <li key={item.title} className="flex items-center mb-4 gap-2">
                      <Link href={item.href} className="text-sm">
                        {getLanguageByEnglish(item.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
