"use client";
import React, { useState } from 'react';
import { DataGrid, Column, Paging, Scrolling } from 'devextreme-react/data-grid';
import attendanceData from '../Menu/data/attendanceData';
import { RowData } from '../Menu/data/attendanceData';

interface AttendanceTableProps {
  employeeCode: string;
  attendanceEntries: { date: string; in: string; out: string }[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ employeeCode, attendanceEntries }) => {
  const [columns] = useState([
    { name: 'date', title: 'Date' },
    { name: 'in', title: 'In' },
    { name: 'out', title: 'Out' },
    { name: 'shift', title: 'Shift' },
  ]);

  const rowsData: RowData[] = attendanceData[employeeCode] || [];
  const totalRowsToDisplay = 15;
  const emptyRowCount = totalRowsToDisplay - rowsData.length;
  const rows = [
    ...rowsData,
    ...attendanceEntries,
    ...Array(emptyRowCount).fill({ date: '', in: '', out: '', shift: '' }),
  ];

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4"
      style={{
        maxWidth: '100%',
        overflowX: 'auto', // Enable horizontal scrolling
        borderRadius: '16px',
        border: '1px solid #e0e0e0',
        padding: '20px',
        backgroundColor: '#f7f9fc',
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
          Attendance
        </h3>
      </div>

      <DataGrid
        dataSource={rows}
        showBorders={false}
        rowAlternationEnabled={false}
        hoverStateEnabled={true}
        height={500}
        columnAutoWidth={true}
        noDataText="" // This will hide any default no data text
        style={{
          border: 'none',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        }}
        width="100%" // Set DataGrid width to take full container space
      >
        {columns.map((column) => (
          <Column
            key={column.name}
            dataField={column.name}
            caption={column.title.toUpperCase()}
            alignment="left"
            headerCellRender={(header) => (
              <div
                style={{
                  color: '#6b7280',
                  fontWeight: '600',
                  padding: '15px',
                  borderBottom: '1px solid #e5e7eb',
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
                  padding: '10px 15px',
                  borderBottom: '1px solid #f0f0f5',
                  color: '#1a1f36',
                  fontWeight: cellData.rowIndex === 0 ? '500' : 'normal',
                }}
              >
                {cellData.text}
              </div>
            )}
          />
        ))}
        <Paging enabled={false} />
        <Scrolling mode="virtual" />
      </DataGrid>
    </div>
  );
};

export default AttendanceTable;