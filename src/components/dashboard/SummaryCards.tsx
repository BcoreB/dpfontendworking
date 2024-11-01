// components/SummaryCards.tsx
import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SummaryCards = () => {
  const cards = [
    { title: 'ABSENT', count: 6 },
    { title: 'LEAVE', count: 1 },
    { title: 'LOAN', count: 6 },
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className='flex flex-col py-4 justify-between md:items-end'>
      {/* Month Dropdown */}
      <FormControl variant="outlined" sx={{ minWidth: 120, mb: 2 }}>
        <InputLabel>Month</InputLabel>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          label="Month"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: 1 }}
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Summary Cards */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-full md:w-48 bg-gradient-to-br from-green-300 to-green-100 shadow-lg rounded-lg p-4"
          >
            <div className="text-center p-2">
              <h3 className="text-md font-semibold text-gray-700">{card.title}</h3>
            </div>
            <div className="text-center px-4 py-2 bg-white rounded-md shadow-inner">
              <p className="text-xl font-bold text-green-700">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
