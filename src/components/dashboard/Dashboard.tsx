"use client"
// components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import SummaryCards from './SummaryCards';
import AttendanceTable from './AttendanceTable';
import LeaveTable from './LeaveTable';
import DocumentsTable from './DocumentsTable';
import HolidaysTable from './HolidaysTable';
import TrainingTable from './TrainingTable';
import SalaryStatistics from './SalaryStatistics';
import Announcements from './Announcements';
import Attendance from './Attendance';
import RequestTables from './AttendanceRequest';
import StaffLedgerTable from './StaffLedgerTable';
import LoanRequestTables from './LoanRequestTable';
import PaySlipTable from './PaySlipTable';

import 'devextreme/dist/css/dx.light.css';
import { getLanguageByEnglish } from '@/utils/languages';

interface EmpProps {
  employeeCode: string;
}

const Dashboard: React.FC<EmpProps> = ({ employeeCode }) => {
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

  const handleAddEntry = (entry) => {
    setAttendanceEntries((prevEntries) => [...prevEntries, entry]);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  return (
    <div className="p-4 md:p-10 space-y-6 max-h-lvh">
      
      {/* Profile and Summary Cards */}
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3"><ProfileCard employeeCode={safeEmployeeCode}/></div>
        <div className="w-full md:w-2/3"><SummaryCards employeeCode={safeEmployeeCode}/></div>
      </div>

      {/* Main Content Accordions for Mobile */}
      {isMobile ? (
        <>
          <div>
            <button onClick={() => toggleAccordion("attendance")} className="w-full text-left font-medium p-4 bg-gray-100 rounded-md shadow">
              {getLanguageByEnglish('Attendance')}
            </button>
            {openAccordion === "attendance" && (
              <div className="p-4 space-y-4">
                <Attendance onAddEntry={handleAddEntry} />
                <AttendanceTable attendanceEntries={attendanceEntries} employeeCode={safeEmployeeCode} />
                <RequestTables employeeCode={safeEmployeeCode} />
              </div>
            )}
          </div>

          <div>
            <button onClick={() => toggleAccordion("documents")} className="w-full text-left font-medium p-4 bg-gray-100 rounded-md shadow">
            {getLanguageByEnglish('Documents, Holidays, and Training')}
            </button>
            {openAccordion === "documents" && (
              <div className="p-4 space-y-4">
                <DocumentsTable employeeCode={safeEmployeeCode} />
                <HolidaysTable employeeCode={safeEmployeeCode} />
                <TrainingTable employeeCode={safeEmployeeCode} />
              </div>
            )}
          </div>

          <div>
            <button onClick={() => toggleAccordion("salaryAnnouncements")} className="w-full text-left font-medium p-4 bg-gray-100 rounded-md shadow">
            {getLanguageByEnglish('Salary and Announcements')}
            </button>
            {openAccordion === "salaryAnnouncements" && (
              <div className="p-4 space-y-4">
                <SalaryStatistics employeeCode={safeEmployeeCode} />
                <Announcements />
                <StaffLedgerTable employeeCode={safeEmployeeCode} />
              </div>
            )}
          </div>

          <div>
            <button onClick={() => toggleAccordion("others")} className="w-full text-left font-medium p-4 bg-gray-100 rounded-md shadow">
            {getLanguageByEnglish('Pay Slip, Leave, and Loan Requests')}
            </button>
            {openAccordion === "others" && (
              <div className="p-4 space-y-4">
                <PaySlipTable />
                <LeaveTable />
                <LoanRequestTables />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Main Tables Section for Desktop */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3"><Attendance onAddEntry={handleAddEntry} /></div>
            <div className="w-full md:w-1/3"><AttendanceTable attendanceEntries={attendanceEntries} employeeCode={safeEmployeeCode} /></div>
            <div className="w-full md:w-1/3"><RequestTables employeeCode={safeEmployeeCode} /></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3"><DocumentsTable employeeCode={safeEmployeeCode} /></div>
            <div className="w-full md:w-1/3"><HolidaysTable employeeCode={safeEmployeeCode} /></div>
            <div className="w-full md:w-1/3"><TrainingTable employeeCode={safeEmployeeCode} /></div>
          </div>

          {/* Bottom Section: Salary and Announcements */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:h-auto md:w-1/3"><SalaryStatistics employeeCode={safeEmployeeCode} /></div>
            <div className="w-full md:w-1/3"><Announcements /></div>
            <div className="w-full md:w-1/3"><StaffLedgerTable employeeCode={safeEmployeeCode} /></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PaySlipTable />
            <LeaveTable />
            <LoanRequestTables />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
