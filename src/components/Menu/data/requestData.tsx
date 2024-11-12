const requestData = {
  '12345': {
      attendance: [
          { date: '01-11-2024', time: '9:00 AM', action: 'Clock In', reason: 'On Time', status: 'Approved' },
          { date: '02-11-2024', time: '9:15 AM', action: 'Clock In', reason: 'Traffic', status: 'Pending' },
          { date: '03-11-2024', time: '10:00 AM', action: 'Clock In', reason: 'Late Start', status: 'Denied' },
      ],
      promotion: [
          { date: '01-10-2024', positionTo: 'Manager', reason: 'Performance', status: 'Approved' },
          { date: '15-09-2024', positionTo: 'Senior Associate', reason: 'Years of Service', status: 'Approved' },
      ],
  },
  '67890': {
      attendance: [
          { date: '01-11-2024', time: '8:30 AM', action: 'Clock In', reason: 'On Time', status: 'Approved' },
          { date: '02-11-2024', time: '9:05 AM', action: 'Clock In', reason: 'Delayed', status: 'Approved' },
      ],
      promotion: [
          { date: '20-09-2024', positionTo: 'Lead Developer', reason: 'Exceptional Work', status: 'Approved' },
      ],
  },
};

export default requestData;
