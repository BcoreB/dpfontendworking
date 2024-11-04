// components/DocumentsTable.tsx
import React, { useState, useEffect } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { Box, TableCell } from '@mui/material';
import { getDocumentsByEmployeeCode, DocumentRow } from '../Menu/data/documentData';

interface Column {
  name: string;
  title: string;
}

interface DocumentsTableProps {
  employeeCode: string;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({ employeeCode }) => {
  const minRows = 12;

  const [columns] = useState<Column[]>([
    { name: 'type', title: 'Type' },
    { name: 'number', title: 'Number' },
    { name: 'expiry', title: 'Expiry' },
    { name: 'image', title: 'Image' },
  ]);

  const [rows, setRows] = useState<DocumentRow[]>([]);

  useEffect(() => {
    const employeeData = getDocumentsByEmployeeCode(employeeCode);
    setRows(employeeData);
  }, [employeeCode]);

  const fillEmptyRows = (dataRows: DocumentRow[], columns: Column[]): DocumentRow[] => {
    const emptyRow = columns.reduce((acc, column) => {
      acc[column.name as keyof DocumentRow] = '';
      return acc;
    }, {} as DocumentRow);

    const filledRows = [...dataRows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  const displayedRows = fillEmptyRows(rows, columns);
  const isRowEmpty = (row: DocumentRow) => {
    return !row.type && !row.number && !row.expiry && !row.image;
  };
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

  const CustomTableCell: React.FC<Table.CellProps> = (props:any) => {
    const { column, row } = props;

    return (
      <Table.Cell
        {...props}
        style={{
          ...props.style,
          borderRight: '1px solid #ccc',
          textAlign: 'center',
        }}
      >
        {column.name === 'image' && row.image && !isRowEmpty(row) ? (
          row.image ? (
            <img
              src={`/images/${row.image}`} // Assuming images are stored in a public /images directory
              alt={row.type}
              style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px' }}
            />
          ) : (
            'No Image'
          )
        ) : (
          props.value
        )}
      </Table.Cell>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold bg-green-200 py-2 text-center">Documents</h3>
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

export default DocumentsTable;
