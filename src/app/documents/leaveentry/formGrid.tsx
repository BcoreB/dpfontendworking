import React, { useState, useRef } from 'react';
import { DataGrid, Column, Editing } from 'devextreme-react/data-grid';
import { TextBox } from 'devextreme-react/text-box';
import { Popup } from 'devextreme-react/popup';
import { AiFillCaretDown } from 'react-icons/ai'; // Modern down arrow icon
import Button from 'devextreme-react/button';

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

  const [nextId, setNextId] = useState<number>(1);
  const [lookupDataSource, setLookupDataSource] = useState([
    { EmpCode: 1, Employee: 'John Doe', CPR: '123456', NPBalance: '10', LeaveType: 'Annual' },
    { EmpCode: 2, Employee: 'Jane Smith', CPR: '654321', NPBalance: '15', LeaveType: 'Sick' },
    { EmpCode: 3, Employee: 'Alice Johnson', CPR: '789012', NPBalance: '8', LeaveType: 'Annual' },
    { EmpCode: 4, Employee: 'Peter Parker', CPR: '789012', NPBalance: '8', LeaveType: 'Annual' },
    { EmpCode: 5, Employee: 'Wanda Vision', CPR: '789012', NPBalance: '8', LeaveType: 'Annual' },
  ]);

  const [filteredLookupDataSource, setFilteredLookupDataSource] = useState(lookupDataSource);

  const [showLookupGrid, setShowLookupGrid] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<LeaveData | null>(null);

  // Ref to store the icon element
  const iconRef = useRef<HTMLElement | null>(null);

  const handleValueSelect = (value: number) => {
    if (selectedRowData) {
      const selectedData = lookupDataSource.find(emp => emp.EmpCode === value);
      if (selectedData) {
        selectedRowData.EmpCode = selectedData.EmpCode;
        selectedRowData.Employee = selectedData.Employee;
        selectedRowData.CPR = selectedData.CPR;
        selectedRowData.NPBalance = selectedData.NPBalance;
        selectedRowData.LeaveType = selectedData.LeaveType;
        setDataSource([...dataSource]); // Trigger re-render
      }
      setShowLookupGrid(false);
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
    setDataSource([newRow, ...dataSource]);
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

  const handleSearchChange = (value: string) => {
    if (value) {
      const filteredData = lookupDataSource.filter(emp =>
        emp.Employee.toLowerCase().includes(value.toLowerCase()) ||
        emp.CPR.toLowerCase().includes(value.toLowerCase()) ||
        emp.NPBalance.toLowerCase().includes(value.toLowerCase()) ||
        emp.LeaveType.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLookupDataSource(filteredData);
    } else {
      setFilteredLookupDataSource(lookupDataSource);
    }
  };

  const renderEmpCodeCell = (cellInfo: any) => {
    const handleIconClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering any cell click
      setSelectedRowData(cellInfo.data);

      // Set the icon reference to position the popup
      iconRef.current = e.currentTarget as HTMLElement;

      setShowLookupGrid(true);
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ flexGrow: 1 }}>{cellInfo.value !== undefined ? cellInfo.value : ''}</span>
        <AiFillCaretDown
          style={{ marginLeft: '8px', cursor: 'pointer', flexShrink: 0 }}
          onClick={handleIconClick}
        />
      </div>
    );
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        keyExpr="id"
        onEditorPreparing={handleEditorPreparing}
        // Removed onCellClick to handle popup only via icon click
      >
        <Editing
          mode="cell"
          allowUpdating={true}
          allowAdding={false}
          allowDeleting={true}
          useIcons={true}
        />
        <Column dataField="EmpCode" caption="Emp Code" cellRender={renderEmpCodeCell} />
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

      {showLookupGrid && (
        <Popup
          visible={true}
          onHiding={() => {
            setShowLookupGrid(false);
            iconRef.current = null; // Clear the ref when popup hides
          }}
          title="Select Employee"
          width={600}
          height={'max-content'}
          showCloseButton={true}
          // Position the popup relative to the icon
          position={iconRef.current ? { my: 'top left', at: 'bottom left', of: iconRef.current } : undefined}
        >
          <div>
            <div style={{ display: 'flex', marginBottom: '10px', justifyContent:'space-between' }}>
              <TextBox
                placeholder="Search..."
                onValueChanged={(e) => handleSearchChange(e.value)}
                className='w-1/2'
              />
              <Button
                text="Search"
                onClick={() => {
                  const input = document.querySelector('.dx-texteditor-input') as HTMLInputElement;
                  if (input) {
                    handleSearchChange(input.value);
                  }
                }}
              />
              <Button
                text="Clear"
                style={{background:'red', fontWeight:600,}}
                onClick={() => {
                  const input = document.querySelector('.dx-texteditor-input') as HTMLInputElement;
                  if (input) {
                    input.value = '';
                    handleSearchChange('');
                  }
                }}
              />
            </div>
            <DataGrid
              dataSource={filteredLookupDataSource}
              showBorders={true}
              onRowClick={(e: any) => handleValueSelect(e.data.EmpCode)}
            >
              <Column dataField="EmpCode" caption="Emp Code" />
              <Column dataField="Employee" caption="Employee" />
              <Column dataField="CPR" caption="CPR" />
              <Column dataField="NPBalance" caption="NP Balance" />
              <Column dataField="LeaveType" caption="Leave Type" />
            </DataGrid>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default LeaveManagementGrid;
