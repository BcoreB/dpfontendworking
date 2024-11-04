import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
import {
  TableCell,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import requestData from '../Menu/data/requestData';

interface RequestTablesProps {
  employeeCode: string;
}

const RequestTables: React.FC<RequestTablesProps> = ({ employeeCode }) => {
  // Columns for each table
  const attendanceColumns = [
    { name: 'date', title: 'Date' },
    { name: 'time', title: 'Time' },
    { name: 'action', title: 'Action' },
    { name: 'reason', title: 'Reason' },
    { name: 'status', title: 'Status' },
  ];

  const promotionColumns = [
    { name: 'date', title: 'Date' },
    { name: 'positionTo', title: 'Position To' },
    { name: 'reason', title: 'Reason' },
    { name: 'status', title: 'Status' },
  ];

  // Fetch rows based on employeeCode or default to empty arrays
  const { attendance = [], promotion = [] } = requestData[employeeCode as keyof typeof requestData] || {};

  // State for attendance data
  const [attendanceData, setAttendanceData] = useState(attendance);
  
  // State for attendance request modal
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [attendanceFormData, setAttendanceFormData] = useState({
    dateTime: '',
    action: 'Cancel',  // Default to 'Cancel'
    reason: ''
  });

  // State for promotion data and promotion request modal
  const [promotionData, setPromotionData] = useState(promotion);
  const [promotionModalOpen, setPromotionModalOpen] = useState(false);
  const [promotionFormData, setPromotionFormData] = useState({
    date: new Date().toISOString().split('T')[0], // Current date
    toPosition: '',
    reason: '',
    status: 'Pending'
  });

  // Helper to open and close modals
  const openAttendanceModal = () => setAttendanceModalOpen(true);
  const closeAttendanceModal = () => setAttendanceModalOpen(false);
  const openPromotionModal = () => setPromotionModalOpen(true);
  const closePromotionModal = () => setPromotionModalOpen(false);

  // Update attendance form data
  const handleAttendanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAttendanceFormData(prev => ({ ...prev, [name]: value }));
  };

  // Update promotion form data
  const handlePromotionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPromotionFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle attendance form submission
  const handleSaveAttendance = () => {
    const { dateTime, action, reason } = attendanceFormData;
    const [date, time] = dateTime.split('T');  // Split datetime for date and time

    const newEntry = { date, time, action, reason, status: 'Pending' };
    setAttendanceData(prev => [newEntry, ...prev]);
    closeAttendanceModal();
  };

  const handleSavePromotion = () => {
    const newEntry = {
      date: promotionFormData.date,
      positionTo: promotionFormData.toPosition, // Map to `positionTo`
      reason: promotionFormData.reason,
      status: promotionFormData.status
    };
  
    setPromotionData(prev => [newEntry, ...prev]);
    closePromotionModal();
  };
  

  // Custom Header and Cell Styling
  const CustomTableHeaderCell = (props: any) => (
    <TableHeaderRow.Cell
      {...props}
      style={{
        ...props.style,
        backgroundColor: '#FEFFA7',
        color: '#000',
        fontWeight: 'bold',
        borderRight: '1px solid #ccc',
        textAlign: 'center',
      }}
    />
  );

  const CustomTableCell = (props: any) => (
    <Table.Cell
      {...props}
      style={{
        ...props.style,
        borderRight: '1px solid #ccc',
        textAlign: 'center',
        fontSize: '0.875rem',
      }}
    />
  );

  return (
    <div>
      {/* Attendance Request Table */}
      <div className="bg-white shadow-md rounded-md mb-4">
        <h3 className="text-lg font-semibold bg-green-200 py-2">Attendance Request</h3>
        <Box sx={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ddd' }}>
          <Grid rows={attendanceData} columns={attendanceColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button variant="contained" sx={{ mt: 2, color: 'black' }} onClick={openAttendanceModal}>
          Request
        </Button>
      </div>

      {/* Attendance Request Modal */}
      <Dialog open={attendanceModalOpen} onClose={closeAttendanceModal}>
        <DialogTitle>Attendance Request</DialogTitle>
        <DialogContent>
          <TextField
            label="Date & Time"
            type="datetime-local"
            name="dateTime"
            value={attendanceFormData.dateTime}
            onChange={handleAttendanceChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
          <RadioGroup
            name="action"
            value={attendanceFormData.action}
            onChange={handleAttendanceChange}
            row
            sx={{ mt: 2 }}
          >
            <FormControlLabel value="Cancel" control={<Radio />} label="Cancel" />
            <FormControlLabel value="New" control={<Radio />} label="New" />
          </RadioGroup>
          <TextField
            label="Reason"
            name="reason"
            value={attendanceFormData.reason}
            onChange={handleAttendanceChange}
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAttendanceModal}>Cancel</Button>
          <Button onClick={handleSaveAttendance} variant="contained" sx={{ color: 'black', backgroundColor: 'green' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Promotion Requests Table */}
      <div className="bg-white shadow-md rounded-md">
        <h3 className="text-lg font-semibold bg-green-200 py-2">Promotion Requests</h3>
        <Box sx={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ddd' }}>
          <Grid rows={promotionData} columns={promotionColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button variant="contained" sx={{ mt: 2, color: 'black' }} onClick={openPromotionModal}>
          Request
        </Button>
      </div>

      {/* Promotion Request Modal */}
      <Dialog open={promotionModalOpen} onClose={closePromotionModal}>
        <DialogTitle>Promotion Request</DialogTitle>
        <DialogContent>
          <TextField
            label="Position To"
            name="toPosition" // Match this with the state key
            value={promotionFormData.toPosition}
            onChange={handlePromotionChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Reason"
            name="reason"
            value={promotionFormData.reason}
            onChange={handlePromotionChange}
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePromotionModal}>Cancel</Button>
          <Button onClick={handleSavePromotion} variant="contained" sx={{ color: 'black', backgroundColor: 'green' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RequestTables;
