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
    <div className="p-10 space-y-6">
      {/* Profile and Summary Cards */}
      <div className="flex justify-between space-x-4">
        <ProfileCard />
        <SummaryCards />
      </div>

      {/* Main Tables Section */}
      <div className="grid grid-cols-3 gap-4">
        <Attendance/>
        <AttendanceTable />
        <LeaveTable />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DocumentsTable />
        <HolidaysTable />
        <TrainingTable />
      </div>

      {/* Bottom Section: Salary and Announcements */}
      <div className="flex justify-between">
        <div className='w-1/2'><SalaryStatistics /></div>
        <Announcements />
      </div>
    </div>
  );
};

export default Dashboard;
