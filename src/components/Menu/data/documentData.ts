// data/documentData.ts
export interface DocumentRow {
    type: string;
    number: string;
    expiry: string;
    image: string;
  }
  
  // Data organized by employee code
  const documentData: { [key: string]: DocumentRow[] } = {
    '12345': [
      { type: 'Passport', number: '123456', expiry: '31/12/2024', image: 'passport.jpg' },
      { type: 'Driver’s License', number: '789012', expiry: '15/08/2024', image: 'license.jpg' },
    ],
    '67890': [
      { type: 'ID Card', number: '345678', expiry: '01/01/2028', image: 'idcard.jpg' },
      { type: 'Residence Permit', number: '901234', expiry: '20/06/2025', image: 'residence.jpg' },
    ],
    // Add more employees as needed
  };
  
  // Function to retrieve data based on employeeCode
  export const getDocumentsByEmployeeCode = (employeeCode: string): DocumentRow[] => {
    return documentData[employeeCode] || [];
  };
  