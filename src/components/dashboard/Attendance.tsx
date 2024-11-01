// components/Attendance.tsx
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '200px',
};

const center = {
  lat: 37.7749, // Example latitude for San Francisco
  lng: -122.4194, // Example longitude for San Francisco
};

const Attendance: React.FC = () => {
  const [attendanceType, setAttendanceType] = useState('Office');
  const [remarks, setRemarks] = useState('');
  const [mapCenter, setMapCenter] = useState(center);

  const handleAttendanceTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAttendanceType(event.target.value as string);
  };

  const handleCheckIn = () => {
    console.log('Checked In');
    // Add logic for Check-In
  };

  const handleCheckOut = () => {
    console.log('Checked Out');
    // Add logic for Check-Out
  };

  return (
    <Paper className="p-4 shadow-md rounded-md w-full max-w-md mx-auto">
      <h2 className="text-center font-semibold mb-4">Attendance</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Type</label>
          <Select
            value={attendanceType}
            onChange={handleAttendanceTypeChange}
            fullWidth
          >
            <MenuItem value="Office">Office</MenuItem>
            <MenuItem value="Client">Client</MenuItem>
            <MenuItem value="Home">Home</MenuItem>
          </Select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Remarks</label>
          <TextField
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            fullWidth
            variant="outlined"
            size="medium"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Location</label>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={10}
          >
            <Marker position={mapCenter} />
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="flex justify-between">
        <Button variant="contained" color="black" onClick={handleCheckIn}>
          Check In
        </Button>
        <Button variant="contained" color="black" onClick={handleCheckOut}>
          Check Out
        </Button>
      </div>
    </Paper>
  );
};

export default Attendance;
