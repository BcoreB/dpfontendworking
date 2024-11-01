// components/Dashboard.tsx
import React from 'react';
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

const Dashboard = () => {
  return (
    <div className="p-4 md:p-10 space-y-6 max-h-lvh">
      {/* Profile and Summary Cards */}
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <ProfileCard />
        <SummaryCards />
      </div>

      {/* Main Tables Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Attendance />
        <AttendanceTable />
        <LeaveTable />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DocumentsTable />
        <HolidaysTable />
        <TrainingTable />
      </div>

      {/* Bottom Section: Salary and Announcements */}
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full  md:h-auto md:w-1/2">
          <SalaryStatistics />
        </div>
        <Announcements />
      </div>
    </div>
  );
};

export default Dashboard;
