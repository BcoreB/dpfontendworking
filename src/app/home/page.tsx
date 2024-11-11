"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import getLanguageByEnglish from '@/utils/languages'
import Navheader from "@/components/Menu/updatedHeader";
import Dashboard from "@/components/dashboard/Dashboard";
import { useEmployee } from '@/app/EmployeeContext';
import config from '@/app/app.config';  // Import the config file
export default function Home() {
    const { employeeCode } = useEmployee(); // Access employeeCode from context
    return (
        <>
            <div className="h-full w-full relative " >
                
            <div className="text-center md:ml-28 md:max-h-[90vh] md:overflow-y-auto">
                    <Dashboard employeeCode={employeeCode||''} />
                </div>
            </div>
        </>
    )
}