import React from 'react'
import menulist from './menu'
import Link from 'next/link'
import MobileNav from './MobileNav'

const PMenu = () => {
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
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between  text-white">
        <MobileNav /> 
       <a href="/" className="font-bold text-white text-xl max-sm:px-5">BCoreHCM</a>
       <button  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
       
    </button>
    <div className='max-sm:hidden'>
    <nav  >
      <ul className="flex items-center justify-center font-semibold">
        {
          menulist.map((menuitem: LinkProps) =>(
        <li className="relative group px-3 py-2" key={menuitem.Id}>
          <button className="hover:opacity-50 cursor-default">{menuitem.Name}</button>
          <div
            className="absolute top-0 -left-48 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[560px] transform">
            <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
              <div
                className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-x-[12rem] duration-500 ease-in-out rounded-sm">
              </div>
               
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-6">
                {menuitem.Sub?.map((menuCat)=>(
                  <div key={menuCat.CategoryId}>
                    <p className="uppercase tracking-wider text-gray-500 font-medium text-[13px]">{menuCat.CategoryName}</p>
                    <ul className="mt-3 text-[15px]">
                    {
                                    menuCat.MenuList?.map((menu)=>(
                      <li key={menu.MenuID}>
                        <Link key={menu.MenuID} 
                        
                        href={menu?.Link ==="" ? "/" :process.env.NEXT_PUBLIC_SERVER_URL+menu?.Link }
                        className="block p-2 -mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-blue-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-indigo-600">
                          {menu.Name}
                        </Link>
                        {/* <a href="#"
                          className="block p-2 -mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-blue-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-indigo-600">
                                                  <p className="text-gray-500 font-normal">{menu.Name}</p>
                        </a> */}
                      </li>
                                    ))}
                    </ul>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </li>
          ))
        }
        
        
        
        
        
      </ul>
    </nav>
    </div>
    <nav>
      <ul>
        <li>
          <a href="#" className="rounded-full px-3 py-2 font-semibold bg-white bg-opacity-10 flex items-center group">
            <span className="mr-2">Sign in</span>
            <svg className="stroke-current" width="10" height="10" strokeWidth="2" viewBox="0 0 10 10" aria-hidden="true">
              <g fillRule="evenodd">
                <path className="opacity-0 group-hover:opacity-100 transition ease-in-out duration-200" d="M0 5h7"></path>
                <path
                  className="opacity-100 group-hover:transform group-hover:translate-x-1 transition ease-in-out duration-200"
                  d="M1 1l4 4-4 4"></path>
              </g>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </header>
  
     
  )
}

export default PMenu