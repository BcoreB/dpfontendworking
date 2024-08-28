import React, { useState } from 'react';
import { DataGrid, Column, Editing } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

// Define the type for a row in the data grid
interface LeaveData {
  id: number; // Unique identifier for each row
  EmpCode: number | null;
  Employee: string | null;
  CPR: string | null;
  FromDate: string | null;
  ToDate: string | null;
  NoDays: number | null;
  Entitled: number | null;
  Remarks: string | null;
  NPBalance: string | null;
  LeaveType: string | null;
}

const LeaveManagementGrid: React.FC = () => {
  const [dataSource, setDataSource] = useState<LeaveData[]>([]);
  const [nextId, setNextId] = useState<number>(1); // Track the next id for new rows

  // Example data for the Lookup grid
  const empDataSource = [
    { EmpCode: 1, Employee: 'John Doe', CPR: '123456', NPBalance: '10', LeaveType: 'Annual' },
    { EmpCode: 2, Employee: 'Jane Smith', CPR: '654321', NPBalance: '15', LeaveType: 'Sick' },
    { EmpCode: 3, Employee: 'Alice Johnson', CPR: '789012', NPBalance: '8', LeaveType: 'Annual' },
    // Add more employee data as needed
  ];

  // Handle selection change in the Lookup to populate other fields
  const handleSelectionChange = (selectedData: any) => {
    const newRow: LeaveData = {
      id: nextId,
      EmpCode: selectedData.EmpCode,
      Employee: selectedData.Employee,
      CPR: selectedData.CPR,
      FromDate: null,
      ToDate: null,
      NoDays: null,
      Entitled: null,
      Remarks: null,
      NPBalance: selectedData.NPBalance,
      LeaveType: selectedData.LeaveType,
    };
    setDataSource([...dataSource, newRow]);
    setNextId(nextId + 1); // Increment id for the next new row
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        keyExpr="id"  // Ensure a unique key expression
        onRowInserted={() => {
          // Ensure a new row is added to the dataSource when a new row is inserted
        }}
        onEditorPreparing={(e) => {
          if (e.dataField === 'EmpCode') {
            e.editorOptions.dataSource = empDataSource;
            e.editorOptions.valueExpr = 'EmpCode';
            e.editorOptions.displayExpr = 'EmpCode';
            e.editorOptions.showDropDownButton = true;
            e.editorOptions.searchEnabled = true;

            e.editorOptions.columns = [
              { dataField: 'EmpCode', caption: 'Emp Code' },
              { dataField: 'Employee', caption: 'Employee' },
              { dataField: 'CPR', caption: 'CPR' },
              { dataField: 'NPBalance', caption: 'NP Balance' },
              { dataField: 'LeaveType', caption: 'Leave Type' },
            ];

            e.editorOptions.onValueChanged = (args: any) => {
              const selectedData = empDataSource.find(
                (emp) => emp.EmpCode === args.value
              );
              if (selectedData) {
                handleSelectionChange(selectedData);
              }
            };
          }
        }}
      >
        <Editing
          mode="cell"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          useIcons={true}
        />

        <Column
          dataField="EmpCode"
          caption="Emp code"
          setCellValue={(rowData: LeaveData, value: number) => {
            const selectedData = empDataSource.find(emp => emp.EmpCode === value);
            if (selectedData) {
              rowData.EmpCode = selectedData.EmpCode;
              rowData.Employee = selectedData.Employee;
              rowData.CPR = selectedData.CPR;
              rowData.NPBalance = selectedData.NPBalance;
              rowData.LeaveType = selectedData.LeaveType;
            }
          }}
          lookup={{
            dataSource: empDataSource,
            valueExpr: 'EmpCode',
            displayExpr: 'EmpCode',
          }}
        />

        <Column dataField="Employee" caption="Employee" />
        <Column dataField="CPR" caption="CPR" />
        <Column dataField="FromDate" caption="From Date" dataType="date" />
        <Column dataField="ToDate" caption="To Date" dataType="date" />
        <Column dataField="NoDays" caption="No Days" />
        <Column dataField="Entitled" caption="Entitled" />
        <Column dataField="Remarks" caption="Remarks" />
        <Column dataField="NPBalance" caption="NP Balance" />
        <Column dataField="LeaveType" caption="Leave Type" />
      </DataGrid>
    </div>
  );
};

export default LeaveManagementGrid;
