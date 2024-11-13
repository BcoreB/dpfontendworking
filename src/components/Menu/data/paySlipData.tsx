// data/paySlipData.ts
export interface PaySlipRow {
    date: string;
    account: string;
    ref: string;
    amount: number;
    remarks: string;
  }
  
  // Sample data array
  const paySlipSampleData: PaySlipRow[] = [
    {
      date: '2023-01-15',
      account: 'Bank of America - Checking',
      ref: 'PSL-1234',
      amount: 1500.00,
      remarks: 'Monthly Salary',
    },
    {
      date: '2023-02-15',
      account: 'Bank of America - Checking',
      ref: 'PSL-1235',
      amount: 1500.00,
      remarks: 'Monthly Salary',
    },
    {
      date: '2023-03-15',
      account: 'Bank of America - Checking',
      ref: 'PSL-1236',
      amount: 1500.00,
      remarks: 'Monthly Salary',
    },
    {
      date: '2023-04-15',
      account: 'Bank of America - Checking',
      ref: 'PSL-1237',
      amount: 1500.00,
      remarks: 'Monthly Salary',
    },
    {
      date: '2023-05-15',
      account: 'Bank of America - Checking',
      ref: 'PSL-1238',
      amount: 1600.00,
      remarks: 'Monthly Salary with Bonus',
    },
    {
      date: '2023-06-15',
      account: 'Bank of America - Savings',
      ref: 'PSL-1239',
      amount: 1200.00,
      remarks: 'Partial Payment',
    },
    {
      date: '2023-07-15',
      account: 'Bank of America - Checking',
      ref: 'PSL-1240',
      amount: 1500.00,
      remarks: 'Monthly Salary',
    },
    {
      date: '2023-08-15',
      account: 'Bank of America - Savings',
      ref: 'PSL-1241',
      amount: 1700.00,
      remarks: 'Monthly Salary with Commission',
    },
    {
      date: '2023-09-15',
      account: 'Bank of America - Checking',
      ref: 'PSL-1242',
      amount: 1500.00,
      remarks: 'Monthly Salary',
    },
    {
      date: '2023-10-15',
      account: 'Bank of America - Checking',
      ref: 'PSL-1243',
      amount: 1500.00,
      remarks: 'Monthly Salary',
    },
  ];
  
  // Function to fetch the data
  export const getPaySlipData = (): PaySlipRow[] => {
    return paySlipSampleData;
  };
  