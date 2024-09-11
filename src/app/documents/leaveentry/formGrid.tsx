import React, { useEffect, useState } from 'react';
import GenericGrid from './GenericGrid';
import { leaveType } from './formSchema';

const LeaveManagement = ({ data, updateEmployeeData }) => {
  const [leaveData, setLeaveData] = useState([
    {
      id: 0,
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
    { leaveType: 'Sick' },
    { leaveType: 'Annual' },
  ];

  const lookupData = [
    { EmpCode: 1, Employee: 'John Doe', CPR: '123456', NPBalance: '10', LeaveType: 'Annual' },
    { EmpCode: 2, Employee: 'Jane Smith', CPR: '654321', NPBalance: '15', LeaveType: 'Sick' },
    { EmpCode: 3, Employee: 'Alice Johnson', CPR: '789012', NPBalance: '8', LeaveType: 'Annual' },
  ];

  // Update leave data when the incoming prop `data` changes
  useEffect(() => {
    if (data) {
      setLeaveData(data);
    }
  }, [data]);

  const columnMapping = {
    EmpCode: 'EmpCode',
    Employee: 'Employee',
    popupColumn3: 'dataGridColumn3',
    CPR: 'CPR',
    NPBalance: 'NPBalance',
    LeaveType: 'LeaveType',
  };

  const handleValueSelect = (row: any, selectedValue: any) => {
    const updatedRow = {
      ...row,
      EmpCode: selectedValue.EmpCode,
      Employee: selectedValue.Employee,
      CPR: selectedValue.CPR,
      NPBalance: selectedValue.NPBalance,
      LeaveType: selectedValue.LeaveType,
    };
  
    const updatedLeaveData = leaveData.map(r =>
      r.id === row.id ? updatedRow : r
    );
  
    setLeaveData(updatedLeaveData);
    updateEmployeeData(updatedLeaveData); // Update the whole array
  };
  

  return (
    <div className='mt-10'>
      <GenericGrid
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
          { dataField: 'NoDays', caption: 'No Days' },
          { dataField: 'Entitled', caption: 'Entitled' },
          { dataField: 'Remarks', caption: 'Remarks' },
          { dataField: 'NPBalance', caption: 'NP Balance' },
          {
            dataField: 'LeaveType',
            caption: 'Leave Type',
            inputType: 'combo', // Optional attribute
            dataSource: leaveTypeData, // Optional data source for combo
          },
        ]}
        dataSource={leaveData}
        columnMapping={columnMapping} // Pass the column mapping
        onValueSelect={handleValueSelect}
        lastColumn='LeaveType'
      />
    </div>
  );
};

export default LeaveManagement;
