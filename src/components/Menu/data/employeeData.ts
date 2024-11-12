// data/employeeData.ts
interface EmployeeData {
    date: string;
    account: string;
    ref: string;
    amount: string;
    remarks: string;
  }
  
  // Sample data categorized by employeeCode
  const employeeData: Record<string, EmployeeData[]> = {
    '12345': [
      { date: '01-01-2023', account: 'Salary', ref: '101', amount: '2000', remarks: 'January Salary' },
      { date: '01-02-2024', account: 'Bonus', ref: '102', amount: '500', remarks: 'Performance Bonus' },
    ],
    '67890': [
      { date: '15-04-2024', account: 'Salary', ref: '201', amount: '2500', remarks: 'January Salary' },
      { date: '01-05-2024', account: 'Bonus', ref: '202', amount: '300', remarks: 'Project Bonus' },
    ],
    // Add more employee data as needed
  };
  
  // Function to retrieve data based on employeeCode
  export const getEmployeeData = (employeeCode: string): EmployeeData[] => {
    return employeeData[employeeCode] || [];
  };
  