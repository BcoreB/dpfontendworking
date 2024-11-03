// components/RequestTables.tsx
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell, Box, Button } from '@mui/material';

const LoanRequestTables = () => {
  const minRows = 8; // Minimum number of rows to fill table

  // Column definitions for each table
  const loanColumns = [
    { name: 'type', title: 'Type' },
    { name: 'amount', title: 'Amount' },
    { name: 'guarantor', title: 'Guarantor' },
    { name: 'reason', title: 'Reason' },
    { name: 'status', title: 'Status' },
  ];

  const expenseColumns = [
    { name: 'type', title: 'Type' },
    { name: 'voucher', title: 'Voucher' },
    { name: 'amount', title: 'Amount' },
    { name: 'reason', title: 'Reason' },
    { name: 'status', title: 'Status' },
  ];

  // Initial rows data (you can populate this with real data)
  const [loanRows, setLoanRows] = useState([]);
  const [expenseRows, setExpenseRows] = useState([]);

  // Function to add empty rows if not enough data is present
  const fillEmptyRows = (rows, columns) => {
    const emptyRow = columns.reduce((acc, column) => {
      acc[column.name] = '';
      return acc;
    }, {});

    const filledRows = [...rows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  const displayedLoanRows = fillEmptyRows(loanRows, loanColumns);
  const displayedExpenseRows = fillEmptyRows(expenseRows, expenseColumns);

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
        textAlign: 'center',
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
        textAlign: 'center',
        fontSize: '0.875rem', // Smaller font size
      }}
    />
  );

  return (
    <div>
      {/* Loan Request Table */}
      <div className="bg-white shadow-md rounded-md mb-16">
        <h3 className="text-lg font-semibold bg-green-200 py-2 text-center">Loan Request</h3>
        <Box
          sx={{
            height: 200, // Fixed height for table content
            overflowY: 'auto', // Enable scrolling if content exceeds height
            border: '1px solid #ddd',
          }}
        >
          <Grid rows={displayedLoanRows} columns={loanColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button variant="contained" color="warning" sx={{ mt: 2, float: 'right', mr: 1, color:'black' }}>
          Request
        </Button>
      </div>

      {/* Expense Request Table */}
      <div className="bg-white shadow-md rounded-md">
        <h3 className="text-lg font-semibold bg-green-200 py-2 text-center">Expense Request</h3>
        <Box
          sx={{
            height: 200, // Fixed height for table content
            overflowY: 'auto', // Enable scrolling if content exceeds height
            border: '1px solid #ddd',
          }}
        >
          <Grid rows={displayedExpenseRows} columns={expenseColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button variant="contained" color="warning" sx={{ mt: 2, float: 'right', mr: 1, color:'black' }}>
          Request
        </Button>
      </div>
    </div>
  );
};

export default LoanRequestTables;
