"use client";
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell } from '@mui/material';
import {  RowData } from '../Menu/data/attendanceData';
import attendanceData from '../Menu/data/attendanceData';
interface AttendanceTableProps {
  employeeCode: string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ employeeCode }) => {
  const [columns] = useState([
    { name: 'date', title: 'Date' },
    { name: 'in', title: 'In' },
    { name: 'out', title: 'Out' },
    { name: 'shift', title: 'Shift' },
  ]);

  // Ensure rowsData has a fallback array if employeeCode does not exist in attendanceData
  const rowsData: RowData[] = attendanceData[employeeCode] || [];

  // Define the total number of rows to display
  const totalRowsToDisplay = 20;
  const emptyRowCount = totalRowsToDisplay - rowsData.length;

  // Fill empty rows if data is insufficient
  const rows = [
    ...rowsData,
    ...Array(emptyRowCount).fill({ date: '', in: '', out: '', shift: '' }),
  ];

  // Custom Table Header Cell component to set background color
  const CustomTableHeaderCell = (props: any) => (
    <TableHeaderRow.Cell
      {...props}
      style={{
        ...props.style,
        backgroundColor: '#FEFFA7',
        color: '#000',
        fontWeight: 'bold',
        borderRight: '1px solid #ccc',
      }}
    />
  );

  // Custom Table Cell component to add vertical lines between cells
  const CustomTableCell = (props: any) => (
    <Table.Cell
      {...props}
      style={{
        ...props.style,
        borderRight: '1px solid #ccc',
      }}
    />
  );

  return (
    <div className="bg-white shadow-md rounded-md" style={{ height: '800px', overflowY: 'auto' }}>
      <h3 className="text-lg py-2 bg-green-200 font-semibold">Attendance</h3>
      <Grid rows={rows} columns={columns}>
        <Table cellComponent={CustomTableCell} />
        <TableHeaderRow cellComponent={CustomTableHeaderCell} />
      </Grid>
    </div>
  );
};

export default AttendanceTable;
