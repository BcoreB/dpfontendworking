"use client";
import React, { useState, useEffect } from 'react';
import { DataGrid, Column, Paging, Scrolling, Pager } from 'devextreme-react/data-grid';
import { Button, Modal, Box, Typography, MenuItem, Select, TextField } from '@mui/material';
import { trainingData, TrainingData } from '../Menu/data/trainingData';
import { getLanguageByEnglish } from '@/utils/languages';
import { useDirection } from '@/app/DirectionContext';
interface Column {
  name: string;
  title: string;
}

interface TrainingTableProps {
  employeeCode: string;
}

const TrainingTable: React.FC<TrainingTableProps> = ({ employeeCode }) => {
  const { isRtl } = useDirection();
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

  useEffect(() => {
    const employeeData = trainingData[employeeCode] || [];
    setRows(employeeData);
  }, [employeeCode]);

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };
  const handleRequestTraining = () => {
    const today = new Date().toISOString().split('T')[0];
    const formattedDate = formatDate(today); // Format the date
    const newRow: TrainingData = {

      date: formattedDate,
      training: selectedTraining,
      attenddate: '',
    };

    setRows((prevRows) => [...prevRows, newRow]);
    setSelectedTraining('');
    handleCloseModal();
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div
        style={{
          maxWidth: '100%',
          overflowX: 'auto',
          borderRadius: '16px',
          border: '1px solid #e0e0e0',
          padding: '20px',
          backgroundColor: '#f7f9fc',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px' }}>
          <h3 style={{ fontSize: '25px', fontWeight: '600', color: '#1a1f36' }}>{ getLanguageByEnglish('Training')}</h3>
        </div>

        <DataGrid
          dataSource={rows}
          rtlEnabled={isRtl} // Enable RTL layout for DataGrid
          showBorders={false}
          rowAlternationEnabled={false}
          hoverStateEnabled
          height={450}
          columnWidth={120}
          noDataText=""
          style={{ border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
          width="100%"
        >
          {columns.map((column) => (
            <Column
              key={column.name}
              dataField={column.name}
              caption={ getLanguageByEnglish(column.title)}
              alignment="left"
              headerCellRender={(header) => (
                <div style={{ color: '#6b7280', fontWeight: '600', padding: '15px', fontSize: '12px', letterSpacing: '0.5px' }}>
                  {header.column.caption}
                </div>
              )}
              cellRender={(cellData) => (
                <div style={{ padding: '10px 15px', color: '#1a1f36', fontWeight: cellData.rowIndex === 0 ? '500' : 'normal' }}>
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

        <Button variant="contained" onClick={handleOpenModal} sx={{ color: 'black', marginTop:1 }}>
        { getLanguageByEnglish('Request Training')}
        </Button>
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: 600, minWidth:300 , bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">
          { getLanguageByEnglish('Select Training')}
          </Typography>
          <Select fullWidth value={selectedTraining} onChange={(e) => setSelectedTraining(e.target.value)} displayEmpty sx={{ mt: 2, mb: 4 }}>
            <MenuItem value="" disabled>{ getLanguageByEnglish('Choose a training')}</MenuItem>
            {trainingOptions.map((option, index) => (
              <MenuItem key={index} value={option}>{ getLanguageByEnglish(option)}</MenuItem>
            ))}
          </Select>

          <TextField label={ getLanguageByEnglish("Pref. Date")} type="date" value={prefDate} onChange={(e) => setPrefDate(e.target.value)} fullWidth sx={{ mt: 2, mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField label={ getLanguageByEnglish("Reason")} value={reason} onChange={(e) => setReason(e.target.value)} fullWidth sx={{ mb: 2 }} />

          <div className='flex gap-5 '>
            <Button variant="contained" onClick={handleRequestTraining} sx={{ mt: 2, color: 'black' }} disabled={!selectedTraining || !prefDate || !reason}>
            { getLanguageByEnglish('Save')}
            </Button>
            <Button variant="outlined" onClick={handleCloseModal} sx={{ mt: 2, ml: 2 }}>
            { getLanguageByEnglish('Cancel')}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TrainingTable;
