// components/LeaveTable.tsx
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell } from '@mui/material';

const HolidaysTable = () => {
  const [columns] = useState([
    { name: 'date', title: 'Date' },
    { name: 'description', title: 'Description' },
  ]);

  const [rows] = useState([
    { date: '2024-11-02', description: 'Sick Leave' },
    { date: '2024-12-25', description: 'Christmas Holiday' },
    { date: '2025-01-01', description: 'New Year’s Day' },
    
  ]);
  // Custom Table Header Cell component to set background color
  const CustomTableHeaderCell = (props: any) => (
    <TableHeaderRow.Cell
    {...props}
    style={{
        ...props.style,
        backgroundColor: '#FEFFA7', // Set your desired background color here
        color: '#000', // Set the text color to white for contrast
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
    <div className="bg-white shadow-md rounded-md">
      <h3 className="text-lg py-2 font-semibold bg-green-200 ">Holidays</h3>
      <Grid rows={rows} columns={columns}>
        <Table cellComponent={CustomTableCell} />
        <TableHeaderRow cellComponent={CustomTableHeaderCell} />
      </Grid>
    </div>
  );
};

export default HolidaysTable;
