import React from 'react';
import { Chart, Series, ArgumentAxis, ValueAxis, Title, Legend, Label } from 'devextreme-react/chart';
import {getLanguageByEnglish} from '@/utils/languages'
const data = [
  { month: 'Jan-24', basic: 500, hr: 100, ot: 600, specialAllowance: 150 },
  { month: 'Feb-24', basic: 600, hr: 150, ot: 300, specialAllowance: 150 },
  { month: 'Mar-24', basic: 500, hr: 250, ot: 580, specialAllowance: 150 },
  { month: 'Apr-24', basic: 650, hr: 150, ot: 362, specialAllowance: 150 },
  { month: 'May-24', basic: 750, hr: 250, ot: 800, specialAllowance: 150 },
  { month: 'Jun-24', basic: 800, hr: 100, ot: 900, specialAllowance: 150 },
  { month: 'Jul-24', basic: 500, hr: 150, ot: 600, specialAllowance: 150 },
  { month: 'Aug-24', basic: 360, hr: 250, ot: 300, specialAllowance: 150 },
  { month: 'Sep-24', basic: 800, hr: 150, ot: 500, specialAllowance: 150 },
  { month: 'Oct-24', basic: 950, hr: 100, ot: 420, specialAllowance: 150 },
  { month: 'Nov-24', basic: 250, hr: 100, ot: 320, specialAllowance: 150 },
  { month: 'Dec-24', basic: 310, hr: 150, ot: 150, specialAllowance: 150 },
];

const ComponentSalaryChart: React.FC = () => {
  return (
    <div className='p-4'>
      <h4 className='text-start text-xl font-semibold mb-6'>{getLanguageByEnglish('HR COMPONENT WISE SALARY')}</h4>
      <Chart dataSource={data}>
        <ArgumentAxis>
          <Label visible={true} /> {/* Ensure month labels are visible */}
        </ArgumentAxis>

        <ValueAxis>
          <Label visible={true} /> {/* Ensure salary value labels are visible */}
        </ValueAxis>

        {/* Basic Salary Series */}
        <Series
          valueField="basic"
          argumentField="month"
          name="Basic"
          type="line"
          color="blue"
        />

        {/* HR Series */}
        <Series
          valueField="hr"
          argumentField="month"
          name="HR"
          type="line"
          color="green"
        />

        {/* OT Series */}
        <Series
          valueField="ot"
          argumentField="month"
          name="OT"
          type="line"
          color="orange"
        />

        {/* Special Allowance Series */}
        <Series
          valueField="specialAllowance"
          argumentField="month"
          name="Special Allowance"
          type="line"
          color="red"
        />

        <Legend verticalAlignment="bottom" horizontalAlignment="center" />
      </Chart>
    </div>
  );
};

export default ComponentSalaryChart;
