"use client"
// components/StaffLedgerTable.tsx
import React, { useState, useEffect } from 'react';
import { DataGrid, Column, Paging, Scrolling, Pager } from 'devextreme-react/data-grid';
import { getEmployeeData } from '../Menu/data/employeeData';
import { getLanguageByEnglish } from '@/utils/languages';
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

  // Fetch employee data on component mount or when employeeCode changes
  useEffect(() => {
    const employeeData = getEmployeeData(employeeCode);
    setRows(employeeData);
  }, [employeeCode]);

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
          {getLanguageByEnglish('Staff Ledger')}
        </h3>
      </div>

      <DataGrid
        dataSource={rows}
        showBorders={false}
        rowAlternationEnabled={false}
        hoverStateEnabled={true}
        rtlEnabled={true} // Enable RTL layout for DataGrid
        height={450}
        columnWidth={150}
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
            caption={getLanguageByEnglish(column.title)}
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
        <Paging enabled={true} />
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

export default StaffLedgerTable;
