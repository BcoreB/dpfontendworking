"use client"
// components/DocumentsTable.tsx
import React, { useState, useEffect } from 'react';
import { getDocumentsByEmployeeCode, DocumentRow } from '../Menu/data/documentData';
import { DataGrid, Column, Paging, Scrolling } from 'devextreme-react/data-grid';

interface Column {
  name: string;
  title: string;
}

interface DocumentsTableProps {
  employeeCode: string;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({ employeeCode }) => {
  const minRows = 17;

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
 

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4"
      style={{
        maxWidth: '100%',
        overflowX: 'auto', // Enable horizontal scrolling
        borderRadius: '16px',
        border: '1px solid #e0e0e0',
        padding: '20px',
        backgroundColor: '#f7f9fc',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '15px',
        }}
      >
        <h3
          style={{
            fontSize: '25px',
            fontWeight: '600',
            color: '#1a1f36',
          }}
        >
          Documents
        </h3>
      </div>

      <DataGrid
        dataSource={displayedRows}
        showBorders={false}
        rowAlternationEnabled={false}
        hoverStateEnabled={true}
        height={500}
        columnAutoWidth={true}
        noDataText="" // This will hide any default no data text
        style={{
          border: 'none',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        }}
        width="100%" // Set DataGrid width to take full container space
      >
        {columns.map((column) => (
          <Column
            key={column.name}
            dataField={column.name}
            caption={column.title.toUpperCase()}
            alignment="left"
            headerCellRender={(header) => (
              <div
                style={{
                  color: '#6b7280',
                  fontWeight: '600',
                  padding: '15px',
                  borderBottom: '1px solid #e5e7eb',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  letterSpacing: '0.5px',
                }}
              >
                {header.column.caption}
              </div>
            )}
            cellRender={(cellData) => (
              <div
                style={{
                  padding: '10px 15px',
                  borderBottom: '1px solid #f0f0f5',
                  color: '#1a1f36',
                  fontWeight: cellData.rowIndex === 0 ? '500' : 'normal',
                }}
              >
                {cellData.text}
              </div>
            )}
          />
        ))}
        <Paging enabled={false} />
        <Scrolling mode="virtual" />
      </DataGrid>
    </div>
  );
};

export default DocumentsTable;
