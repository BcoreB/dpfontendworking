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

  const lookupData = [
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

  const handleValuesChange = (changedValues) => {
    // Alert the updated values
    if (Object.keys(changedValues).length > 0) {


        // Extract FromDate and ToDate from changedValues
        const fromDateValues = changedValues.FromDate;
        const toDateValues = changedValues.ToDate;

        // Check if both FromDate and ToDate have valid values
        if (fromDateValues && toDateValues) {
            const fromDateStr = fromDateValues[0]; // The most recent value for FromDate
            const toDateStr = toDateValues[0]; // The most recent value for ToDate

            // Convert the date strings to Date objects
            const fromDate = new Date(fromDateStr);
            const toDate = new Date(toDateStr);

            // Calculate the difference in milliseconds
            const diffTime = Math.abs(toDate - fromDate); 
            // Convert milliseconds to days
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Alert the difference in days
            alert(`Difference between FromDate and ToDate: ${diffDays} day(s)`);
        }
    }
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
        columnMapping={columnMapping} // Pass the column mapping
        onValueSelect={handleValueSelect}
        lastColumn="LeaveType"
        watchColumns={['FromDate','ToDate']}
        onValuesChange={handleValuesChange}
      />
    </div>
  );
};

export default LeaveManagement;
