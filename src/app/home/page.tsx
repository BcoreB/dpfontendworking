import Image from "next/image";
import getLanguageByEnglish from '@/utils/languages'
import Navheader from "@/components/Menu/updatedHeader";

export default function Home() {
    return (
        <>
            <div className="h-full w-full relative" >
                
                <div className=" text-center ml-28">
                    
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