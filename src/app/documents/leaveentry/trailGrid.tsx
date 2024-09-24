import React, { useEffect, useState } from 'react';
import GenericGrid from './GenericGridTrail';

interface EmployeeData {
  id: number;
  EmpCode: number | null;
  Employee: string | null;
  CPR: string | null;
  Price: number | null;
  Count: number | null;
  Amount: number | null;
  Entitled: string | null;
  Remarks: string | null;
  NPBalance: string | null;
  LeaveType: string | null;
  FromDate:Date|null;
  ToDate:Date|null,
  NoDays:number|null,
}

interface LeaveManagementProps {
  data: EmployeeData[];
  updateEmployeeData: (updatedData: EmployeeData[]) => void;
}

const TrailManagement = ({ data, updateEmployeeData }: LeaveManagementProps) => {
  const [leaveData, setLeaveData] = useState<EmployeeData[]>([
    {
      id: 1,
      EmpCode: null,
      Employee: null,
      CPR: null,
      Price: null,
      Count: null,
      Amount: null,
      Entitled: null,
      Remarks: null,
      NPBalance: null,
      LeaveType: null,
      FromDate:null,
      ToDate:null,
      NoDays:null,
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
  useEffect(() => {
    setLeaveData(data);  // Update leave data when the parent data changes
  }, [data]);

  // Update leave data when the incoming prop `data` changes
  useEffect(() => {
    if (data && data.length > 0) {
      setLeaveData(data);
    }
  }, [data]);

  // Formula to calculate the Amount
  const calculateAmount = (price: number | null, count: number | null) => {
    return (price || 0) * (count || 0);
  };

  const handleValueSelect = (updatedData: EmployeeData[]) => {
    // Update Amount for each row based on Price * Count
    const newData = updatedData.map((item) => ({
      ...item,
      Amount: calculateAmount(item.Price, item.Count),
    }));
    setLeaveData(newData);
    updateEmployeeData(newData);
  };

  const columnMapping = {
    EmpCode: 'EmpCode',
    Employee: 'Employee',
    CPR: 'CPR',
    NPBalance: 'NPBalance',
    LeaveType: 'LeaveType',
  };

  return (
    <div className="mt-10">
      <GenericGrid<EmployeeData>
        columns={[
          {
            dataField: 'EmpCode',
            caption: 'Emp Code',
            inputType: 'lookup',
            dataSource: lookupData,
          },
          { dataField: 'Employee', caption: 'Employee' },
          { dataField: 'CPR', caption: 'CPR' },
          { dataField: 'Price', caption: 'Price' },
          { dataField: 'Count', caption: 'Count' },
          {
            dataField: 'Amount',
            caption: 'Amount',
            disabled: true, // Disable the Amount field
            formula: '<Price> * <Count>',
          },
          { dataField: 'Entitled', caption: 'Entitled' },
          { dataField: 'Remarks', caption: 'Remarks' },
          { dataField: 'NPBalance', caption: 'NP Balance' },
          { dataField: 'LeaveType', caption: 'Leave Type' },
          { dataField: 'FromDate', caption: 'From Date', dataType: 'date' },
          { dataField: 'ToDate', caption: 'To Date', dataType: 'date' },
          { dataField: 'NoDays', caption: 'No Days', disabled:true ,formula: 'ToDate - FromDate',  },
        ]}
        dataSource={leaveData}
        columnMapping={columnMapping}
        onValueSelect={handleValueSelect}
        lastColumn="LeaveType"
      />
    </div>
  );
};

export default TrailManagement;
