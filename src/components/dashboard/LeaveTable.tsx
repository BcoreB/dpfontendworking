// components/LeaveTable.tsx
import React, { useState } from 'react';
import { DataGrid, Column, Paging, Scrolling } from 'devextreme-react/data-grid';
import { Box, TableCell, Button } from '@mui/material';

const LeaveTable = () => {
  const minRows = 8; // Minimum number of rows to display in the table

  const [columns] = useState([
    { name: 'date', title: 'Date' },
    { name: 'type', title: 'Type' },
    { name: 'remarks', title: 'Remarks' },
  ]);

  const [rows] = useState([
    { date: '2024-11-02', type: 'Sick Leave', remarks: 'N/A' },
    { date: '2024-11-03', type: 'Casual Leave', remarks: 'Personal' },
    { date: '2024-11-04', type: 'Sick Leave', remarks: 'Flu' },
    { date: '2024-11-05', type: 'Paid Leave', remarks: 'Vacation' },
    { date: '2024-11-06', type: 'Work from Home', remarks: 'Project work' },
    { date: '2024-11-07', type: 'Casual Leave', remarks: 'Family Event' },
    { date: '2024-11-08', type: 'Sick Leave', remarks: 'Medical Appointment' },
  ]);

  
  // Fill table with empty rows if data is not sufficient
  const fillEmptyRows = (dataRows:any, columns:any) => {
    const emptyRow = columns.reduce((acc:any, column:any) => {
      acc[column.name] = ''; // Fill each cell with an empty string
      return acc;
    }, {});

    const filledRows = [...dataRows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  const displayedRows = fillEmptyRows(rows, columns);

  return (
    <div className="bg-white shadow-md rounded-md">
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
            Leave
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
      <Button variant="contained" color="warning" sx={{ mt: 2, float: 'right', mr: 1, color:'black' }}>
          Request
      </Button>
    </div>
  );
};

export default LeaveTable;
