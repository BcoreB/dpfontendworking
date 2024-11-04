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

  // Helper to ensure tables always have at least minRows
  const fillEmptyRows = (rows: any[], minRows: number, emptyRow: object) => {
    const filledRows = [...rows];
    while (filledRows.length < minRows) {
      filledRows.push({ ...emptyRow });
    }
    return filledRows;
  };

  // State for attendance data
  const [attendanceData, setAttendanceData] = useState(
    fillEmptyRows(attendance, 5, {
      date: '', time: '', action: '', reason: '', status: ''
    })
  );

  // State for handling request modal visibility and form data
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    dateTime: '',
    action: 'Cancel',  // Default to 'Cancel'
    reason: ''
  });

  // Helper to open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Save action
  const handleSave = () => {
    const { dateTime, action, reason } = formData;
    const [date, time] = dateTime.split('T');  // Split datetime for date and time

    // Add new entry to attendance data
    const newEntry = { date, time, action, reason, status: 'Pending' };
    setAttendanceData(prev => [newEntry, ...prev]);

    // Close modal
    handleClose();
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
        <Box
          sx={{
            maxHeight: 300,
            overflowY: 'auto',
            border: '1px solid #ddd',
          }}
        >
          <Grid rows={attendanceData} columns={attendanceColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button variant="contained" sx={{ mt: 2, color: 'black' }} onClick={handleOpen}>
          Request
        </Button>
      </div>

      {/* Modal for Attendance Request */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Attendance Request</DialogTitle>
        <DialogContent>
          <TextField
            label="Date & Time"
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
          <RadioGroup
            name="action"
            value={formData.action}
            onChange={handleChange}
            row
            sx={{ mt: 2 }}
          >
            <FormControlLabel value="Cancel" control={<Radio />} label="Cancel" />
            <FormControlLabel value="New" control={<Radio />} label="New" />
          </RadioGroup>
          <TextField
            label="Reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ color: 'black', backgroundColor: 'green' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Promotion Requests Table */}
      <div className="bg-white shadow-md rounded-md">
        <h3 className="text-lg font-semibold bg-green-200 py-2">Promotion Requests</h3>
        <Box
          sx={{
            maxHeight: 300,
            overflowY: 'auto',
            border: '1px solid #ddd',
          }}
        >
          <Grid rows={promotion} columns={promotionColumns}>
            <Table cellComponent={CustomTableCell} />
            <TableHeaderRow cellComponent={CustomTableHeaderCell} />
          </Grid>
        </Box>
        <Button variant="contained" sx={{ mt: 2, color: 'black' }}>
          Request
        </Button>
      </div>
    </div>
  );
};

export default RequestTables;
