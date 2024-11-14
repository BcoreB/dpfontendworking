"use client";
import React, { useState } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DataGrid, {
  Column,
  HeaderFilter,
  FilterRow,
  Pager,
  Paging,
} from 'devextreme-react/data-grid';
import requestData from '../Menu/data/requestData';
import { getLanguageByEnglish } from '@/utils/languages';
interface RequestTablesProps {
  employeeCode: string;
}

const RequestTables: React.FC<RequestTablesProps> = ({ employeeCode }) => {
  const { attendance = [], promotion = [] } = requestData[employeeCode as keyof typeof requestData] || {};

  const [attendanceData, setAttendanceData] = useState(attendance);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [attendanceFormData, setAttendanceFormData] = useState({
    dateTime: '',
    action: 'Cancel',
    reason: '',
  });

  const [promotionData, setPromotionData] = useState(promotion);
  const [promotionModalOpen, setPromotionModalOpen] = useState(false);
  const [promotionFormData, setPromotionFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    toPosition: 'Manager',
    reason: '',
    status: 'Pending',
  });

  const openAttendanceModal = () => setAttendanceModalOpen(true);
  const closeAttendanceModal = () => setAttendanceModalOpen(false);
  const openPromotionModal = () => setPromotionModalOpen(true);
  const closePromotionModal = () => setPromotionModalOpen(false);

  const handleAttendanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAttendanceFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePromotionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPromotionFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAttendance = () => {
    const { dateTime, action, reason } = attendanceFormData;
    const [date, time] = dateTime.split('T');
    const newEntry = { date, time, action, reason, status: 'Pending' };
    setAttendanceData(prev => [newEntry, ...prev]);
    closeAttendanceModal();
  };

  const handleSavePromotion = () => {
    const newEntry = {
      date: promotionFormData.date,
      positionTo: promotionFormData.toPosition,
      reason: promotionFormData.reason,
      status: promotionFormData.status,
    };
    setPromotionData(prev => [newEntry, ...prev]);
    closePromotionModal();
  };

  return (
    <div>
      {/* Attendance Request Table */}
      <div className="bg-white shadow-md rounded-md mb-4 py-2 px-4">
        <h3 className="text-lg font-semibold text-center py-2">{getLanguageByEnglish('Attendance Request')}</h3>
        <Box sx={{ height: 170, overflowY: 'auto', border: '1px solid #ddd' }}>
          <DataGrid
            dataSource={attendanceData}
            showBorders={false}
            rowAlternationEnabled={true}
          >
           
            <Column dataField="date" caption={getLanguageByEnglish("Date")} />
            <Column dataField="time" caption={getLanguageByEnglish("Time")} />
            <Column dataField="action" caption={getLanguageByEnglish("Action")} />
            <Column dataField="reason" caption={getLanguageByEnglish("Reason")} />
            <Column dataField="status" caption={getLanguageByEnglish("Status")} />
            <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
            <Paging defaultPageSize={5} />
          </DataGrid>
        </Box>
        <Button variant="contained" sx={{ mt: 2, color: 'black' }} onClick={openAttendanceModal}>
          {getLanguageByEnglish('Request')}
        </Button>
      </div>

      {/* Attendance Request Modal */}
      <Dialog open={attendanceModalOpen} onClose={closeAttendanceModal} fullWidth maxWidth="sm">
        <DialogTitle>{getLanguageByEnglish('Attendance Request')}</DialogTitle>
        <DialogContent>
          <TextField
            label={getLanguageByEnglish("Date & Time")}
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
            <FormControlLabel value="Cancel" control={<Radio />} label={getLanguageByEnglish("Cancel")} />
            <FormControlLabel value="New" control={<Radio />} label={getLanguageByEnglish("New")} />
          </RadioGroup>
          <TextField
            label={getLanguageByEnglish("Reason")}
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
          <Button onClick={closeAttendanceModal}>{getLanguageByEnglish("Cancel")}</Button>
          <Button onClick={handleSaveAttendance} variant="contained" sx={{ color: 'black', backgroundColor: 'green' }}>
           {getLanguageByEnglish("Submit")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Promotion Requests Table */}
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="text-lg font-semibold text-center py-2">{getLanguageByEnglish('Promotion Requests')}</h3>
        <Box sx={{ height: 170, overflowY: 'auto', border: '1px solid #ddd' }}>
          <DataGrid
            dataSource={promotionData}
            showBorders={false}
            rowAlternationEnabled={true}
          >
            <Column dataField="date" caption={getLanguageByEnglish("Date")} />
            <Column dataField="positionTo" caption={getLanguageByEnglish("Position To")} />
            <Column dataField="reason" caption={getLanguageByEnglish("Reason")} />
            <Column dataField="status" caption={getLanguageByEnglish("Status")} />
            <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
            <Paging defaultPageSize={5} />
          </DataGrid>
        </Box>
        <Button variant="contained" sx={{ mt: 2, color: 'black' }} onClick={openPromotionModal}>
        {getLanguageByEnglish('Request')}
        </Button>
      </div>

      {/* Promotion Request Modal */}
      <Dialog open={promotionModalOpen} onClose={closePromotionModal} fullWidth maxWidth="sm">
        <DialogTitle>{getLanguageByEnglish('Promotion Requests')}</DialogTitle>
        <DialogContent>
          <Select
            label="Position To"
            name="toPosition"
            value={promotionFormData.toPosition}
            onChange={handlePromotionChange}
            fullWidth
            sx={{ mt: 2 }}
          >
            <MenuItem value="Manager">{getLanguageByEnglish('Manager')}</MenuItem>
            <MenuItem value="Chief">{getLanguageByEnglish('Chief')}</MenuItem>
            <MenuItem value="Supervisor">{getLanguageByEnglish('Supervisor')}</MenuItem>
          </Select>
          <TextField
            label={getLanguageByEnglish("Reason")}
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
          <Button onClick={closePromotionModal}>{getLanguageByEnglish("Cancel")}</Button>
          <Button onClick={handleSavePromotion} variant="contained" sx={{ color: 'black', backgroundColor: 'green' }}>
            {getLanguageByEnglish("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RequestTables;
