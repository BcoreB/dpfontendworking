// components/HolidaysTable.tsx
import React, { useState, useEffect } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { Box, TableCell } from '@mui/material';
import { getHolidaysByEmployeeCode, HolidayRow } from '../Menu/data/holidayData'

// Define types for columns and component props
interface Column {
  name: string;
  title: string;
}

interface HolidaysTableProps {
  employeeCode: string;
}

const HolidaysTable: React.FC<HolidaysTableProps> = ({ employeeCode }) => {
  const minRows = 10;

  const [columns] = useState<Column[]>([
    { name: 'date', title: 'Date' },
    { name: 'description', title: 'Description' },
  ]);

  const [rows, setRows] = useState<HolidayRow[]>([]);

  // Fetch holiday data based on the employeeCode
  useEffect(() => {
    const holidayData = getHolidaysByEmployeeCode(employeeCode);
    setRows(holidayData);
  }, [employeeCode]);

  // Fill table with empty rows if data is not sufficient
  const fillEmptyRows = (dataRows: HolidayRow[], columns: Column[]): HolidayRow[] => {
    const emptyRow = columns.reduce((acc, column) => {
      acc[column.name as keyof HolidayRow] = '';
      return acc;
    }, {} as HolidayRow);

    const filledRows = [...dataRows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  const displayedRows = fillEmptyRows(rows, columns);

  // Custom Table Header Cell component to set background color
  const CustomTableHeaderCell: React.FC<TableHeaderRow.CellProps> = (props: any) => (
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
  const CustomTableCell: React.FC<Table.CellProps> = (props: any) => (
    <Table.Cell
      {...props}
      style={{
        ...props.style,
        borderRight: '1px solid #ccc',
      }}
    />
  );

  return (
    <div className="bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold bg-green-200 py-2 text-center">Holidays</h3>
      <Box
        sx={{
          maxHeight: 400,
          overflowY: 'auto',
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
