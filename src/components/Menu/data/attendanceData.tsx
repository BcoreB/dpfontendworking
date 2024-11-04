// attendanceData.ts

export interface RowData {
    date: string;
    in: string;
    out: string;
    shift: string;
  }
  
  // Attendance data for each employee code
  const attendanceData: { [key: string]: RowData[] } = {
    12345: [
      { date: '2024-11-01', in: '9:00 AM', out: '5:00 PM', shift: 'Morning' },
      { date: '2024-11-02', in: '9:15 AM', out: '5:10 PM', shift: 'Morning' },
      { date: '2024-11-03', in: '10:00 AM', out: '6:00 PM', shift: 'Afternoon' },
      { date: '2024-11-04', in: '8:45 AM', out: '4:45 PM', shift: 'Morning' },
      { date: '2024-11-05', in: '9:30 AM', out: '5:30 PM', shift: 'Morning' },
      { date: '2024-11-06', in: '10:15 AM', out: '6:15 PM', shift: 'Afternoon' },
    ],
    67890: [
      { date: '2024-11-01', in: '8:30 AM', out: '4:30 PM', shift: 'Morning' },
      { date: '2024-11-02', in: '8:45 AM', out: '4:45 PM', shift: 'Morning' },
      { date: '2024-11-03', in: '9:00 AM', out: '5:00 PM', shift: 'Morning' },
      { date: '2024-11-04', in: '9:15 AM', out: '5:15 PM', shift: 'Morning' },
      { date: '2024-11-05', in: '9:30 AM', out: '5:30 PM', shift: 'Afternoon' },
      { date: '2024-11-06', in: '10:00 AM', out: '6:00 PM', shift: 'Afternoon' },
    ],
    E003: [
      { date: '2024-11-01', in: '9:00 AM', out: '6:00 PM', shift: 'Afternoon' },
      { date: '2024-11-02', in: '9:15 AM', out: '6:10 PM', shift: 'Afternoon' },
      { date: '2024-11-03', in: '9:45 AM', out: '5:45 PM', shift: 'Afternoon' },
      { date: '2024-11-04', in: '10:00 AM', out: '6:30 PM', shift: 'Afternoon' },
      { date: '2024-11-05', in: '10:15 AM', out: '6:15 PM', shift: 'Evening' },
      { date: '2024-11-06', in: '10:30 AM', out: '6:30 PM', shift: 'Evening' },
    ],
  };
  export default attendanceData