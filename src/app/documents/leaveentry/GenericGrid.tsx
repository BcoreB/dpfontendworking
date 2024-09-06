import React, { useState, useRef } from 'react';
import { DataGrid, Column, Editing } from 'devextreme-react/data-grid';
import { TextBox } from 'devextreme-react/text-box';
import { Popup } from 'devextreme-react/popup';
import { AiFillCaretDown } from 'react-icons/ai';
import Button from 'devextreme-react/button';

interface GridProps<T> {
  columns: { dataField: keyof T, caption: string }[];
  popupColumns: { dataField: keyof T, caption: string }[];
  dataSource: T[];
  lookupDataSource: T[];
  onValueSelect: (row: T, selectedValue: T) => void;
  lastColumn: keyof T; // Prop for the last column
}

const GenericGrid = <T extends { id: number }>({
  columns,
  popupColumns,
  dataSource: initialDataSource,
  lookupDataSource,
  onValueSelect,
  lastColumn, // Destructure lastColumn prop
}: GridProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>(initialDataSource);
  const [filteredLookupDataSource, setFilteredLookupDataSource] = useState(lookupDataSource);
  const [showLookupGrid, setShowLookupGrid] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<T | null>(null);
  const iconRef = useRef<HTMLElement | null>(null);

  const addNewRow = () => {
    const newRow: T = {
      id: Math.max(...dataSource.map((item) => item.id)) + 1, // Generate new unique ID
    } as unknown as T;
    setDataSource([newRow, ...dataSource]); // Add the new row to the top
  };

  const handleEditorPreparing = (e: any) => {
    if (e.parentType === 'dataRow' && e.dataField === lastColumn) {
      e.editorOptions.onKeyDown = (args: any) => {
        if (args.event.key === 'Enter') {
          addNewRow(); // Call the function to add a new row when Enter is pressed
        }
      };
    }
  };

  const handleIconClick = (e: React.MouseEvent, rowData: T) => {
    e.stopPropagation();
    setSelectedRowData(rowData);
    iconRef.current = e.currentTarget as HTMLElement;
    setShowLookupGrid(true);
  };

  const handleSearchChange = (value: string) => {
    const searchValue = value.toLowerCase();
    const filteredData = lookupDataSource.filter((item: any) => {
      return Object.values(item).some((v) => {
        const stringValue = String(v).toLowerCase();
        return stringValue.includes(searchValue);
      });
    });
    setFilteredLookupDataSource(filteredData);
  };

  const renderCellWithIcon = (cellInfo: any) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ flexGrow: 1 }}>{cellInfo.value !== undefined ? cellInfo.value : ''}</span>
      <AiFillCaretDown
        style={{ marginLeft: '8px', cursor: 'pointer', flexShrink: 0 }}
        onClick={(e) => handleIconClick(e, cellInfo.data)}
      />
    </div>
  );

  return (
    <>
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          pointerEvents: showLookupGrid ? 'none' : 'auto', // Disable all background elements when popup is open
        }}
      >
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          keyExpr="id"
          onEditorPreparing={handleEditorPreparing} // Attach the event handler
        >
          <Editing mode="cell" allowUpdating={true} allowAdding={false} allowDeleting={true} useIcons={true} />
          {columns.map((column) => (
            <Column
              key={String(column.dataField)}
              dataField={String(column.dataField)}
              caption={column.caption}
              cellRender={column.dataField === 'EmpCode' ? renderCellWithIcon : undefined}
            />
          ))}
        </DataGrid>
      </div>

      {showLookupGrid && selectedRowData && (
        <>
          {/* Modal Overlay */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent overlay
              zIndex: 999, // Ensure it's above everything
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing popup when clicking on overlay
            }}
          />
          {/* Popup as Modal */}
          <Popup
            visible={true}
            onHiding={() => {
              setShowLookupGrid(false);
              iconRef.current = null;
            }}
            title="Select Employee"
            width={600}
            height={'max-content'}
            showCloseButton={true}
            dragEnabled={true}
            position={
              iconRef.current
                ? { my: 'bottom center', at: 'top center', of: iconRef.current } // Position above the icon
                : undefined
            }
            style={{ zIndex: 1000 }}
          >
            <div>
              <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }}>
                <TextBox placeholder="Search..." onValueChanged={(e) => handleSearchChange(e.value)} />
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
                  style={{ background: 'red', fontWeight: 600 }}
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
                onRowClick={(e: any) => {
                  onValueSelect(selectedRowData, e.data);
                  setDataSource([...dataSource]);
                  setShowLookupGrid(false);
                }}
              >
                {popupColumns.map((column) => (
                  <Column key={String(column.dataField)} dataField={String(column.dataField)} caption={column.caption} />
                ))}
              </DataGrid>
            </div>
          </Popup>
        </>
      )}
    </>
  );
};

export default GenericGrid;
