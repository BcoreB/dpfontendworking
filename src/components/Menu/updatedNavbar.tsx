"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getLanguageByEnglish } from '@/utils/languages';
import Link from "next/link";
import { DROPDOWN_ITEM_DATA_SYSTEM, DROPDOWN_ITEM_DATA_MASTER_SETUP, DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT, DROPDOWN_ITEM_DATA_EMPLOYEE_SELF_SERVICE } from './data/menulist';
import { useDirection } from '../../app/DirectionContext';

interface DropdownItem {
  title: string;
  name: string; // Added 'name' field
  href: string;
  icon: string;
}


interface DropdownCategory {
  category: string;
  parentName:string;
  items: DropdownItem[];
}

interface DropdownMenuItemProps {
  iconSrc: string;
  dropdownData: DropdownCategory[];
  isExpanded: boolean;
}

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isRtl } = useDirection();

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <main
      className={`flex ${isExpanded ? 'w-64' : 'w-12'} py-6 text-white justify-between ${isExpanded ?'items-start':'items-center'}   ${isExpanded ?'pl-4':''} flex-col h-lvh bg-[#33475b] transition-width duration-300 ${isRtl ? 'rtl' : 'ltr'}`}
    >
      <div className="cursor-pointer" onClick={toggleExpand}>
        <Image
          src={isExpanded ? '/menu/leftarrow.png' : '/menu/rightarrow.png'}
          height={20}
          width={20}
          alt="Toggle Menu"
          className={`transition-transform mt-10 text-white duration-300 ${isExpanded ? 'absolute text-white right-10' : ''}`}
        />
      </div>
      <nav className={`relative flex px-2 py-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <ul className={`flex flex-col gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <DropdownMenuItem
          iconSrc="/menu/Computer.png"
          dropdownData={DROPDOWN_ITEM_DATA_SYSTEM || []} // Ensure default value
          isExpanded={isExpanded}
        />

          <DropdownMenuItem iconSrc="/menu/admin.png" dropdownData={DROPDOWN_ITEM_DATA_MASTER_SETUP} isExpanded={isExpanded} />
          <DropdownMenuItem iconSrc="/menu/cloud.png" dropdownData={DROPDOWN_ITEM_DATA_EMPLOYEE_SELF_SERVICE} isExpanded={isExpanded} />
          <DropdownMenuItem iconSrc="/menu/Computer.png" dropdownData={DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT} isExpanded={isExpanded} />
        </ul>
      </nav>
      <div className="controls flex flex-col gap-4">
        <div className="flex items-center">
          <Image src={'/header/help.png'} height={16} width={16} alt="Help" />
          {isExpanded && <span className="mx-4 text-sm font-medium text-white">{getLanguageByEnglish('Help & Support')}</span>}
        </div>
        <div className="flex items-center">
          <Image src={'/header/Notification.png'} height={16} width={16} alt="Notifications" />
          {isExpanded && <span className="mx-4 text-sm font-medium text-white">{getLanguageByEnglish('Notifications')}</span>}
        </div>
        <div className="flex items-center">
          <Image src={'/header/Settings.png'} height={16} width={16} alt="Settings" />
          {isExpanded && <span className="mx-4 text-sm font-medium text-white">{getLanguageByEnglish('Settings')}</span>}
        </div>
      </div>
    </main>
  );
}

function DropdownMenuItem({ iconSrc, dropdownData, isExpanded }: DropdownMenuItemProps) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };


  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        itemRef.current &&
        !itemRef.current.contains(event.target as Node)
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
    <div className="relative flex items-center" onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      <div
        ref={itemRef}
        onClick={handleToggleDropdown}
        className="flex gap-4 items-center cursor-pointer"
      >
        <Image
          src={iconSrc}
          alt="Icon"
          height={20}
          width={20}
          className="transition-all duration-300"
        />
        {isExpanded && dropdownData?.length > 0 && (
          <span className="ml-2 text-sm font-medium transition-opacity duration-300">
            {getLanguageByEnglish(dropdownData[0].parentName)}
          </span>
        )}
      </div>

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className={`absolute w-72 top-0 bg-[#33475b] z-50 text-white rounded-r-lg shadow-lg p-4`}
          style={{
            left: isExpanded ? '14rem' : '2.5rem', // Sidebar width: 64px (16rem) when expanded, 10px (2.5rem) otherwise
            marginLeft: '10px', // Ensures 20px gap
          }}
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
