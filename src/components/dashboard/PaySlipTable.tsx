"use client"
// components/DocumentsTable.tsx
import React, { useState } from 'react';
import { DataGrid, Column, Paging, Scrolling } from 'devextreme-react/data-grid';

const PaySlipTable = () => {
  const columns = [
    { name: 'date', title: 'Date', width: 200 },
    { name: 'account', title: 'Account', width: 300 },
    { name: 'ref', title: 'Ref#', width: 200 },
    { name: 'amount', title: 'Amount', width: 200 },
    { name: 'remarks', title: 'Remarks', width: 400 },
  ];

  const [rows, setRows] = useState([]);

  const minRows = 20;
  const fillEmptyRows = (rows, minRows) => {
    const emptyRow = { date: '', account: '', ref: '', amount: '', remarks: '' };
    const filledRows = [...rows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };
  const displayedRows = fillEmptyRows(rows, minRows);

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4"
      style={{
        width: '100%',
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
          Payslip
        </h3>
      </div>

      <DataGrid
        dataSource={displayedRows}
        showBorders={false}
        rowAlternationEnabled={false}
        hoverStateEnabled={true}
        height={500}
        columnAutoWidth={false} // Disable automatic column width to allow set widths
        noDataText="" // Hide default no data text
        style={{
          border: 'none',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          width: '700px', // Set a fixed width wider than the container
        }}
      >
        {columns.map((column) => (
          <Column
            key={column.name}
            dataField={column.name}
            caption={column.title.toUpperCase()}
            alignment="left"
            width={column.width} // Set specific width for each column
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
              <div
                style={{
                  padding: '10px 15px',
                  
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
        <Scrolling mode="standard" /> {/* Use standard scrolling for horizontal support */}
      </DataGrid>
    </div>
  );
};

export default PaySlipTable;
