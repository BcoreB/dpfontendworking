"use client"
// components/TrainingTable.tsx
import React, { useState, useEffect } from 'react';
import { DataGrid, Column, Paging, Scrolling } from 'devextreme-react/data-grid';
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

  return (
    <div className="bg-white shadow-md rounded-lg">
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
        height={460}
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
        <Button variant="contained" onClick={handleOpenModal} sx={{color: 'black' }}>
          Request Training
        </Button>
      </div>
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
