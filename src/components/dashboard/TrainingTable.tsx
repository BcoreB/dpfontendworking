// components/LeaveTable.tsx
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell } from '@mui/material';

const TrainingTable = () => {
  const [columns] = useState([
    { name: 'date', title: 'Date' },
    { name: 'training', title: 'Training' },
    { name: 'attenddate', title: 'Attend Date' },
  ]);

  const [rows] = useState([
    { date: '2024-11-02', training: 'React Basics', attenddate: '2024-11-03' },
    { date: '2024-11-10', training: 'Advanced JavaScript', attenddate: '2024-11-11' },
    { date: '2024-12-01', training: 'TypeScript Essentials', attenddate: '2024-12-02' },
   
  ]);
  // Custom Table Header Cell component to set background color
  const CustomTableHeaderCell = (props: any) => (
    <TableHeaderRow.Cell
    {...props}
    style={{
        ...props.style,
        backgroundColor: '#FEFFA7', // Set your desired background color here
        color: '#000', // Set the text color to white for contrast
        fontWeight: 'bold',
        borderRight: '1px solid #ccc', // Add vertical line between cells
    }}
    />
);

// Custom Table Cell component to add vertical lines between cells
const CustomTableCell = (props: any) => (
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
      <h3 className="text-lg font-semibold bg-green-200 py-2">Training</h3>
      <Grid rows={rows} columns={columns}>
        <Table cellComponent={CustomTableCell} />
        <TableHeaderRow  cellComponent={CustomTableHeaderCell}/>
      </Grid>
    </div>
  );
};

export default TrainingTable;
