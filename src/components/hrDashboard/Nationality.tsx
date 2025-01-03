import React, { useEffect, useState } from 'react';
import { Chart, CommonSeriesSettings, Legend, Series, SeriesTemplate } from 'devextreme-react/chart';
import {getLanguageByEnglish} from '@/utils/languages'
type NationalityData = {
  country: string;
  count: number;
};

const data: NationalityData[] = [
  { country: 'India', count: 30 },
  { country: 'Pakistan', count: 10 },
  { country: 'Bahraini', count: 80 },
  { country: 'Saudi', count: 5 },
];

const NationalityChart: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the chart only renders on the client
  }, []);

  if (!isClient) return null; // Prevents server-side rendering

  return (
    <div className='p-4'>
        <h4 className='text-start text-xl font-semibold mb-6'>{getLanguageByEnglish('NATIONALITY WISE')}</h4>
        <Chart
            id="bar-chart"
            dataSource={data}
            palette="Pastel"
                    >
                
            <CommonSeriesSettings
                        argumentField="country"
                        valueField="count"
                        type="bar"
                        ignoreEmptyPoints={true}
                />
            <SeriesTemplate nameField="country" />
            <Legend visible={false} />
                
        </Chart>
    </div>
    
  );
};

export default NationalityChart;
