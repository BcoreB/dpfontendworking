import React, { useState, useRef } from 'react';
import { DataGrid, Column, Editing, Lookup } from 'devextreme-react/data-grid';
import { TextBox } from 'devextreme-react/text-box';
import { Popup } from 'devextreme-react/popup';
import { AiFillCaretDown } from 'react-icons/ai';

interface GridProps<T> {
  columns: {
    dataField: keyof T;
    caption: string;
    inputType?: 'lookup' | 'combo';
    dataSource?: T[];
    dataType?: string;
  }[];
  dataSource: T[];
  onValueSelect: (updatedData: T[]) => void;
  lastColumn: keyof T;
  columnMapping: { [popupColumn: string]: keyof T };
}

interface CellInfo<T> {
  value: any;
  data: T;
  setValue: (newValue: any) => void;
  rowIndex: number;
}

const GenericGrid = <T extends { id: number }>({
  columns,
  dataSource: initialDataSource,
  onValueSelect,
  lastColumn,
  columnMapping,
}: GridProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>(initialDataSource);
  const [lookupDataSource, setLookupDataSource] = useState<T[]>([]);
  const [filteredLookupDataSource, setFilteredLookupDataSource] = useState<T[]>([]);
  const [showLookupGrid, setShowLookupGrid] = useState<boolean>(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [selectedPopupRowData, setSelectedPopupRowData] = useState<T | null>(null);
  const iconRef = useRef<HTMLElement | null>(null);

  const addNewRow = () => {
    // Check if there is an empty row (ignoring the 'id' field)
    const isEmptyRowPresent = dataSource.some((row) => {
      return columns.some((column) => {
        const value = row[column.dataField as keyof T];
        return column.dataField !== 'id' && (value === null || value === undefined || value === '');
      });
    });
  
    // If no empty row exists, add a new row at the bottom
    if (!isEmptyRowPresent) {
      const newId = dataSource.length > 0 ? Math.max(...dataSource.map((item) => item.id)) + 1 : 1;
      const newRow: T = {
        id: newId,
      } as unknown as T;
  
      // Append the new row at the end
      const updatedData = [...dataSource, newRow];
      setDataSource(updatedData);
      onValueSelect(updatedData); // Notify parent component
    }
  };
  
  
  const handleEditorPreparing = (e: any) => {
    if (e.parentType === 'dataRow' && e.dataField === lastColumn) {
      e.editorOptions.onKeyDown = (args: any) => {
        if (args.event.key === 'Enter') {
          // Check if there's any empty row before adding a new one
          const isEmptyRowPresent = dataSource.some((row) => {
            return Object.keys(row).some((key) => key !== 'id') && 
                   Object.values(row).slice(1).every((value) => value === null || value === undefined || value === '');
          });
  
          // Add a new row only if no empty row is present
          if (!isEmptyRowPresent) {
            addNewRow();
          }
        }
      };
    }
  };
  
  

  const handleIconClick = (e: React.MouseEvent, rowIndex: number, columnDataSource?: T[]) => {
    e.stopPropagation();
    setSelectedRowIndex(rowIndex);
    iconRef.current = e.currentTarget as HTMLElement;

    if (columnDataSource) {
      setLookupDataSource(columnDataSource);
      setFilteredLookupDataSource(columnDataSource);
    }

    setShowLookupGrid(true); // Open the lookup grid popup
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

  const renderCellWithIcon = (cellInfo: CellInfo<T>, columnDataSource?: T[]) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ flexGrow: 1 }}>{cellInfo.value !== undefined ? cellInfo.value : ''}</span>
      <AiFillCaretDown
        style={{ marginLeft: '8px', cursor: 'pointer', flexShrink: 0 }}
        onClick={(e) => handleIconClick(e, cellInfo.rowIndex, columnDataSource)}
      />
    </div>
  );

  const handleRowDoubleClick = (e: any) => {
    if (selectedRowIndex !== null && e.data) {
      const popupRow = e.data;

      // Update the selected row in the main grid using the column mapping
      const updatedRow = { ...dataSource[selectedRowIndex] };
      for (const popupColumn in columnMapping) {
        const gridColumn = columnMapping[popupColumn];
        updatedRow[gridColumn] = popupRow[popupColumn];
      }

      // Update the data source with the modified row
      const updatedData = dataSource.map((row, index) =>
        index === selectedRowIndex ? updatedRow : row
      );
      setDataSource(updatedData);
      onValueSelect(updatedData); // Notify parent component

      setShowLookupGrid(false); // Close the popup
    }
  };

  const handleCellValueChanged = (e: any) => {
    const updatedData = [...dataSource];
    updatedData[e.rowIndex][e.column.dataField] = e.value;
    setDataSource(updatedData);
    onValueSelect(updatedData); // Notify parent component
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
          onCellValueChanged={handleCellValueChanged}
          repaintChangesOnly={true}
        >
          <Editing
            mode="cell"
            allowUpdating={true}
            allowAdding={false}
            allowDeleting={true}
            useIcons={true}
          />

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

      {showLookupGrid && (
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
        position={() => {
          if (!iconRef.current) return;
          
          // Get the DataGrid container element
          const dataGridContainer = iconRef.current.closest('.dx-datagrid');
      
          if (dataGridContainer) {
            const gridRect = dataGridContainer.getBoundingClientRect();
            const iconRect = iconRef.current.getBoundingClientRect();
            const popupWidth = 600;
      
            let my = 'bottom left';
            let at = 'bottom left';
      
            // Calculate the popup's horizontal position, ensuring it doesn't exceed DataGrid boundaries
            let left = iconRect.left - popupWidth / 2;
            let rightBoundary = gridRect.right - popupWidth;
      
            // Adjust the popup position if it goes beyond the DataGrid's left or right boundary
            if (left < gridRect.left) {
              left = gridRect.left; // Snap to the left boundary of DataGrid
            } else if (left > rightBoundary) {
              left = rightBoundary; // Snap to the right boundary of DataGrid
            }
      
            return {
              my: my,
              at: at,
              of: iconRef.current,
              offset: { x: left - iconRect.left, y: 0 }, // Adjust offset based on calculated position
            };
          }
      
          return { my: 'bottom center', at: 'top center', of: iconRef.current };
        }}
        style={{ zIndex: 1000, userSelect: 'none' }} // Ensure popup is on top and disable text selection
      >
        <div>
          <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }}>
            <TextBox placeholder="Search..." onValueChanged={(e) => handleSearchChange(e.value)} />
          </div>
          <DataGrid
            dataSource={filteredLookupDataSource}
            showBorders={true}
            selection={{ mode: 'single' }}
            onRowDblClick={handleRowDoubleClick}
            style={{ userSelect: 'none' }} // Disable text selection in the grid
          >
            {filteredLookupDataSource.length > 0 &&
              Object.keys(filteredLookupDataSource[0]).map((field) => (
                <Column key={field} dataField={field} />
              ))}
          </DataGrid>
        </div>
      </Popup>
      
      
      )}
    </>
  );
};

export default GenericGrid;
