import React from 'react';
import { Chart, Series, ArgumentAxis, ValueAxis, Title, Legend, Label } from 'devextreme-react/chart';

const data = [
  { month: 'JAN', series1: 50000, series2: 40000 },
  { month: 'FEB', series1: 48000, series2: 38000 },
  { month: 'MAR', series1: 60000, series2: 65000 },
  { month: 'APR', series1: 45000, series2: 30000 },
  { month: 'MAY', series1: 42000, series2: 35000 },
  { month: 'JUN', series1: 30000, series2: 34000 },
  { month: 'JUL', series1: 30000, series2: 33000 },
  { month: 'AUG', series1: 32000, series2: 32000 },
  { month: 'SEP', series1: 37000, series2: 35000 },
  { month: 'OCT', series1: 40000, series2: 38000 },
  { month: 'NOV', series1: 2000, series2: 5000 },
  { month: 'DEC', series1: 0, series2: 0 },
];

const SalaryChart: React.FC = () => {
  return (
    <div className='p-4'>
        <h4 className='text-start text-xl font-semibold mb-6'>SALARY</h4>
        <Chart dataSource={data}>
            <ArgumentAxis>
                <Label visible={true} /> {/* Ensure month labels are visible */}
            </ArgumentAxis>

            <ValueAxis>
                <Label visible={true} /> {/* Ensure salary value labels are visible */}
            </ValueAxis>

            <Series
                valueField="series1"
                argumentField="month"
                name="Series1"
                type="line"
                color="blue"
            >
            </Series>

            <Series
                valueField="series2"
                argumentField="month"
                name="Series2"
                type="line"
                color="orange"
            >
            </Series>

            <Legend verticalAlignment="bottom" horizontalAlignment="center" />
        </Chart>
    </div>
    
  );
};

export default SalaryChart;
