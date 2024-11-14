import React, { useState } from 'react';
import { DataGrid, Column, Paging, Scrolling, Pager } from 'devextreme-react/data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Switch, FormControlLabel } from '@mui/material';
import { getLanguageByEnglish } from '@/utils/languages';
const LeaveTable = () => {
  const [columns] = useState([
    { name: 'type', title: 'Type' },
    { name: 'fromDate', title: 'From Date' },
    { name: 'toDate', title: 'To Date' },
    { name: 'remarks', title: 'Remarks' },
    { name: 'status', title: 'Status' },
  ]);

  const [rows, setRows] = useState([
    { type: 'Sick Leave', fromDate: '02-11-2024', toDate: '02-11-2024', remarks: 'N/A', status: 'Pending' },
    { type: 'Casual Leave', fromDate: '03-11-2024', toDate: '03-11-2024', remarks: 'Personal', status: 'Approved' },
    { type: 'Sick Leave', fromDate: '04-11-2024', toDate: '04-11-2024', remarks: 'Flu', status: 'Pending' },
    { type: 'Paid Leave', fromDate: '05-11-2024', toDate: '05-11-2024', remarks: 'Vacation', status: 'Approved' },
    { type: 'Work from Home', fromDate: '06-11-2024', toDate: '06-11-2024', remarks: 'Project work', status: 'Pending' },
    { type: 'Casual Leave', fromDate: '07-11-2024', toDate: '07-11-2024', remarks: 'Family Event', status: 'Approved' },
    { type: 'Sick Leave', fromDate: '08-11-2024', toDate: '08-11-2024', remarks: 'Medical Appointment', status: 'Pending' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    fromDate: '',
    toDate: '',
    halfDay: false,
    reason: '',
    remarks: ''
  });

  // Open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle form data change
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHalfDayToggle = () => {
    setFormData((prev) => ({ ...prev, halfDay: !prev.halfDay }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Close the modal
    handleCloseModal();

    // Add form data to rows in the table with default status 'Pending'
    setRows((prevRows) => [
      ...prevRows,
      {
        type: formData.type,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        remarks: formData.remarks,
        status: 'Pending'
      }
    ]);

    // Clear form data
    setFormData({
      type: '',
      fromDate: '',
      toDate: '',
      halfDay: false,
      reason: '',
      remarks: ''
    });
  };

  return (
    <div className="bg-white shadow-md rounded-md">
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
            { getLanguageByEnglish('Leave')}
          </h3>
        </div>

        <DataGrid
          dataSource={rows}
          showBorders={false}
          rowAlternationEnabled={false}
          hoverStateEnabled={true}
          height={600}
          rtlEnabled={true} // Enable RTL layout for DataGrid
          columnAutoWidth={true}
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
              caption={ getLanguageByEnglish(column.title)}
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
      <Button variant="contained" color="warning" sx={{ mt: 2, float: 'right', mr: 1, color: 'black' }} onClick={handleOpenModal}>
        { getLanguageByEnglish('Request')}
      </Button>

      {/* Modal for Leave Request */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{ getLanguageByEnglish('Leave Request')}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>{ getLanguageByEnglish('Type')}</InputLabel>
            <Select name="type" value={formData.type} onChange={handleChange}>
              <MenuItem value="Sick Leave">{ getLanguageByEnglish('Sick Leave')}</MenuItem>
              <MenuItem value="Casual Leave">{ getLanguageByEnglish('Casual Leave')}</MenuItem>
              <MenuItem value="Paid Leave">{ getLanguageByEnglish('Paid Leave')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="fromDate"
            label={ getLanguageByEnglish("From Date")}
            type="date"
            value={formData.fromDate}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="toDate"
            label={ getLanguageByEnglish("To Date")}
            type="date"
            value={formData.toDate}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={<Switch checked={formData.halfDay} onChange={handleHalfDayToggle} />}
            label={ getLanguageByEnglish("Half Day")}
          />
          <TextField
            name="reason"
            label={ getLanguageByEnglish("Reason")}
            value={formData.reason}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="remarks"
            label={ getLanguageByEnglish("Remarks")}
            value={formData.remarks}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error">{ getLanguageByEnglish("Cancel")}</Button>
          <Button onClick={handleSubmit} color="primary">{ getLanguageByEnglish("Save")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LeaveTable;
