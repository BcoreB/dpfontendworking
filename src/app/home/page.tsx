"use client"
import Image from "next/image";
import getLanguageByEnglish from '@/utils/languages'
import Navheader from "@/components/Menu/updatedHeader";
import Dashboard from "@/components/dashboard/Dashboard";
export default function Home() {
    return (
        <>
            <div className="h-full w-full relative" >
                
                <div className=" text-center ml-28">
                    
                    <Dashboard />
                </div>
            </div>
        </>
    )
}