import React from 'react';
import GenericGrid from './GenericGrid';
import { leaveType } from './formSchema';

const LeaveManagement = () => {
  const leaveData = [
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
  ];

  const leaveTypeData = [
    {leaveType:'Sick'},
    {leaveType:'Annual'},
  ]

  const columnMapping = {
    EmpCode: 'EmpCode',
    Employee: 'Employee',
    popupColumn3: 'dataGridColumn3',
    CPR : 'CPR',
    NPBalance: 'NPBalance',
    LeaveType:'LeaveType'
  };

  
  const lookupData = [
    { EmpCode: 1, Employee: 'John Doe', CPR: '123456', NPBalance: '10', LeaveType: 'Annual' },
    { EmpCode: 2, Employee: 'Jane Smith', CPR: '654321', NPBalance: '15', LeaveType: 'Sick' },
    { EmpCode: 3, Employee: 'Alice Johnson', CPR: '789012', NPBalance: '8', LeaveType: 'Annual' },
  ];

  const handleValueSelect = (row: any, selectedValue: any) => {
    row.EmpCode = selectedValue.EmpCode;
    row.Employee = selectedValue.Employee;
    row.CPR = selectedValue.CPR;
    row.NPBalance = selectedValue.NPBalance;
    row.LeaveType = selectedValue.LeaveType;
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
          { dataField: 'FromDate', caption: 'From Date' },
          { dataField: 'ToDate', caption: 'To Date' },
          { dataField: 'NoDays', caption: 'No Days' },
          { dataField: 'Entitled', caption: 'Entitled' },
          { dataField: 'Remarks', caption: 'Remarks' },
          { dataField: 'NPBalance', caption: 'NP Balance' },
          {
            dataField: 'LeaveType',
            caption: 'Leave Type',
            // inputType: 'combo', // Optional attribute
            // dataSource: leaveTypeData, // Optional data source for combo
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
