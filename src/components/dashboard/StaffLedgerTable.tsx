// components/StaffLedgerTable.tsx
import React, { useState, useEffect } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell, Box } from '@mui/material';
import { getEmployeeData } from '../Menu/data/employeeData';

// Define props interface to accept employeeCode
interface StaffLedgerTableProps {
  employeeCode: string;
}

// Define row data type
interface RowData {
  date: string;
  account: string;
  ref: string;
  amount: string;
  remarks: string;
}

const StaffLedgerTable: React.FC<StaffLedgerTableProps> = ({ employeeCode }) => {
  const columns = [
    { name: 'date', title: 'Date' },
    { name: 'account', title: 'Account' },
    { name: 'ref', title: 'Ref#' },
    { name: 'amount', title: 'Amount' },
    { name: 'remarks', title: 'Remarks' },
  ];

  // State to hold employee data
  const [rows, setRows] = useState<RowData[]>([]);

  // Minimum number of rows to maintain consistent table height
  const minRows = 12;

  // Fill empty rows if data is less than the minimum required
  const fillEmptyRows = (data: RowData[], minRows: number) => {
    const emptyRow: RowData = { date: '', account: '', ref: '', amount: '', remarks: '' };
    const filledRows = [...data];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  // Fetch employee data on component mount or when employeeCode changes
  useEffect(() => {
    const employeeData = getEmployeeData(employeeCode);
    setRows(fillEmptyRows(employeeData, minRows));
  }, [employeeCode]);

  // Custom Table Header Cell component
  const CustomTableHeaderCell: React.FC<any> = (props) => (
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

  // Custom Table Cell component
  const CustomTableCell: React.FC<any> = (props) => (
    <Table.Cell
      {...props}
      style={{
        ...props.style,
        borderRight: '1px solid #ccc',
        textAlign: 'center',
        fontSize: '0.875rem',
      }}
    />
  );

  return (
    <div className="bg-white shadow-md rounded-md w-full md:w-1/3">
      <h3 className="text-lg font-semibold bg-green-200 py-2">Staff Ledger</h3>
      <Box
        sx={{
          maxHeight: 500,
          overflowY: 'auto',
          border: '1px solid #ddd',
        }}
      >
        <Grid rows={rows} columns={columns}>
          <Table cellComponent={CustomTableCell} />
          <TableHeaderRow cellComponent={CustomTableHeaderCell} />
        </Grid>
      </Box>
    </div>
  );
};

export default StaffLedgerTable;
