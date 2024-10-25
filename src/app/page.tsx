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
import { useState, useEffect } from 'react'; // Import useState hook
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

  // carousel
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/home/image1.png",
      title: "Slide 1 Title",
      text: "This is the description for slide 1.",
    },
    {
      image: "/home/image2.png",
      title: "Slide 2 Title",
      text: "This is the description for slide 2.",
    },
    {
      image: "/home/image3.png",
      title: "Slide 3 Title",
      text: "This is the description for slide 3.",
    },
  ];

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);


  return (
    <main className="flex h-full w-full justify-between max-w-screen-2xl p-5 m-auto lg:px-60 lg:p-14">
        <div className="landing-text bg-white w-1/2  pt-8 px-12">
          <div className="logo">
            <Image
              width={100}
              height={100}
              src={'/logo.png'}
              alt='logo'
            />
          </div>
          <h4 className='pt-12'><span dir="ltr">welcome Back!</span></h4>
          <h1 className='text-3xl font-bold mt-2'>Login to your account</h1>
          <LoginForm />
        </div>
        <div className="landing-carousel bg-blue-500 w-1/2">
          <div className="relative w-full mx-auto">
            {/* Slide */}
            <div className="w-full h-full  text-white text-center  items-center py-10 overflow-hidden">
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                className="w-7/12 h-auto m-auto rounded-md object-cover"
              />
              <div className='pt-20'>
                <h2 className="text-3xl font-bold">{slides[currentIndex].title}</h2>
                <p className="mt-2 text-lg">{slides[currentIndex].text}</p>
              </div>
            </div>

            {/* Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-400"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
    </main>
  );
}
