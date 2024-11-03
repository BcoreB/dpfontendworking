// components/DocumentsTable.tsx
import React, { useState, useEffect } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell, Box } from '@mui/material';

const StaffLedgerTable = () => {
  const columns = [
    { name: 'date', title: 'Date' },
    { name: 'account', title: 'Account' },
    { name: 'ref', title: 'Ref#' },
    { name: 'amount', title: 'Amount' },
    { name: 'remarks', title: 'Remarks' },
  ];

  // Initial rows data (empty in this case)
  const [rows, setRows] = useState([]);

  // Define a minimum number of rows to maintain table height
  const minRows = 12;

  // Function to add empty rows if not enough data is present
  const fillEmptyRows = (rows:any, minRows:number) => {
    const emptyRow = { date: '', account: '', ref: '', amount: '', remarks: '' };
    const filledRows = [...rows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  // Filled data with empty rows if not enough data
  const displayedRows = fillEmptyRows(rows, minRows);

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
    <div className="bg-white shadow-md rounded-md w-full md:w-1/3">
      <h3 className="text-lg font-semibold bg-green-200 py-2">Staff Ledger</h3>
      <Box
        sx={{
          maxHeight: 500, // Fixed height for the table
          overflowY: 'auto', // Enable vertical scrolling if content exceeds height
          border: '1px solid #ddd',
        }}
      >
        <Grid rows={displayedRows} columns={columns}>
          <Table cellComponent={CustomTableCell} />
          <TableHeaderRow cellComponent={CustomTableHeaderCell} />
        </Grid>
      </Box>
    </div>
  );
};

export default StaffLedgerTable;
