"use client";
// components/DocumentsTable.tsx
import React, { useState, useEffect } from 'react';
import { getDocumentsByEmployeeCode, DocumentRow } from '../Menu/data/documentData';
import { DataGrid, Column, Paging, Scrolling, Pager } from 'devextreme-react/data-grid';

interface Column {
  name: string;
  title: string;
}

interface DocumentsTableProps {
  employeeCode: string;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({ employeeCode }) => {
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

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4"
      style={{
        maxWidth: '100%',
        overflowX: 'auto',
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
        dataSource={rows}
        showBorders={false}
        rowAlternationEnabled={false}
        hoverStateEnabled
        height={500}
        columnWidth={150}
        noDataText=""
        style={{ border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
        width="100%"
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
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  letterSpacing: '0.5px',
                }}
              >
                {header.column.caption}
              </div>
            )}
            cellRender={(cellData) => (
              column.name === 'image' && cellData.value ? (
                <div style={{ padding: '10px 15px' }}>
                  <img
                    src={cellData.value}
                    alt="Document Thumbnail"
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    padding: '10px 15px',
                    color: '#1a1f36',
                    fontWeight: cellData.rowIndex === 0 ? '500' : 'normal',
                  }}
                >
                  {cellData.text}
                </div>
              )
            )}
          />
        ))}
        
        <Paging enabled={true} pageSize={5} />
        <Scrolling mode="standard" />
        
        <Pager
          showInfo={true}
          infoText="Page {0} of {1}"
          visible={true}
          displayMode="compact"
        />
      </DataGrid>
    </div>
  );
};

export default DocumentsTable;
