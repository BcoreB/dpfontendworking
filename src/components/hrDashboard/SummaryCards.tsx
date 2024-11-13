"use client"
import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

interface SummaryCardProps {
  employeeCode: string;
}

const SummaryCards: React.FC<SummaryCardProps> = ({ employeeCode }) => {
  
  const summaryData: Record<string, Record<number, { title: string; count: number }[]>> = {
    "12345": []
       
    ,
    "67890": [],
    // Additional employee codes can be added here
  };
  
  const [isClient, setIsClient] = useState(false);
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMonth(event.target.value as number);
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  
  if (!isClient) {
    return null; // Return null on server-side render to avoid mismatch
  }
  const cards = summaryData[employeeCode]?.[selectedMonth] || [
    { title: 'HEAD COUNT', count: 150 },
    { title: 'MALE', count:50 },
    { title: 'FEMALE', count: 100 },
    { title: 'FULL TIME', count: 100 },
    { title: 'PART TIME', count: 50 },
    { title: 'HIRE', count: 10 },
    { title: 'TERMINATION', count: 0 },
    { title: 'RESIGNATION', count: 4 },
  ];

  return (
    <div className="flex flex-col py-4">

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
