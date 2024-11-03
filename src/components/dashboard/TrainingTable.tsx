// components/TrainingTable.tsx
import React, { useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell, Button, Modal, Box, Typography, MenuItem, Select } from '@mui/material';

interface Column {
  name: string;
  title: string;
}

interface Row {
  date: string;
  training: string;
  attenddate: string;
}

const TrainingTable: React.FC = () => {
  const minRows = 16; // Minimum number of rows to display in the table

  const [columns] = useState<Column[]>([
    { name: 'date', title: 'Date' },
    { name: 'training', title: 'Training' },
    { name: 'attenddate', title: 'Attend Date' },
  ]);

  const [rows, setRows] = useState<Row[]>([
    { date: '2024-11-02', training: 'React Basics', attenddate: '2024-11-03' },
    { date: '2024-11-10', training: 'Advanced JavaScript', attenddate: '2024-11-11' },
    { date: '2024-12-01', training: 'TypeScript Essentials', attenddate: '2024-12-02' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState('');

  const trainingOptions = ['React Basics', 'Advanced JavaScript', 'TypeScript Essentials'];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRequestTraining = () => {
    const today = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
    const newRow: Row = {
      date: today,
      training: selectedTraining,
      attenddate: '', // Leave Attend Date empty
    };

    setRows((prevRows) => [...prevRows, newRow]); // Add new row to the table
    setSelectedTraining(''); // Reset selected training
    handleCloseModal();
  };

  // Fill the table with empty rows if there isn't enough data
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
        backgroundColor: '#FEFFA7',
        color: '#000',
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
        borderRight: '1px solid #ccc',
      }}
    />
  );

  return (
    <div className="bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold bg-green-200 py-2 text-center">Training</h3>
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

      {/* Request Training Button */}
      <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2, color: 'black' }}>
        Request Training
      </Button>

      {/* Modal for selecting training */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Select Training
          </Typography>
          <Select
            fullWidth
            value={selectedTraining}
            onChange={(e) => setSelectedTraining(e.target.value)}
            displayEmpty
            sx={{ mt: 2, mb: 4 }}
          >
            <MenuItem value="" disabled>
              Choose a training
            </MenuItem>
            {trainingOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            onClick={handleRequestTraining}
            sx={{ mt: 2, color: 'black' }}
            disabled={!selectedTraining}
          >
            Request
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TrainingTable;
