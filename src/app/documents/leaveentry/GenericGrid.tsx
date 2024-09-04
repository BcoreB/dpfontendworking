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
}

const GenericGrid = <T extends { id: number }>({ 
  columns, 
  popupColumns, 
  dataSource: initialDataSource, 
  lookupDataSource, 
  onValueSelect 
}: GridProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>(initialDataSource);
  const [filteredLookupDataSource, setFilteredLookupDataSource] = useState(lookupDataSource);
  const [showLookupGrid, setShowLookupGrid] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<T | null>(null);
  const iconRef = useRef<HTMLElement | null>(null);

  const handleIconClick = (e: React.MouseEvent, rowData: T) => {
    e.stopPropagation();
    setSelectedRowData(rowData);
    iconRef.current = e.currentTarget as HTMLElement;
    setShowLookupGrid(true);
  };

  const handleSearchChange = (value: string) => {
    if (value) {
      const filteredData = lookupDataSource.filter((emp: any) =>
        Object.values(emp).some(v => String(v).toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredLookupDataSource(filteredData);
    } else {
      setFilteredLookupDataSource(lookupDataSource);
    }
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
    <div style={{ width: '100%', margin: '0 auto' }}>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        keyExpr="id"
      >
        <Editing mode="cell" allowUpdating={true} allowAdding={false} allowDeleting={true} useIcons={true} />
        {columns.map(column => (
          <Column
            key={String(column.dataField)}
            dataField={String(column.dataField)}
            caption={column.caption}
            cellRender={column.dataField === 'EmpCode' ? renderCellWithIcon : undefined}
          />
        ))}
      </DataGrid>

      {showLookupGrid && selectedRowData && (
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
          position={iconRef.current ? { my: 'top left', at: 'bottom left', of: iconRef.current } : undefined}
        >
          <div>
            <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }}>
              <TextBox
                placeholder="Search..."
                onValueChanged={(e) => handleSearchChange(e.value)}
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
              {popupColumns.map(column => (
                <Column key={String(column.dataField)} dataField={String(column.dataField)} caption={column.caption} />
              ))}
            </DataGrid>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default GenericGrid;
