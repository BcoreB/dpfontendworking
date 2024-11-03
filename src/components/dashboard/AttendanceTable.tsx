"use client"
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell } from '@mui/material';

const AttendanceTable = () => {
  const [columns] = useState([
    { name: 'date', title: 'Date' },
    { name: 'in', title: 'In' },
    { name: 'out', title: 'Out' },
    { name: 'shift', title: 'Shift' },
  ]);

  const [rowsData] = useState([
    { date: '2024-11-01', in: '9:00 AM', out: '5:00 PM', shift: 'Morning' },
    { date: '2024-11-02', in: '9:15 AM', out: '5:10 PM', shift: 'Morning' },
    { date: '2024-11-03', in: '10:00 AM', out: '6:00 PM', shift: 'Afternoon' },
    { date: '2024-11-04', in: '8:45 AM', out: '4:45 PM', shift: 'Morning' },
    { date: '2024-11-05', in: '9:30 AM', out: '5:30 PM', shift: 'Morning' },
    { date: '2024-11-06', in: '10:15 AM', out: '6:15 PM', shift: 'Afternoon' },
  ]);

  // Define the total number of rows to display
  const totalRowsToDisplay = 18;
  const emptyRowCount = totalRowsToDisplay - rowsData.length;

  // Fill empty rows if data is insufficient
  const rows = [
    ...rowsData,
    ...Array(emptyRowCount).fill({ date: '', in: '', out: '', shift: '' })
  ];

  // Custom Table Header Cell component to set background color
  const CustomTableHeaderCell = (props: any) => (
    <TableHeaderRow.Cell
      {...props}
      style={{
        ...props.style,
        backgroundColor: '#FEFFA7', // Set your desired background color here
        color: '#000', // Set the text color for contrast
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
        borderRight: '1px solid #ccc', // Add vertical line between cells
      }}
    />
  );

  return (
    <div className="bg-white shadow-md rounded-md" style={{ height: '700px', overflowY: 'auto' }}>
      <h3 className="text-lg py-2 bg-green-200 font-semibold">Attendance</h3>
      <Grid rows={rows} columns={columns}>
        <Table cellComponent={CustomTableCell} />
        <TableHeaderRow cellComponent={CustomTableHeaderCell} />
      </Grid>
    </div>
  );
};

export default AttendanceTable;
