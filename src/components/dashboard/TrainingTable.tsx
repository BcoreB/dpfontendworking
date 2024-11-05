// components/TrainingTable.tsx
import React, { useState, useEffect } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableCell, Button, Modal, Box, Typography, MenuItem, Select,TextField } from '@mui/material';
import { trainingData, TrainingData } from '../Menu/data/trainingData';

interface Column {
  name: string;
  title: string;
}

interface TrainingTableProps {
  employeeCode: string;
}

const TrainingTable: React.FC<TrainingTableProps> = ({ employeeCode }) => {
  const minRows = 16; // Minimum number of rows to display in the table

  const [columns] = useState<Column[]>([
    { name: 'date', title: 'Date' },
    { name: 'training', title: 'Training' },
    { name: 'attenddate', title: 'Attend Date' },
  ]);

  const [rows, setRows] = useState<TrainingData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState('');
  const [prefDate, setPrefDate] = useState('');
  const [reason, setReason] = useState('');
  const trainingOptions = ['React Basics', 'Advanced JavaScript', 'TypeScript Essentials'];

  // Fetch training data based on employeeCode
  useEffect(() => {
    const employeeData = trainingData[employeeCode] || [];
    setRows(employeeData);
  }, [employeeCode]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRequestTraining = () => {
    const today = new Date().toISOString().split('T')[0];
    const newRow: TrainingData = {
      date: today,
      training: selectedTraining,
      attenddate: '',
    };

    setRows((prevRows) => [...prevRows, newRow]);
    setSelectedTraining('');
    handleCloseModal();
  };

  // Fill the table with empty rows if there isn't enough data
  const fillEmptyRows = (dataRows: TrainingData[], columns: Column[]): TrainingData[] => {
    const emptyRow = columns.reduce((acc, column) => {
      acc[column.name as keyof TrainingData] = '';
      return acc;
    }, {} as TrainingData);

    const filledRows = [...dataRows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  const displayedRows = fillEmptyRows(rows, columns);

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
      <h3 className="text-lg font-semibold bg-green-200 py-2 text-center">Training</h3>
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

      <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2, color: 'black' }}>
        Request Training
      </Button>

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
          
          <TextField
            label="Pref. Date"
            type="date"
            value={prefDate}
            onChange={(e) => setPrefDate(e.target.value)}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            onClick={handleRequestTraining}
            sx={{ mt: 2, color: 'black' }}
            disabled={!selectedTraining || !prefDate || !reason}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseModal}
            sx={{ mt: 2, ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TrainingTable;
