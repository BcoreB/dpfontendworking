"use client"
import Image from "next/image";
import getLanguageByEnglish from '@/utils/languages'
import Navheader from "@/components/Menu/updatedHeader";
import Dashboard from "@/components/dashboard/Dashboard";
export default function Home() {
    const employeeCode = "12345";
    return (
        <>
            <div className="h-full w-full relative " >
                
            <div className="text-center md:ml-28 md:max-h-[90vh] md:overflow-y-auto">
                    
                    <Dashboard employeeCode={employeeCode} />
                </div>
            </div>
        </>
    )
}