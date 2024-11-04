// data/requestData.ts
 const requestData = {
    '12345': {
      attendance: [
        { date: '2024-11-01', time: '9:00 AM', action: 'Clock In', reason: 'On Time', status: 'Approved' },
        { date: '2024-11-02', time: '9:15 AM', action: 'Clock In', reason: 'Traffic', status: 'Pending' },
        { date: '2024-11-03', time: '10:00 AM', action: 'Clock In', reason: 'Late Start', status: 'Denied' },
      ],
      promotion: [
        { date: '2024-10-01', positionTo: 'Manager', reason: 'Performance', status: 'Approved' },
        { date: '2024-09-15', positionTo: 'Senior Associate', reason: 'Years of Service', status: 'Approved' },
      ],
    },
    '67890': {
      attendance: [
        { date: '2024-11-01', time: '8:30 AM', action: 'Clock In', reason: 'On Time', status: 'Approved' },
        { date: '2024-11-02', time: '9:05 AM', action: 'Clock In', reason: 'Delayed', status: 'Approved' },
      ],
      promotion: [
        { date: '2024-09-20', positionTo: 'Lead Developer', reason: 'Exceptional Work', status: 'Approved' },
      ],
    },
  };
  export default requestData