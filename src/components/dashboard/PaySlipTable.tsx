"use client"
// components/PaySlipTable.tsx
import React, { useState, useEffect } from 'react';
import { DataGrid, Column, Paging, Scrolling, Pager } from 'devextreme-react/data-grid';
import { getPaySlipData, PaySlipRow } from '../Menu/data/paySlipData'; // Assume this function fetches PaySlip data

const PaySlipTable: React.FC = () => {
  // Define columns with specified widths
  const [columns] = useState([
    { name: 'date', title: 'Date', width: 200 },
    { name: 'account', title: 'Account', width: 300 },
    { name: 'ref', title: 'Ref#', width: 200 },
    { name: 'amount', title: 'Amount', width: 200 },
    { name: 'remarks', title: 'Remarks', width: 400 },
  ]);

  const [rows, setRows] = useState<PaySlipRow[]>([]);

  // Fetch payslip data when the component mounts
  useEffect(() => {
    const paySlipData = getPaySlipData(); // Fetches the data
    setRows(paySlipData);
  }, []);

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
          Pay Slip
        </h3>
      </div>

      <DataGrid
        dataSource={rows}
        showBorders={false}
        rowAlternationEnabled={false}
        hoverStateEnabled={true}
        height={650}
        columnAutoWidth={false} // Disable auto width as we have specific column widths
        noDataText=""
        style={{
          border: 'none',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        }}
        width="100%"
      >
        {columns.map((column) => (
          <Column
            key={column.name}
            dataField={column.name}
            caption={column.title.toUpperCase()}
            alignment="left"
            width={column.width} // Set the specified width for each column
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
        <Paging enabled={true} pageSize={10} />
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

export default PaySlipTable;
