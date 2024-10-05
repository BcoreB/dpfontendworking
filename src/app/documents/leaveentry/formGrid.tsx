import React, { useEffect, useState } from 'react';
import GenericGrid from './GenericGrid';

interface EmployeeData {
  id: number;
  EmpCode: number | null;
  Employee: string | null;
  CPR: string | null;
  FromDate: Date | null;
  ToDate: Date | null;
  NoDays: number | null;
  Entitled: string | null;
  Remarks: string | null;
  NPBalance: string | null;
  LeaveType: string | null;
}

// Define a separate interface for the lookup data
interface LookupData {
  EmpCode: number;
  Employee: string;
  CPR: string;
  NPBalance: string;
  LeaveType: string;
}

interface LeaveManagementProps {
  data: EmployeeData[];
  updateEmployeeData: (updatedData: EmployeeData[]) => void;
}

const LeaveManagement = ({ data, updateEmployeeData }: LeaveManagementProps) => {
  const [leaveData, setLeaveData] = useState<EmployeeData[]>([
    {
      id: 1,
      EmpCode: null,
      Employee: null,
      CPR: null,
      FromDate: null,
      ToDate: null,
      NoDays: null,
      Entitled: null,
      Remarks: null,
      NPBalance: null,
      LeaveType: null,
    },
  ]);
  

  const leaveTypeData = [
    { LeaveType: 'Sick' },
    { LeaveType: 'Annual' },
  ];

  const lookupData :LookupData[]  = [
    { EmpCode: 1, Employee: 'John Doe', CPR: '123456', NPBalance: '10', LeaveType: 'Annual' },
    { EmpCode: 2, Employee: 'Jane Smith', CPR: '654321', NPBalance: '15', LeaveType: 'Sick' },
    { EmpCode: 3, Employee: 'Alice Johnson', CPR: '789012', NPBalance: '8', LeaveType: 'Annual' },
  ];

  // Update leave data when the incoming prop `data` changes
  useEffect(() => {
    if (data && data.length > 0) {
      setLeaveData(data);
    }
  }, [data]);

  const columnMapping = {
    EmpCode: 'EmpCode',
    Employee: 'Employee',
    CPR: 'CPR',
    NPBalance: 'NPBalance',
    LeaveType: 'LeaveType',
  };

  const handleValueSelect = (updatedData: EmployeeData[]) => {
    setLeaveData(updatedData);
    updateEmployeeData(updatedData);
  };

interface CurrentValues {
    FromDate: Date;
    ToDate: Date;
}

interface changedValueObject {
    currentValues: CurrentValues;
    field: string;
}
const handleValuesChange = (changedValues:changedValueObject) => {
  // Extract FromDate and ToDate from the currentValues
  console.log(changedValues)
  const { FromDate, ToDate } = changedValues.currentValues;

  // Check if both FromDate and ToDate are present
  if (FromDate && ToDate) {
    // Parse the dates
    const fromDate = new Date(FromDate);
    const toDate = new Date(ToDate);

    // Calculate the difference in milliseconds
    const differenceInTime = toDate.getTime() - fromDate.getTime();

    // Calculate the difference in days
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    // Alert the difference
    alert(`The difference between FromDate and ToDate is ${differenceInDays} days.`);
  }

  // Additional logic can be added here if needed
  // For example, triggering updates, alerts, or other functions
};


  return (
    <div className="mt-10">
      <GenericGrid<EmployeeData>
        columns={[
          {
            dataField: 'EmpCode',
            caption: 'Emp Code',
            inputType: 'lookup', // Optional attribute
            dataSource: lookupData, // Optional data source for lookup
            columnMapping={columnMapping} // Pass the column mapping
          },
          { dataField: 'Employee', caption: 'Employee' },
          { dataField: 'CPR', caption: 'CPR' },
          { dataField: 'FromDate', caption: 'From Date', dataType: 'date' },
          { dataField: 'ToDate', caption: 'To Date', dataType: 'date' },
          { dataField: 'NoDays', caption: 'No Days', disabled:true ,formula: 'ToDate - FromDate',  },
          { dataField: 'Entitled', caption: 'Entitled' },
          { dataField: 'Remarks', caption: 'Remarks' },
          { dataField: 'NPBalance', caption: 'NP Balance' },
          {
            dataField: 'LeaveType',
            caption: 'Leave Type',
          },
        ]}
        dataSource={leaveData}
        
        onValueSelect={handleValueSelect}
        lastColumn="LeaveType"
        watchColumns={['FromDate','ToDate']}
        onValuesChange={handleValuesChange}
      />
    </div>
  );
};

export default LeaveManagement;
