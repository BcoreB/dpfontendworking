// components/HolidaysTable.tsx
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { Box, TableCell } from '@mui/material';

// Define types for columns and rows
interface Column {
  name: string;
  title: string;
}

interface Row {
  date: string;
  description: string;
}

const HolidaysTable: React.FC = () => {
  const minRows = 10; // Minimum number of rows to display in the table

  const [columns] = useState<Column[]>([
    { name: 'date', title: 'Date' },
    { name: 'description', title: 'Description' },
  ]);

  const [rows] = useState<Row[]>([
    { date: '2024-11-02', description: 'Sick Leave' },
    { date: '2024-12-25', description: 'Christmas Holiday' },
    { date: '2025-01-01', description: 'New Year’s Day' },
    // Add more rows as needed
  ]);

  // Fill table with empty rows if data is not sufficient
  const fillEmptyRows = (dataRows: Row[], columns: Column[]): Row[] => {
    const emptyRow = columns.reduce((acc, column) => {
      acc[column.name as keyof Row] = ''; // Fill each cell with an empty string
      return acc;
    }, {} as Row);

    const filledRows = [...dataRows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  const displayedRows = fillEmptyRows(rows, columns);

  // Custom Table Header Cell component to set background color
  const CustomTableHeaderCell: React.FC<TableHeaderRow.CellProps> = (props:any) => (
    <TableHeaderRow.Cell
      {...props}
      style={{
        ...props.style,
        backgroundColor: '#FEFFA7', // Set your desired background color here
        color: '#000', // Set the text color to black for contrast
        fontWeight: 'bold',
        borderRight: '1px solid #ccc',
      }}
    />
  );

  // Custom Table Cell component to add vertical lines between cells
  const CustomTableCell: React.FC<Table.CellProps> = (props:any) => (
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
      <h3 className="text-lg font-semibold bg-green-200 py-2 text-center">Holidays</h3>
      <Box
        sx={{
          maxHeight: 400, // Set maximum height for the table
          overflowY: 'auto', // Enable vertical scroll if content exceeds the maximum height
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

export default HolidaysTable;
