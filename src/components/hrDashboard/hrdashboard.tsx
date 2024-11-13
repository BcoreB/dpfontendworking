"use client"
// components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import SummaryCards from './SummaryCards';
import NationalityChart from './Nationality';
import DepartmentWise from './department';
import SalaryChart from './salary';
import AnnouncementComponent from './announcement';
import LocationWise from './locationWise';
import ComponentSalaryChart from './componentSalary';
import SalaryByDashboard from './salarybycomponent';
import 'devextreme/dist/css/dx.light.css';

interface EmpProps {
  employeeCode: string;
}

const HRDashboard: React.FC<EmpProps> = ({ employeeCode }) => {
  const safeEmployeeCode = employeeCode || '';
  const [attendanceEntries, setAttendanceEntries] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  return (
    <div className="p-4 md:p-10 space-y-6 max-h-lvh">
      {/* Profile and Summary Cards */}
      <div className="flex flex-col md:flex-row  justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3"><ProfileCard employeeCode={safeEmployeeCode}/></div>
        <div className="w-full md:w-2/3"><SummaryCards employeeCode={safeEmployeeCode}/></div>
      </div>

      {/* Main Content Accordions for Mobile */}
      {isMobile ? (
        <>
          <div>
            <button onClick={() => toggleAccordion("attendance")} className="w-full text-left font-medium p-4 bg-gray-100 rounded-md shadow">
              Nationality & Department Wise
            </button>
            {openAccordion === "attendance" && (
              <div className="p-4 space-y-4">
                <NationalityChart />
                <DepartmentWise />
              </div>
            )}
          </div>

          <div>
            <button onClick={() => toggleAccordion("documents")} className="w-full text-left font-medium p-4 bg-gray-100 rounded-md shadow">
            Salary and Announcements
            </button>
            {openAccordion === "documents" && (
              <div className="p-4 space-y-4">
                <SalaryChart />
                <AnnouncementComponent/>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => toggleAccordion("salaryAnnouncements")} className="w-full text-left font-medium p-4 bg-gray-100 rounded-md shadow">
              Location Wise
            </button>
            {openAccordion === "salaryAnnouncements" && (
              <div className="p-4 space-y-4">
                <LocationWise/>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => toggleAccordion("others")} className="w-full text-left font-medium p-4 bg-gray-100 rounded-md shadow">
              Pay Slip, Leave, and Loan Requests
            </button>
            {openAccordion === "others" && (
              <div className="p-4 space-y-4">
               
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Main Tables Section for Desktop */}
          <div className="flex flex-col  md:flex-row justify-between space-y-12 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
                <NationalityChart />
            </div>
            <div className="w-full md:w-1/2">
                <DepartmentWise/>
            </div> 
          </div>

          <div className="flex flex-col md:flex-row my-10 justify-between space-y-12 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
                <SalaryChart />
            </div>
            <div className="w-full md:w-1/2">
                <AnnouncementComponent/>
            </div>
            
          </div>

          {/* Bottom Section: Salary and Announcements */}
          <div className="flex flex-col justify-between gap-10 md:space-y-0 md:space-x-4">
            <LocationWise/>
            <ComponentSalaryChart/>
            <SalaryByDashboard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
          </div>
        </>
      )}
    </div>
  );
};

export default HRDashboard;
