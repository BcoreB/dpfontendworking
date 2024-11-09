// components/Dashboard.tsx
import React, { useState } from 'react';
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
// Define the props for the ProfileCard component
interface EmpProps {
  employeeCode: string;
}
const Dashboard : React.FC<EmpProps> = ({ employeeCode }) => {
  const [attendanceEntries, setAttendanceEntries] = useState([]);

  const handleAddEntry = (entry) => {
    setAttendanceEntries((prevEntries) => [...prevEntries, entry]);
  };
  return (
    <div className="p-4 md:p-10 space-y-6 max-h-lvh">
      {/* Profile and Summary Cards */}
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <ProfileCard employeeCode={employeeCode}/>
        <SummaryCards employeeCode={employeeCode}/>
      </div>

      {/* Main Tables Section */}
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3"><Attendance onAddEntry={handleAddEntry}/></div>
        <div className="w-full md:w-1/3"><AttendanceTable attendanceEntries={attendanceEntries} employeeCode={'12345'}/></div>
        <div className="w-full md:w-1/3"><RequestTables employeeCode={employeeCode}/></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3"><DocumentsTable employeeCode={employeeCode}/></div>
        <div className="w-full md:w-1/3"><HolidaysTable employeeCode={employeeCode}/></div>
        <div className="w-full md:w-1/3"><TrainingTable employeeCode={employeeCode} /></div>
        
        
        
      </div>

      {/* Bottom Section: Salary and Announcements */}
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full  md:h-auto md:w-1/3">
          <SalaryStatistics employeeCode={employeeCode}/>
        </div>
        <Announcements />
        <StaffLedgerTable employeeCode={employeeCode}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PaySlipTable/>
        <LeaveTable />
        <LoanRequestTables/>
      </div>
    </div>
  );
};

export default Dashboard;