// components/LeaveTable.tsx
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell } from '@mui/material';

const LeaveTable = () => {
  const [columns] = useState([
    { name: 'date', title: 'Date' },
    { name: 'type', title: 'Type' },
    { name: 'remarks', title: 'Remarks' },
  ]);

  const [rows] = useState([
    { date: '2024-11-02', type: 'Sick Leave', remarks: 'N/A' },
    { date: '2024-11-03', type: 'Casual Leave', remarks: 'Personal' },
    { date: '2024-11-04', type: 'Sick Leave', remarks: 'Flu' },
    { date: '2024-11-05', type: 'Paid Leave', remarks: 'Vacation' },
    { date: '2024-11-06', type: 'Work from Home', remarks: 'Project work' },
    { date: '2024-11-07', type: 'Casual Leave', remarks: 'Family Event' },
    { date: '2024-11-08', type: 'Sick Leave', remarks: 'Medical Appointment' },
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
      <h3 className="text-lg bg-green-200 font-semibold py-2">Leave</h3>
      <Grid rows={rows} columns={columns}>
        <Table cellComponent={CustomTableCell} />
        <TableHeaderRow cellComponent={CustomTableHeaderCell} />
      </Grid>
    </div>
  );
};

export default LeaveTable;
