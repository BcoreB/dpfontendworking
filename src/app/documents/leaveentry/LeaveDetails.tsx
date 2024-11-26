import React, { useEffect, useState } from 'react';
import GenericGrid from './GenericGrid';

interface EmployeeData {
  id: string;
  EmpCode: string | null;
  Employee: string | null;
  CPR: string | null;
  FromDate: Date | null;
  ToDate: Date | null;
  NoDays: number | null;
  Entitled: string | null;
  Remarks: string | null;
  NPBalance: string | null;
  LeaveType: string | null;
  RowId:number;
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
      id: "1",
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
      RowId:0,
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

  const handleValueSelect = (updatedData: any) => {
    setLeaveData(updatedData);
    updateEmployeeData(updatedData);
  };



const handleValuesChange = (changedValues:any) => {
  const { FromDate, ToDate } = changedValues.currentValues;

  if (FromDate && ToDate) {
    const fromDate = new Date(FromDate);
    const toDate = new Date(ToDate);

    const differenceInTime = toDate.getTime() - fromDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    alert(`The difference between FromDate and ToDate is ${differenceInDays} days.`);
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
            columnMapping: { // Pass column mapping directly within EmpCode column
              EmpCode: 'EmpCode',
              Employee: 'Employee',
              CPR: 'CPR',
              NPBalance: 'NPBalance',
              LeaveType: 'LeaveType',
            },
          },
          { dataField: 'Employee', caption: 'Employee' },
          { dataField: 'CPR', caption: 'CPR' },
          { dataField: 'FromDate', caption: 'From Date', dataType: 'date', },
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
        PopKeyExp="EmpCode"
        // GridKeyExp = "EmpCode"
      />
    </div>
  );
};

export default LeaveManagement;
