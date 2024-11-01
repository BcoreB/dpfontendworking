// components/SalaryStatistics.tsx
import React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

// Sample salary data
const data = [
  { month: 'Jan', salary: 3000 },
  { month: 'Feb', salary: 3200 },
  { month: 'Mar', salary: 3100 },
  { month: 'Apr', salary: 3300 },
  { month: 'May', salary: 3400 },
  { month: 'Jun', salary: 3500 },
  { month: 'Jul', salary: 3600 },
  { month: 'Aug', salary: 3700 },
  { month: 'Sep', salary: 3800 },
  { month: 'Oct', salary: 3900 },
  { month: 'Nov', salary: 4000 },
  { month: 'Dec', salary: 4100 },
];

const SalaryStatistics: React.FC = () => {
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
