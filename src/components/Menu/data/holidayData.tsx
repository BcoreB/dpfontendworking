// data/holidayData.ts
export interface HolidayRow {
    date: string;
    description: string;
  }
  
  const holidaysData: Record<string, HolidayRow[]> = {
    '12345': [
      { date: '2024-11-02', description: 'Sick Leave' },
      { date: '2024-12-25', description: 'Christmas Holiday' },
    ],
    '67890': [
      { date: '2024-11-10', description: 'Personal Day' },
      { date: '2025-01-01', description: 'New Year’s Day' },
    ],
    // Add more employee codes and holiday data as needed
  };
  
  // Function to retrieve holiday data by employee code
  export const getHolidaysByEmployeeCode = (employeeCode: string): HolidayRow[] => {
    return holidaysData[employeeCode] || [];
  };
  