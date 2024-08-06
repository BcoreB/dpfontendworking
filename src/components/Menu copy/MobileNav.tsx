"use client";

// import { PRODUCT_CATEGORIES } from "@/config";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menulist from "./menu";

import { Accordion,AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";

const MobileNav = () => {
  interface LinkProps {
    Id: number,
    Name: string,
    Sub?: Array<{   CategoryId: number, 
                    CategoryName: string, 
                    MenuList?: Array<{
                        MenuID: number,
                        Name: string,
                        Link:string                    
                        }>
                }>
}
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-pink-700 via-blue-400  bg-no-repeat text-white">
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>
 
      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div className="bg-gradient-to-br from-indigo-500 to-pink-700 via-blue-400  bg-no-repeat text-white  relative flex w-full max-w-sm flex-col overflow-y-auto  pb-12 shadow-xl">
            <div className="flex items-stretch justify-between px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                
                <X className="h-6 w-6" aria-hidden="true" />
                
              </button>
              <a href="/" className="font-bold text-white text-xl max-sm:px-5 ">PowerHCM</a>
            </div>

            <div className="bg-slate-100 mt-2">
              <ul>
              
                {menulist.map((menuitem: LinkProps) =>(
                  <li
                    key={menuitem.Id}
                    className="space-y-1 px-4 pb-8 pt-10"
                  >
                    <div className="border-b border-gray-200">
                      <div className="-mb-px flex bg-slate-200 ">
                        
                        <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium text-center">
                          {menuitem.Name} 
                        
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-1 gap-x-4">
                      {menuitem.Sub?.map((menuCat)=>(
                        
                          <div key={menuCat.CategoryId} className="border-b border-gray-200">
                              <div className="-mb-px flex">
                              <p className="uppercase tracking-wider text-gray-500 font-medium text-[13px]">{menuCat.CategoryName}</p>
                                {/* <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                                  {menuCat.CategoryName} 
                                  2
                                </p> */}
                              </div>
                            <div>
                              {
                                menuCat.MenuList?.map((menu)=>(
                                                        <div key={menu.MenuID} className="group relative text-sm px-4">
                                                        {/* <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                          <Image
                                                            fill
                                                            src={item.imageSrc}
                                                            alt="product category image"
                                                            className="object-cover object-center"
                                                          />
                                                        </div> */}
                                                        <Link
                                                          href={menu.Link}
                                                          className="mt-6 block font-medium text-gray-900"
                                                        >
                                                          {menu.Name} &rarr;

                                                        </Link>
                                           
                                                      </div>
                                ))
                              }
                              
                            </div>
                            </div>
                            
                            
                    
                        // <div key={menuCat.CategoryId} className="group relative text-sm">
                        //   {/* <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        //     <Image
                        //       fill
                        //       src={item.imageSrc}
                        //       alt="product category image"
                        //       className="object-cover object-center"
                        //     />
                        //   </div> */}
                        //   <Link
                        //     href={menuCat.CategoryName}
                        //     className="mt-6 block font-medium text-gray-900"
                        //   >
                        //     {menuCat.CategoryName}
                        //   </Link>
                        // </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent("/sign-in")}
                  href="/sign-in"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent("/sign-up")}
                  href="/sign-up"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
    
//     <div className="bg-gradient-to-br from-indigo-500 to-pink-700 via-blue-400  bg-no-repeat text-white">
//       <div className="relative z-40 lg:hidden">
//         <div className="fixed inset-0 bg-black bg-opacity-25" />
//       </div>
// <div id="accordion-color" data-accordion="collapse" data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
//   <h2 id="accordion-color-heading-1">
//     <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
//       <span>What is Flowbite?</span>
//       <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
//       </svg>
//     </button>
//   </h2>
//   <div id="accordion-color-body-1" className="hidden" aria-labelledby="accordion-color-heading-1">
//     <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
//       <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
//       <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
//     </div>
//   </div>
//   <h2 id="accordion-color-heading-2">
//     <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-2" aria-expanded="false" aria-controls="accordion-color-body-2">
//       <span>Is there a Figma file available?</span>
//       <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
//       </svg>
//     </button>
//   </h2>
//   <div id="accordion-color-body-2" className="hidden" aria-labelledby="accordion-color-heading-2">
//     <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
//       <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
//       <p className="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
//     </div>
//   </div>
//   <h2 id="accordion-color-heading-3">
//     <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-3" aria-expanded="false" aria-controls="accordion-color-body-3">
//       <span>What are the differences between Flowbite and Tailwind UI?</span>
//       <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
//       </svg>
//     </button>
//   </h2>
//   <div id="accordion-color-body-3" className="hidden" aria-labelledby="accordion-color-heading-3">
//     <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
//       <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
//       <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
//       <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
//       <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
//         <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
//         <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
//       </ul>
//     </div>
//   </div>
// </div>
// </div>
  );
};

export default MobileNav;
