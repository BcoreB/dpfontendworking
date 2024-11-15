"use client";
import React, { useState } from 'react';
import { DataGrid, Column, Paging, Scrolling, Pager } from 'devextreme-react/data-grid';
import attendanceData from '../Menu/data/attendanceData';
import { RowData } from '../Menu/data/attendanceData';
import { getLanguageByEnglish } from '@/utils/languages';
import { useDirection } from '@/app/DirectionContext';
interface AttendanceTableProps {
  employeeCode: string;
  attendanceEntries: { date: string; in: string; out: string }[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ employeeCode, attendanceEntries }) => {

  const { isRtl } = useDirection();

  const [columns] = useState([
    { name: 'date', title: 'Date' },
    { name: 'in', title: 'In' },
    { name: 'out', title: 'Out' },
    { name: 'shift', title: 'Shift' },
  ]);

  const rowsData: RowData[] = attendanceData[employeeCode] || [];

  // Combine the existing rows with new entries
  const rows = [...rowsData, ...attendanceEntries];

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4"
      style={{
        maxWidth: '100%',
        overflowX: 'auto',
        borderRadius: '16px',
        border: '1px solid #e0e0e0',
        padding: '20px',
        backgroundColor: '#f9fafb',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '15px',
        }}
      >
        <h3
          style={{
            fontSize: '25px',
            fontWeight: '600',
            color: '#1a1f36',
          }}
        >
          {getLanguageByEnglish('Attendance')}
        </h3>
      </div>
      
      <DataGrid
        dataSource={rows}
        showBorders={false}
        rowAlternationEnabled={false}
        hoverStateEnabled={true}
        rtlEnabled={isRtl}
        height={500}
        columnAutoWidth={true}
        noDataText=""
        style={{
          border: 'none',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          backgroundColor: '#ffffff',
        }}
        width="100%"
      >
        {columns.map((column) => (
          <Column
            key={column.name}
            dataField={column.name}
            caption={getLanguageByEnglish(column.title)}
            alignment="left"
            headerCellRender={(header) => (
              <div
                style={{
                  color: '#4b5563',
                  fontWeight: '600',
                  padding: '10px',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  letterSpacing: '0.5px',
                }}
              >
                {header.column.caption}
              </div>
            )}
            cellRender={(cellData) => (
              <div
                style={{
                  padding: '10px',
                  color: '#1a1f36',
                  fontWeight: cellData.rowIndex === 0 ? '500' : 'normal',
                  borderRadius: '8px',
                }}
              >
                {cellData.text}
              </div>
            )}
          />
        ))}
        
        {/* Enable paging with custom styling */}
        <Paging enabled={true} defaultPageSize={7} />
        <Scrolling mode="standard" />
        <Pager
          showInfo={true}
          infoText="Page {0} of {1}"
          visible={true}
          displayMode="compact"
        />
      </DataGrid>
    </div>
  );
};

export default AttendanceTable;
