"use client"
// components/SalaryStatistics.tsx
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { getSalaryData } from '../Menu/data/salaryData';

// Define prop types
interface SalaryStatisticsProps {
  employeeCode: string;
}

// Define data structure for a single salary record
interface SalaryData {
  month: string;
  salary: number;
}

const SalaryStatistics: React.FC<SalaryStatisticsProps> = ({ employeeCode }) => {
  // State to hold the salary data
  const [data, setData] = useState<SalaryData[]>([]);

  // Fetch salary data based on employeeCode
  useEffect(() => {
    const salaryData = getSalaryData(employeeCode);
    setData(salaryData);
  }, [employeeCode]);

  return (
    <Paper className="p-4 shadow-md rounded-md">
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries valueField="salary" argumentField="month" />
        <Title text="Monthly Salary Statistics" />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default SalaryStatistics;
