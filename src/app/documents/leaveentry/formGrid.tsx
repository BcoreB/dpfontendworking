import React, { useState } from 'react';
import { DataGrid, Column, Editing } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

interface LeaveData {
  id: number;
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
  const [dataSource, setDataSource] = useState<LeaveData[]>([
    {
      id: 0, // Default blank row with id 0
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
  const [nextId, setNextId] = useState<number>(1);

  const empDataSource = [
    { EmpCode: 1, Employee: 'John Doe', CPR: '123456', NPBalance: '10', LeaveType: 'Annual' },
    { EmpCode: 2, Employee: 'Jane Smith', CPR: '654321', NPBalance: '15', LeaveType: 'Sick' },
    { EmpCode: 3, Employee: 'Alice Johnson', CPR: '789012', NPBalance: '8', LeaveType: 'Annual' },
  ];

  const handleValueSelect = (rowData: LeaveData, value: number) => {
    const selectedData = empDataSource.find(emp => emp.EmpCode === value);
    if (selectedData) {
      rowData.EmpCode = selectedData.EmpCode;
      rowData.Employee = selectedData.Employee;
      rowData.CPR = selectedData.CPR;
      rowData.NPBalance = selectedData.NPBalance;
      rowData.LeaveType = selectedData.LeaveType;
    }
  };

  const addNewRow = () => {
    const newRow: LeaveData = {
      id: nextId,
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
    };
    setDataSource([newRow, ...dataSource]); // Prepend the new row to the top
    setNextId(nextId + 1);
  };

  const handleEditorPreparing = (e: any) => {
    if (e.parentType === 'dataRow' && e.dataField === 'LeaveType') {
      e.editorOptions.onKeyDown = (args: any) => {
        if (args.event.key === 'Enter') {
          addNewRow();
        }
      };
    }
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        keyExpr="id"
        onEditorPreparing={handleEditorPreparing}
      >
        <Editing
          mode="cell"
          allowUpdating={true}
          allowAdding={false}  // Disable adding new rows via the "+" button
          allowDeleting={true}
          useIcons={true}
        />

        <Column
          dataField="EmpCode"
          caption="Emp code"
          setCellValue={(rowData: LeaveData, value: number) => {
            handleValueSelect(rowData, value);
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
        <Column
          dataField="LeaveType"
          caption="Leave Type"
        />
      </DataGrid>
    </div>
  );
};

export default LeaveManagementGrid;
