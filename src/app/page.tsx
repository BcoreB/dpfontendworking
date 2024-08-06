// import Image from "next/image";
// import LoginForm from "./components/LoginForm";
// export default function Home() {
//   return (
//     <main className="landing-bg h-full w-full justify-between p-5 lg:px-20 lg:p-14 ">
//       <nav className="flex justify-between align-center">
//         <h2 className="text-white font-bold lg:text-2xl text-sm">BCoreHCM</h2>
//         <button>EN</button>
//       </nav>
//       <header className="md:flex justify-between py-10 relative">
//         <div className="header-text lg:w-2/4 w-full">
//           <div className="heading md:pt-20 pt-5">
//             <h1 className="lg:text-6xl text-3xl font-bold text-black">Unlocking Human</h1>
//             <h1 className="lg:text-6xl text-3xl font-bold stroke-text-black">Potential, Powering</h1>
//             <h1 className="lg:text-6xl text-3xl font-bold text-white">Organizational Success:</h1>
//             <h1 className="lg:text-6xl text-3xl font-bold stroke-text">Our BCoreHCM Solution</h1>
//           </div>
//           <p className="pt-5 lg:w-5/6 text-xs lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
         
//         </div>
//         <div className="header-img md:w-2/4 md:pt-16">
//           <Image 
//             width={500}
//             height={500}
//             alt="img"
//             src={'/home-img.png'}
//             className="m-auto"
//           />
//         </div>
//       </header>
//       <div className="absolute bottom-1 md:w-1/4 w-3/4 right-1">
//         <LoginForm />
//       </div>
//     </main>
//   );
// }


"use client"
import { useState } from 'react'; // Import useState hook
import Image from 'next/image';
import LoginForm from '../components/Menu/LoginForm';

export default function Home() {
  const [language, setLanguage] = useState('EN'); // State to track language

  // Function to toggle language
  const toggleLanguage = () => {
    if (language === 'EN') {
      setLanguage('AR');
    } else {
      setLanguage('EN');
    }
  };

  return (
    <main className="landing-bg h-full w-full justify-between p-5 lg:px-20 lg:p-14">
      <nav className="flex justify-between align-center">
        <h2 className="text-white font-bold lg:text-2xl text-sm">BCoreHCM</h2>
        <button onClick={toggleLanguage}>{language === 'EN' ? 'AR' : 'EN'}</button>
      </nav>
      <header className="md:flex justify-between py-10 relative">
        <div className="header-text lg:w-2/4 w-full">
          <div className="heading md:pt-20 pt-5">
            <h1 className="lg:text-6xl text-3xl font-bold text-black">
              {language === 'EN' ? 'Unlocking Human' : 'فتح الإنسان'}
            </h1>
            <h1 className="lg:text-6xl text-3xl font-bold stroke-text-black">
              {language === 'EN' ? 'Potential, Powering' : 'الإمكانات، تمكين'}
            </h1>
            <h1 className="lg:text-6xl text-3xl font-bold text-white">
              {language === 'EN' ? 'Organizational Success:' : 'النجاح التنظيمي:'}
            </h1>
            <h1 className="lg:text-6xl text-3xl font-bold stroke-text">
              {language === 'EN' ? 'Our BCoreHCM Solution' : 'حلولنا BCoreHCM'}
            </h1>
          </div>
          <p className="pt-5 lg:w-5/6 text-xs lg:text-base">
          Welcome to BCoreHCM. Connecting People, 
          Streamlining Processes: Revolutionizing HCM for Modern Businesses
          </p>
        </div>
        <div className="header-img md:w-2/4 md:pt-16">
          <Image 
            width={500}
            height={500}
            alt="img"
            src={'/home-img.png'}
            className="m-auto"
          />
        </div>
      </header>
      <div className="absolute bottom-1 md:w-1/4 w-3/4 right-5">
        <LoginForm />
      </div>
    </main>
  );
}
