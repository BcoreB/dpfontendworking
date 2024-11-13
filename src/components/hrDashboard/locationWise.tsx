import React from 'react';
import DataGrid, {
  Column,
  HeaderFilter,
  Paging,
  Scrolling,
} from 'devextreme-react/data-grid';
import getLanguageByEnglish from '@/utils/languages'
const dataSource = [
  { location: 'ARAD BRANCH', '2020': 45, '2021': 44, '2022': 36, '2023': 25 },
  { location: 'MANAMA BRANCH', '2020': 36, '2021': 30, '2022': 25, '2023': 33 },
  { location: 'ZINJ BRANCH', '2020': 25, '2021': 28, '2022': 52, '2023': 44 },
  { location: 'RIFFA BRANCH', '2020': 12, '2021': 13, '2022': 36, '2023': 25 },
];

const LocationWise: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-left  text-xl font-bold mb-4">{getLanguageByEnglish('LOCATION WISE')}</h2>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        columnAutoWidth={true}
        hoverStateEnabled={true}
        rowAlternationEnabled={true}
        className="custom-grid" 
      >
        {/* Define the columns */}
        <Column dataField="location" caption="Location"/>
        <Column dataField="2020" alignment="center" />
        <Column dataField="2021" alignment="center" />
        <Column dataField="2022" alignment="center" />
        <Column dataField="2023" alignment="center" />

        {/* Optional: Enable scrolling and Paging */}
        <Scrolling mode="standard" />
        <Paging enabled={false} />
      </DataGrid>
    </div>
  );
}

export default LocationWise;
