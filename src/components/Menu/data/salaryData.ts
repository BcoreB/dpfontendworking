// data/salaryData.ts

interface SalaryData {
    month: string;
    salary: number;
  }
  
  // Sample salary data categorized by employee code
  const salaryDataByEmployeeCode: Record<string, SalaryData[]> = {
    '12345': [
      { month: 'Jan', salary: 3000 },
      { month: 'Feb', salary: 3200 },
      { month: 'Mar', salary: 3100 },
      { month: 'Apr', salary: 3300 },
      { month: 'May', salary: 3400 },
      { month: 'Jun', salary: 3500 },
      { month: 'Jul', salary: 3600 },
      { month: 'Aug', salary: 3700 },
      { month: 'Sep', salary: 3800 },
      { month: 'Oct', salary: 3900 },
      { month: 'Nov', salary: 4000 },
      { month: 'Dec', salary: 4100 },
    ],
    '67890': [
      { month: 'Jan', salary: 1200 },
      { month: 'Feb', salary: 2300 },
      { month: 'Mar', salary: 3400 },
      { month: 'Apr', salary: 3100 },
      { month: 'May', salary: 3700 },
      { month: 'Jun', salary: 4700 },
      { month: 'Jul', salary: 3800 },
      { month: 'Aug', salary: 3900 },
      { month: 'Sep', salary: 4000 },
      { month: 'Oct', salary: 4100 },
      { month: 'Nov', salary: 4200 },
      { month: 'Dec', salary: 4300 },
    ],
    // Additional employee data can be added here
  };
  
  // Function to retrieve salary data by employee code
  export const getSalaryData = (employeeCode: string): SalaryData[] => {
    return salaryDataByEmployeeCode[employeeCode] || [];
  };
  