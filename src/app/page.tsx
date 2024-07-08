 
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
 
import { useEffect } from 'react';

// Declare your global variable and set its initial value
 

export default function Home() {
 
  return (
    <MaxWidthWrapper>
      <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl '>
        {/* bg-gradient-to-br from-indigo-500 to-pink-700 via-blue-400  bg-no-repeat relative h-full font-sans antialiased */}
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            
            Unlocking Human Potential, Powering Organizational Success: {' '}
            <span className='text-blue-600'>
              Our BCoreHCM Solution 
            </span>
            .
          </h1>
          {/* Arabic Transulation Has to do here */}
          {/* <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
          إطلاق العنان للإمكانات البشرية وتعزيز النجاح التنظيمي:
          </h1>
          <span className='text-blue-600'>
          &zwj;حل PowerHCM الخاص بنا
            </span> */}
          
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Welcome to BCoreHCM. Connecting People, 
            Streamlining Processes: Revolutionizing HCM for Modern Businesses
          </p>

      </div> 
     </MaxWidthWrapper>
  )
}
