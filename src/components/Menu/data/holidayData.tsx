// data/holidayData.ts
export interface HolidayRow {
    date: string;
    description: string;
  }
  
  const holidaysData: Record<string, HolidayRow[]> = {
    '12345': [
      { date: '02-01-2024', description: 'Sick Leave' },
      { date: '25-12-2024', description: 'Christmas Holiday' },
    ],
    '67890': [
      { date: '20-02-2024', description: 'Personal Day' },
      { date: '20-06-2024', description: 'New Year’s Day' },
    ],
    // Add more employee codes and holiday data as needed
  };
  
  // Function to retrieve holiday data by employee code
  export const getHolidaysByEmployeeCode = (employeeCode: string): HolidayRow[] => {
    return holidaysData[employeeCode] || [];
  };
  