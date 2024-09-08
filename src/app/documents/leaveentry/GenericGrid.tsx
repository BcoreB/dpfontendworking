import React, { useState, useRef } from 'react';
import { DataGrid, Column, Editing, Selection, Lookup } from 'devextreme-react/data-grid';
import { TextBox } from 'devextreme-react/text-box';
import { Popup } from 'devextreme-react/popup';
import { AiFillCaretDown } from 'react-icons/ai';
import { Button } from 'devextreme-react/button';
import { DateBox } from 'devextreme-react/date-box';

interface GridProps<T> {
  columns: {
    dataField: keyof T;
    caption: string;
    inputType?: 'lookup' | 'combo';
    dataSource?: T[];
    dataType?: string;
  }[];
  dataSource: T[];
  onValueSelect: (row: T, selectedValue: T) => void;
  lastColumn: keyof T;
  columnMapping: { [popupColumn: string]: keyof T };
}

interface CellInfo<T> {
  value: any;
  data: T;
  setValue: (newValue: any) => void;
}

const GenericGrid = <T extends { id: number }>({
  columns,
  dataSource: initialDataSource,
  onValueSelect,
  lastColumn,
  columnMapping,
}: GridProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>(initialDataSource);
  const [filteredLookupDataSource, setFilteredLookupDataSource] = useState<T[]>([]);
  const [showLookupGrid, setShowLookupGrid] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<T | null>(null);
  const [selectedPopupRowData, setSelectedPopupRowData] = useState<T | null>(null);
  const iconRef = useRef<HTMLElement | null>(null);

  const addNewRow = () => {
    const newRow: T = {
      id: Math.max(...dataSource.map((item) => item.id)) + 1,
    } as unknown as T;
    setDataSource([newRow, ...dataSource]);
  };

  const handleEditorPreparing = (e: any) => {
    if (e.parentType === 'dataRow' && e.dataField === lastColumn) {
      e.editorOptions.onKeyDown = (args: any) => {
        if (args.event.key === 'Enter') {
          addNewRow();
        }
      };
    }
  };

  const handleIconClick = (e: React.MouseEvent, rowData: T, columnDataSource?: T[]) => {
    e.stopPropagation();
    setSelectedRowData(rowData);
    iconRef.current = e.currentTarget as HTMLElement;

    if (columnDataSource) {
      setFilteredLookupDataSource(columnDataSource);
    }

    setShowLookupGrid(true); // Open the lookup grid popup
  };

  const handleSearchChange = (value: string) => {
    const searchValue = value.toLowerCase();
    const filteredData = filteredLookupDataSource.filter((item: any) => {
      return Object.values(item).some((v) => {
        const stringValue = String(v).toLowerCase();
        return stringValue.includes(searchValue);
      });
    });
    setFilteredLookupDataSource(filteredData);
  };

  const renderCellWithIcon = (cellInfo: CellInfo<T>, columnDataSource?: T[]) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ flexGrow: 1 }}>{cellInfo.value !== undefined ? cellInfo.value : ''}</span>
      <AiFillCaretDown
        style={{ marginLeft: '8px', cursor: 'pointer', flexShrink: 0 }}
        onClick={(e) => handleIconClick(e, cellInfo.data, columnDataSource)}
      />
    </div>
  );

  const handleRowSelection = (e: any) => {
    setSelectedPopupRowData(e.selectedRowsData[0]);
  };

  const handleRowDoubleClick = (e: any) => {
    if (selectedRowData && e.data) {
      const popupRow = e.data;

      // Update the selected row in the main grid using the column mapping
      const updatedRow = { ...selectedRowData };
      for (const popupColumn in columnMapping) {
        const gridColumn = columnMapping[popupColumn];
        updatedRow[gridColumn] = popupRow[popupColumn];
      }

      // Update the data source with the modified row
      setDataSource((prevDataSource) =>
        prevDataSource.map((row) => (row.id === selectedRowData.id ? updatedRow : row))
      );

      setShowLookupGrid(false); // Close the popup
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US').format(new Date(date));
  };

  return (
    <>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          keyExpr="id"
          onEditorPreparing={handleEditorPreparing}
        >
          <Editing mode="cell" allowUpdating={true} allowAdding={false} allowDeleting={true} useIcons={true} />
          
          {columns.map((column) => {
            const isDateColumn = column.dataType === 'date';
            const isLookupColumn = column.inputType === 'lookup';

            return (
              <Column
                key={String(column.dataField)}
                dataField={String(column.dataField)}
                caption={column.caption}
                dataType={isDateColumn ? 'date' : undefined}
                cellRender={(cellInfo: CellInfo<T>) => {
                  if (isDateColumn) {
                    // Render Date
                    return <span>{formatDate(cellInfo.value)}</span>;
                  } else if (isLookupColumn) {
                    // Render Lookup with icon
                    return renderCellWithIcon(cellInfo, column.dataSource);
                  }
                  return <span>{cellInfo.value}</span>;
                }}
              >
                {column.inputType === 'combo' && column.dataSource && (
                  <Lookup dataSource={column.dataSource} valueExpr="EmpCode" displayExpr="Employee" />
                )}
              </Column>
            );
          })}
        </DataGrid>
      </div>

      {showLookupGrid && selectedRowData && (
        <>
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
                ? { my: 'bottom center', at: 'top center', of: iconRef.current }
                : undefined
            }
            style={{ zIndex: 1000 }} // Ensure popup is on top
          >
            <div>
              <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }}>
                <TextBox placeholder="Search..." onValueChanged={(e) => handleSearchChange(e.value)} />
              </div>
              <DataGrid
                dataSource={filteredLookupDataSource}
                showBorders={true}
                selection={{ mode: 'single' }}
                onSelectionChanged={handleRowSelection}
                onRowDblClick={handleRowDoubleClick}
              >
                {filteredLookupDataSource.length > 0 &&
                  Object.keys(filteredLookupDataSource[0]).map((field) => (
                    <Column key={field} dataField={field} />
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
