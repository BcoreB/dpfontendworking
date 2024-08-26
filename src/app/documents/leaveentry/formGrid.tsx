import React, { useState } from 'react';
import { DataGrid, Column, Editing } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

// Define the type for a row in the data grid
interface LeaveData {
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
  
  // Adding a blank row when component mounts
  const addEmptyRow = () => {
    const newRow: LeaveData = {
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
    setDataSource([...dataSource, newRow]);
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        keyExpr="EmpCode"
        onRowInserted={addEmptyRow} // Automatically add a new blank row after saving
      >
        <Editing
          mode="row"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          useIcons={true}
        />
        
        <Column dataField="EmpCode" caption="Emp code" />
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
