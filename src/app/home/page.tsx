import Image from "next/image";
import getLanguageByEnglish from '@/utils/languages'
import Navbar from "../../components/Menu/Navbar";
export default function Home() {
  return (
    <main className="landing-bg w-full h-full justify-between relative px-5 py-5  lg:px-20 lg:pb-14 lg:pt-8">
      {/* <nav className="flex justify-between align-center">
        <h2 className="text-white font-bold lg:text-2xl text-sm">BCoreHCM</h2>
        <button>EN</button>
      </nav> */}
      <Navbar />
      <header className="lg:flex h-full justify-between py-10">
        <div className="header-text lg:w-2/4 w-full pt-10 md:pt-14">
          <div className="heading">
            <h1 className="lg:text-6xl text-3xl font-bold text-black">{getLanguageByEnglish("Unlocking Human")}</h1>
            <h1 className="lg:text-6xl text-3xl font-bold stroke-text-black">{getLanguageByEnglish("Potential, Powering")}</h1>
            <h1 className="lg:text-6xl text-2xl font-bold text-white">{getLanguageByEnglish("Organizational Success:")} </h1>
            <h1 className="lg:text-6xl text-2xl font-bold stroke-text">{getLanguageByEnglish(" Our BCoreHCM Solution")}</h1>
          </div>
          <p className="pt-5 lg:w-5/6 md:w-3/6 text-xs lg:text-base"> {getLanguageByEnglish("Welcome to BCoreHCM. Connecting People, Streamlining Processes: Revolutionizing HCM for Modern Businesses")}</p>
          
        </div>
        <div className="header-img lg:w-2/4 md:w-3/4 md:m-auto md:pt-10">
          <Image 
            width={500}
            height={500}
            alt="img"
            src={'/home-img.png'}
            className="m-auto"
          />
        </div>
       
        
      </header>
    </main>
  );
}
