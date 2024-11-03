// components/LeaveTable.tsx
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { Box, TableCell, Button } from '@mui/material';

const LeaveTable = () => {
  const minRows = 10; // Minimum number of rows to display in the table

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

  
  // Fill table with empty rows if data is not sufficient
  const fillEmptyRows = (dataRows:any, columns:any) => {
    const emptyRow = columns.reduce((acc:any, column:any) => {
      acc[column.name] = ''; // Fill each cell with an empty string
      return acc;
    }, {});

    const filledRows = [...dataRows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  const displayedRows = fillEmptyRows(rows, columns);

  // Custom Table Header Cell component to set background color
  const CustomTableHeaderCell = (props: any) => (
    <TableHeaderRow.Cell
      {...props}
      style={{
        ...props.style,
        backgroundColor: '#FEFFA7', // Set your desired background color here
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
        borderRight: '1px solid #ccc', // Add vertical line between cells
        textAlign: 'center', // Center align text
      }}
    />
  );

  return (
    <div className="bg-white shadow-md rounded-md">
      <h3 className="text-lg bg-green-200 font-semibold py-2 text-center">Leave</h3>
      <Box
        sx={{
          height: 500, // Set a fixed height for the table
          overflowY: 'auto', // Enable vertical scroll if content exceeds the fixed height
          border: '1px solid #ddd',
        }}
      >
        <Grid rows={displayedRows} columns={columns}>
          <Table cellComponent={CustomTableCell} />
          <TableHeaderRow cellComponent={CustomTableHeaderCell} />
        </Grid>
      </Box>
      <Button variant="contained" color="warning" sx={{ mt: 2, float: 'right', mr: 1, color:'black' }}>
          Request
      </Button>
    </div>
  );
};

export default LeaveTable;
