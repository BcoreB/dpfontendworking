// components/RequestTables.tsx
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell, Button, Box, Typography } from '@mui/material';

const RequestTables = () => {
  // Columns for each table
  const attendanceColumns = [
    { name: 'date', title: 'Date' },
    { name: 'time', title: 'Time' },
    { name: 'action', title: 'Action' },
    { name: 'reason', title: 'Reason' },
    { name: 'status', title: 'Status' },
  ];

  const promotionColumns = [
    { name: 'date', title: 'Date' },
    { name: 'positionTo', title: 'Position To' },
    { name: 'reason', title: 'Reason' },
    { name: 'status', title: 'Status' },
  ];

  // Placeholder rows (initially empty)
  const [attendanceRows, setAttendanceRows] = useState([]);
  const [promotionRows, setPromotionRows] = useState([]);

  // Define a minimum row count (e.g., 5 rows)
  const minRows = 5;

  // Function to fill empty rows if data is less than minRows
  const fillEmptyRows = (rows:any, minRows:number) => {
    const emptyRow = { date: '', time: '', action: '', reason: '', status: '' };
    const filledRows = [...rows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  // Ensure tables always have at least minRows
  const attendanceData = fillEmptyRows(attendanceRows, minRows);
  const promotionData = fillEmptyRows(promotionRows, minRows);

  // Custom Header and Cell Styling
  const CustomTableHeaderCell = (props: any) => (
    <TableHeaderRow.Cell
      {...props}
      style={{
        ...props.style,
        backgroundColor: '#FEFFA7',
        color: '#000',
        fontWeight: 'bold',
        borderRight: '1px solid #ccc',
        textAlign: 'center',
      }}
    />
  );

  const CustomTableCell = (props: any) => (
    <Table.Cell
      {...props}
      style={{
        ...props.style,
        borderRight: '1px solid #ccc',
        textAlign: 'center',
        fontSize: '0.875rem', // Smaller font size for cells
      }}
    />
  );

  return (
    <div>
      {/* Attendance Request Table */}
      <div className="bg-white shadow-md rounded-md mb-4">
        <h3 className="text-lg font-semibold bg-green-200 py-2">Attendance Request</h3>
        <Box
          sx={{
            maxHeight: 300, // Set fixed height
            overflowY: 'auto', // Enable vertical scrolling
            border: '1px solid #ddd',
          }}
        >
          <Grid rows={attendanceData} columns={attendanceColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button variant="contained" sx={{ mt: 2, color: 'black' }}>
          Request
        </Button>
      </div>

      {/* Promotion Requests Table */}
      <div className="bg-white shadow-md rounded-md">
        <h3 className="text-lg font-semibold bg-green-200 py-2">Promotion Requests</h3>
        <Box
          sx={{
            maxHeight: 300, // Set fixed height
            overflowY: 'auto', // Enable vertical scrolling
            border: '1px solid #ddd',
          }}
        >
          <Grid rows={promotionData} columns={promotionColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button variant="contained" sx={{ mt: 2, color: 'black' }}>
          Request
        </Button>
      </div>
    </div>
  );
};

export default RequestTables;
