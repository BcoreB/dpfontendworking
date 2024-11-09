import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

interface SummaryCardProps {
  employeeCode: string;
}

const SummaryCards: React.FC<SummaryCardProps> = ({ employeeCode }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const summaryData: Record<string, Record<number, { title: string; count: number }[]>> = {
    "12345": {
      0: [{ title: 'ABSENT', count: 4 }, { title: 'LEAVE', count: 2 }, { title: 'LOAN', count: 1 }, { title: 'Late In, Early Out', count: 3 }],
      1: [{ title: 'ABSENT', count: 6 }, { title: 'LEAVE', count: 1 }, { title: 'LOAN', count: 2 }, { title: 'Late In, Early Out', count: 5 }],
      2: [{ title: 'ABSENT', count: 3 }, { title: 'LEAVE', count: 2 }, { title: 'LOAN', count: 3 }, { title: 'Late In, Early Out', count: 4 }],
      3: [{ title: 'ABSENT', count: 5 }, { title: 'LEAVE', count: 0 }, { title: 'LOAN', count: 1 }, { title: 'Late In, Early Out', count: 2 }],
      4: [{ title: 'ABSENT', count: 1 }, { title: 'LEAVE', count: 4 }, { title: 'LOAN', count: 0 }, { title: 'Late In, Early Out', count: 3 }],
      5: [{ title: 'ABSENT', count: 2 }, { title: 'LEAVE', count: 1 }, { title: 'LOAN', count: 5 }, { title: 'Late In, Early Out', count: 6 }],
      6: [{ title: 'ABSENT', count: 4 }, { title: 'LEAVE', count: 3 }, { title: 'LOAN', count: 2 }, { title: 'Late In, Early Out', count: 7 }],
      7: [{ title: 'ABSENT', count: 3 }, { title: 'LEAVE', count: 0 }, { title: 'LOAN', count: 4 }, { title: 'Late In, Early Out', count: 1 }],
      8: [{ title: 'ABSENT', count: 6 }, { title: 'LEAVE', count: 2 }, { title: 'LOAN', count: 1 }, { title: 'Late In, Early Out', count: 5 }],
      9: [{ title: 'ABSENT', count: 2 }, { title: 'LEAVE', count: 1 }, { title: 'LOAN', count: 3 }, { title: 'Late In, Early Out', count: 3 }],
      10: [{ title: 'ABSENT', count: 4 }, { title: 'LEAVE', count: 3 }, { title: 'LOAN', count: 1 }, { title: 'Late In, Early Out', count: 4 }],
      11: [{ title: 'ABSENT', count: 5 }, { title: 'LEAVE', count: 0 }, { title: 'LOAN', count: 2 }, { title: 'Late In, Early Out', count: 6 }],
    },
    "67890": {
      0: [{ title: 'ABSENT', count: 2 }, { title: 'LEAVE', count: 3 }, { title: 'LOAN', count: 4 }, { title: 'Late In, Early Out', count: 2 }],
      1: [{ title: 'ABSENT', count: 1 }, { title: 'LEAVE', count: 4 }, { title: 'LOAN', count: 5 }, { title: 'Late In, Early Out', count: 1 }],
      2: [{ title: 'ABSENT', count: 3 }, { title: 'LEAVE', count: 2 }, { title: 'LOAN', count: 2 }, { title: 'Late In, Early Out', count: 3 }],
      3: [{ title: 'ABSENT', count: 4 }, { title: 'LEAVE', count: 1 }, { title: 'LOAN', count: 6 }, { title: 'Late In, Early Out', count: 5 }],
      4: [{ title: 'ABSENT', count: 2 }, { title: 'LEAVE', count: 0 }, { title: 'LOAN', count: 3 }, { title: 'Late In, Early Out', count: 2 }],
      5: [{ title: 'ABSENT', count: 1 }, { title: 'LEAVE', count: 5 }, { title: 'LOAN', count: 1 }, { title: 'Late In, Early Out', count: 4 }],
      6: [{ title: 'ABSENT', count: 3 }, { title: 'LEAVE', count: 1 }, { title: 'LOAN', count: 0 }, { title: 'Late In, Early Out', count: 3 }],
      7: [{ title: 'ABSENT', count: 4 }, { title: 'LEAVE', count: 3 }, { title: 'LOAN', count: 2 }, { title: 'Late In, Early Out', count: 2 }],
      8: [{ title: 'ABSENT', count: 5 }, { title: 'LEAVE', count: 1 }, { title: 'LOAN', count: 4 }, { title: 'Late In, Early Out', count: 3 }],
      9: [{ title: 'ABSENT', count: 2 }, { title: 'LEAVE', count: 4 }, { title: 'LOAN', count: 5 }, { title: 'Late In, Early Out', count: 6 }],
      10: [{ title: 'ABSENT', count: 3 }, { title: 'LEAVE', count: 2 }, { title: 'LOAN', count: 3 }, { title: 'Late In, Early Out', count: 1 }],
      11: [{ title: 'ABSENT', count: 6 }, { title: 'LEAVE', count: 0 }, { title: 'LOAN', count: 1 }, { title: 'Late In, Early Out', count: 5 }],
    },
    // Additional employee codes can be added here
  };
  

  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMonth(event.target.value as number);
  };

  const cards = summaryData[employeeCode]?.[selectedMonth] || [
    { title: 'ABSENT', count: 0 },
    { title: 'LEAVE', count: 0 },
    { title: 'LOAN', count: 0 },
    { title: 'Late In, Early Out', count: 0 },
  ];

  return (
    <div className="flex flex-col py-4">
      {/* Month Dropdown */}
      <FormControl variant="outlined" sx={{ minWidth: 120, mb: 4 ,ml: 'auto',}}>
        <InputLabel className='ml-0'>Month</InputLabel>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          label="Month"
          sx={{ backgroundColor: '#f0f0f0', borderRadius: 1 , width:160 }}
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex items-center bg-white shadow rounded-xl p-4"
          >
            {/* Icon */}
            <div className="flex items-center justify-center bg-purple-100 rounded-full w-12 h-12 mr-4">
              <FontAwesomeIcon icon={faFileAlt} className="text-purple-500 text-xl" />
            </div>
            
            {/* Title and Count */}
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-800">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
