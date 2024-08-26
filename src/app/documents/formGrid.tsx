import React, { useState } from 'react';
import { DataGrid, Column, Editing, Popup, Form as DxForm, Item } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

// Define the type for a row in the data grid
interface LeaveData {
  EmpCode: number;
  Employee: string;
  CPR: string;
  FromDate: string;
  ToDate: string;
  NoDays: number;
  Entitled: number;
  Remarks: string;
  NPBalance: string | null;
  LeaveType: string | null;
}

const LeaveManagementGrid: React.FC = () => {
  const [dataSource, setDataSource] = useState<LeaveData[]>([
    { EmpCode: 11376, Employee: 'HUNTER BROCK', CPR: '139503282', FromDate: '01/08/2024', ToDate: '03/08/2024', NoDays: 3, Entitled: 0, Remarks: '11', NPBalance: null, LeaveType: null },
    { EmpCode: 14323, Employee: 'BROOKLYNN FERGUSON', CPR: '1845863238', FromDate: '05/08/2024', ToDate: '11/08/2024', NoDays: 7, Entitled: 0, Remarks: '1fds', NPBalance: '3.00', LeaveType: null },
  ]);

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        keyExpr="EmpCode"
      >
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup title="Edit Leave" showTitle={true} width={700} height={525} />
          <DxForm>
            <Item dataField="EmpCode" />
            <Item dataField="Employee" />
            <Item dataField="CPR" />
            <Item dataField="FromDate" editorType="dxDateBox" />
            <Item dataField="ToDate" editorType="dxDateBox" />
            <Item dataField="NoDays" />
            <Item dataField="Entitled" />
            <Item dataField="Remarks" />
            <Item dataField="NPBalance" />
            <Item dataField="LeaveType" />
          </DxForm>
        </Editing>

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
