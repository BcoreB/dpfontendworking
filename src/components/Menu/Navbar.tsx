"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from "@/lib/utils";
import getLanguageByEnglish from '@/utils/languages'
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import DROPDOWN_ITEM_DATA_SYSTEM from './data/systemData';
// import DROPDOWN_ITEM_DATA_MASTER_SETUP from './data/MasterSetupData';
import { DROPDOWN_ITEM_DATA_SYSTEM, DROPDOWN_ITEM_DATA_MASTER_SETUP, DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT, DROPDOWN_ITEM_DATA_EXPLOYEE_SELF_SERVICE } from './data/menulist';

// The rest of your Navbar component remains the same


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
  itemText: string;
  dropdownData: DropdownCategory[];
  isMobileMenu?: boolean;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: 'power3.inOut' });
    } else {
      gsap.to(sidebarRef.current, { x: '100%', duration: 0.5, ease: 'power3.inOut' });
    }
  }, [isMobileMenuOpen]);

  return (
    <main className="flex-row w-full">
      <NavigationMenu className="relative flex items-center justify-between px-4 py-4">
        <div className="Logo">
          <h1 className='text-2xl font-bold'>BCore</h1>
        </div>
        <button 
          className="lg:hidden block text-2xl absolute right-4" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
        <NavigationMenuList className={`hidden lg:flex flex-row gap-4`}>
          <DropdownMenuItem itemText="System" dropdownData={DROPDOWN_ITEM_DATA_SYSTEM} />
          <DropdownMenuItem itemText="Master Setup" dropdownData={DROPDOWN_ITEM_DATA_MASTER_SETUP} />
          <DropdownMenuItem itemText="Employee Self Service" dropdownData={DROPDOWN_ITEM_DATA_EXPLOYEE_SELF_SERVICE} />
          <DropdownMenuItem itemText="Employee Management" dropdownData={DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT} />
          <NavigationMenuItem>
            <Link href="/" className='hidden md:block' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Button variant={'default'} className='text-black bg-white hidden md:block'>{getLanguageByEnglish("LOGOUT ")} </Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        
        <div 
          ref={sidebarRef} 
          className={`fixed top-0 right-0 w-3/4 h-full bg-white text-black flex flex-col items-start p-4 lg:hidden transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}
        >
          <button 
            className="self-end text-3xl mb-4" 
            onClick={toggleMobileMenu}
          >
            ✖
          </button>
          <div className="flex flex-col gap-6 w-full">
            <DropdownMenuItem itemText="System" dropdownData={DROPDOWN_ITEM_DATA_SYSTEM} isMobileMenu />
            <DropdownMenuItem itemText="Master Setup" dropdownData={DROPDOWN_ITEM_DATA_MASTER_SETUP} isMobileMenu />
            <DropdownMenuItem itemText="Employee Self Service" dropdownData={DROPDOWN_ITEM_DATA_EXPLOYEE_SELF_SERVICE} />
            <DropdownMenuItem itemText="Employee Management" dropdownData={DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT} />
          </div>
          <div className="mt-auto w-full">
            <Button variant={'default'} className='text-white bg-black mt-4 w-full'> LOGOUT </Button>
          </div>
        </div>
      </NavigationMenu>
    </main>
  );
}

function DropdownMenuItem({ itemText, dropdownData, isMobileMenu = false }: DropdownMenuItemProps & { isMobileMenu?: boolean }) {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="text-base">{itemText}</NavigationMenuTrigger>
        <NavigationMenuContent className={`bg-white z-100 text-black ${isMobileMenu ? 'overflow-y-auto max-h-60 ' : ''}`}>
          <ul className={`grid gap-3 p-4 ${isMobileMenu ? 'w-[200px] z-100' : 'md:w-[500px] md:grid-cols-2 lg:w-[600px]'}`}>
            {dropdownData.map((category) => (
              <div key={category.category}>
                <h3 className="font-bold mb-2">{getLanguageByEnglish(category.category)}</h3>
                <ul className={`list-none ${isMobileMenu ? '' : 'pl-4'}`}>
                  {category.items.map((item) => (
                    <li key={item.title} className="flex items-center mb-4 gap-2">
                      <img src={item.icon} alt="" className="mr-2" width={30} height={30} />
                      <Link href={item.href} className="text-sm">{getLanguageByEnglish(item.title)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
});
ListItem.displayName = "ListItem";
