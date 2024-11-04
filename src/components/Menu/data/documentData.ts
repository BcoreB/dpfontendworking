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
      { type: 'Passport', number: '123456', expiry: '2025-12-31', image: 'passport.jpg' },
      { type: 'Driver’s License', number: '789012', expiry: '2026-06-15', image: 'license.jpg' },
    ],
    '67890': [
      { type: 'ID Card', number: '345678', expiry: '2027-01-01', image: 'idcard.jpg' },
      { type: 'Residence Permit', number: '901234', expiry: '2028-05-20', image: 'residence.jpg' },
    ],
    // Add more employees as needed
  };
  
  // Function to retrieve data based on employeeCode
  export const getDocumentsByEmployeeCode = (employeeCode: string): DocumentRow[] => {
    return documentData[employeeCode] || [];
  };
  