import React from 'react';
import PieChart, {
  PieChartTypes,
  Legend,
  Series,
  Export,
  HoverStyle,
} from 'devextreme-react/pie-chart';
import getLanguageByEnglish from '@/utils/languages'
type DepartmentData = {
    department: string;
    count: number;
  };
  
  const data: DepartmentData[] = [
    { department: 'Sales', count: 30 },
    { department: 'IT', count: 10 },
    { department: 'Worker', count: 80 },
    { department: 'Marketing', count: 5 },
  ];

  function pointClickHandler(arg: PieChartTypes.PointClickEvent) {
    arg.target.select();
  }

function DepartmentWise() {
  return (
    <div className='p-4'>
        <h4 className='text-start text-xl font-semibold mb-6'>{getLanguageByEnglish('DEPARTMENT WISE')}</h4>
        <PieChart
            id="pie"
            type="doughnut"
            palette="Soft Pastel"
            dataSource={data}
            onPointClick={pointClickHandler}
            >
            <Series argumentField="department" valueField="count">
                <HoverStyle color="#ffd700" />
            </Series>
            
            <Legend
                margin={0}
                horizontalAlignment="right"
                verticalAlignment="top"
            />
        </PieChart>
    </div>
    
  );
}

export default DepartmentWise;