import Image from "next/image";
import getLanguageByEnglish from '@/utils/languages'
import Navheader from "@/components/Menu/updatedHeader";
import Navbar from "@/components/Menu/updatedNavbar";
export default function Home() {
    return (
        <>
            <div className="h-full w-full relative" >
                <Navheader/>
                <div className="absolute mt-0">
                    <Navbar/>
                </div>
                <div className=" text-center ml-28 mt-10">
                    <Image
                        src={'/dashboard.png'}
                        width={1000}
                        height={350}
                        alt=""
                        className="m-auto"
                    />
                </div>
            </div>
        </>
    )
}