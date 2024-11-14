import React from 'react';
import { 
  Chart, 
  Series, 
  CommonSeriesSettings,
  Legend,
  Export,
  Title,
  Font,
  Label,
  SeriesTemplate
} from 'devextreme-react/chart';
import {getLanguageByEnglish} from '@/utils/languages'
import PieChart, {
    PieChartTypes,
    HoverStyle,
  } from 'devextreme-react/pie-chart';

interface ProductSale {
  category: string;
  amount: number;
  percentage: number;
}

const salaryData: ProductSale[] = [
  { category: 'Basic', amount: 6970, percentage: 60 },
  { category: 'HR', amount: 1950, percentage: 22 },
  { category: 'OT', amount: 5562, percentage: 7 },
  { category: 'Special Allowance', amount: 1800, percentage: 6 },
];

const SalaryByDashboard: React.FC = () => {
  return (
    <div className='p-4'>
        <h4 className='text-start text-xl font-semibold mb-6'>{getLanguageByEnglish('SALARY BY COMPONENT')}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            {/* Pie Chart */}
            <div className="">
                <PieChart
                    id="pie"
                    type="doughnut"
                    palette="Soft"
                    dataSource={salaryData}
                    >
                    <Series argumentField="category" valueField="amount">
                        <HoverStyle color="#ffd700" />
                    </Series>
                    
                    <Legend
                        margin={0}
                        horizontalAlignment="right"
                        verticalAlignment="top"
                    />
                </PieChart>
            </div>

            {/* Bar Chart */}
            <div className="">
                <Chart
                    id="bar-chart"
                    dataSource={salaryData}
                    rotated={true}
                    palette="Soft"
                    >
                
                    <CommonSeriesSettings
                        argumentField="category"
                        valueField="amount"
                        type="bar"
                        ignoreEmptyPoints={true}
                    />
                    <SeriesTemplate nameField="amount" />
                    <Legend visible={false} />
                
                </Chart>
            </div>
        </div>
    </div>
  );
};

export default SalaryByDashboard;