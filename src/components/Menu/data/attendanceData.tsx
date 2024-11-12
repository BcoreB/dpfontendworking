export interface RowData {
  date: string;
  in: string;
  out: string;
  shift: string;
}

// Attendance data for each employee code
const attendanceData: { [key: string]: RowData[] } = {
  12345: [
      { date: '01-11-2024', in: '09:00:000 AM', out: '05:00:000 PM', shift: 'Morning' },
      { date: '02-11-2024', in: '09:15:000 AM', out: '05:10:000 PM', shift: 'Morning' },
      { date: '03-11-2024', in: '10:00:000 AM', out: '06:00:000 PM', shift: 'Afternoon' },
      { date: '04-11-2024', in: '08:45:000 AM', out: '04:45:000 PM', shift: 'Morning' },
      { date: '05-11-2024', in: '09:30:000 AM', out: '05:30:000 PM', shift: 'Morning' },
      { date: '06-11-2024', in: '10:15:000 AM', out: '06:15:000 PM', shift: 'Afternoon' },
  ],
  67890: [
      { date: '01-11-2024', in: '08:30:000 AM', out: '04:30:000 PM', shift: 'Morning' },
      { date: '02-11-2024', in: '08:45:000 AM', out: '04:45:000 PM', shift: 'Morning' },
      { date: '03-11-2024', in: '09:00:000 AM', out: '05:00:000 PM', shift: 'Morning' },
      { date: '04-11-2024', in: '09:15:000 AM', out: '05:15:000 PM', shift: 'Morning' },
      { date: '05-11-2024', in: '09:30:000 AM', out: '05:30:000 PM', shift: 'Afternoon' },
      { date: '06-11-2024', in: '10:00:000 AM', out: '06:00:000 PM', shift: 'Afternoon' },
  ],
  E003: [
      { date: '01-11-2024', in: '09:00:000 AM', out: '06:00:000 PM', shift: 'Afternoon' },
      { date: '02-11-2024', in: '09:15:000 AM', out: '06:10:000 PM', shift: 'Afternoon' },
      { date: '03-11-2024', in: '09:45:000 AM', out: '05:45:000 PM', shift: 'Afternoon' },
      { date: '04-11-2024', in: '10:00:000 AM', out: '06:30:000 PM', shift: 'Afternoon' },
      { date: '05-11-2024', in: '10:15:000 AM', out: '06:15:000 PM', shift: 'Evening' },
      { date: '06-11-2024', in: '10:30:000 AM', out: '06:30:000 PM', shift: 'Evening' },
  ],
};
export default attendanceData;
