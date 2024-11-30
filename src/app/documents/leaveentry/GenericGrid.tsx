import React, { useState, useRef, useEffect } from 'react';
import { DataGrid, Column, Editing, Lookup } from 'devextreme-react/data-grid';
import { EditorPreparingEvent } from 'devextreme/ui/data_grid';
import { TextBox } from 'devextreme-react/text-box';
import { Popup } from 'devextreme-react/popup';
import { AiFillCaretDown } from 'react-icons/ai';
import { DateBox } from 'devextreme-react/date-box';
import Button from 'devextreme-react/cjs/button';
import {getLanguageByEnglish} from '@/utils/languages'
import { useDirection } from '@/app/DirectionContext';
import { confirm } from 'devextreme/ui/dialog'; // Import confirm dialog from DevExtreme
interface GridProps<T> {
  columns: {
    dataField: keyof T;
    caption: string;
    inputType?: 'lookup' | 'combo';
    dataSource?: any;
    dataType?: string;
    disabled?: boolean;
    formula?:string,
    columnMapping?: { [key: string]: keyof T }; // Include columnMapping here
  }[];
  dataSource: T[]; // Allow null in the dataSource
  onValueSelect: (updatedData: (T | null)[]) => void;
  lastColumn: keyof T;
  watchColumns?: (keyof T)[];  // Accept new watchColumns prop
  onValuesChange?: (changes: { field: keyof T; currentValues: any[] }) => void; // Add this line
  PopKeyExp?: keyof T | null; // Add keyExp prop
  GridKeyExp?:keyof T | null;
}

interface CellInfo<T> {
  value: any;
  data: T;
  setValue: (newValue: any) => void;
  rowIndex: number;
}

const GenericGrid = <T extends {RowId:number }>({
  columns,
  dataSource: initialDataSource,
  onValueSelect,
  lastColumn,
  PopKeyExp = null, // Default value
  GridKeyExp = null,
  onValuesChange,
  watchColumns = [], // Initialize watchColumns prop
}: GridProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>(initialDataSource);
  useEffect(() => {
    if (PopKeyExp) {
      console.log('PopKeyExp is:', PopKeyExp);
      // Add any logic needed for PopKeyExp
    }
  }, [PopKeyExp]);
  useEffect(() => {
    if (GridKeyExp) {
      console.log('GridKeyExp is:', GridKeyExp);
      // Add any logic needed for PopKeyExp
    }
  }, [GridKeyExp]);

  const [lookupDataSource, setLookupDataSource] = useState<T[]>([]);
  const [filteredLookupDataSource, setFilteredLookupDataSource] = useState<T[]>([]);
  const [showLookupGrid, setShowLookupGrid] = useState<boolean>(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const iconRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef(null); // Ref for the main grid instance

  const [popupFocusedRowIndex, setPopupFocusedRowIndex] = useState<number>(0);


  const addNewRow = () => {
    const isEmptyRowPresent = dataSource.some((row) => {
      return columns.some((column) => {
        if (!column.disabled && column.dataField !== 'RowId') {
          const value = row[column.dataField];
          return value === null || value === '' || value === undefined;
        }
        return false;
      });
    });

    if (!isEmptyRowPresent) {
      const newId = dataSource.length > 0 ? Math.max(...dataSource.map((item) => item.RowId)) + 1 : 1;
      const newRow: Partial<T> = { RowId: newId } as Partial<T>;

      columns.forEach((column) => {
        newRow[column.dataField] = column.dataField === 'RowId' ? (newId as T[keyof T]) : undefined;
      });

      const updatedData = [...dataSource, newRow as T];
      setDataSource(updatedData);
      onValueSelect(updatedData);
    }
  };






const handleEditorPreparing = (e: EditorPreparingEvent<T>) => {
  if (e.parentType === 'dataRow') {

    
    const isLookupColumn = columns.find(
      (column) => column.dataField === e.dataField && column.inputType === 'lookup'
    );
    const isDateColumn = columns.find(
      (column) => column.dataField === e.dataField && column.dataType === 'date'
    );
    if (isDateColumn) {
      e.editorOptions.displayFormat = 'dd/MM/yyyy';
      e.editorOptions.onValueChanged = (args: any) => {
        e.setValue(new Date(args.value));
      };
      
    }

    // Combine date column's original onKeyDown with new functionality
    const originalOnKeyDown = e.editorOptions.onKeyDown;
    e.editorOptions.onKeyDown = (args: { event: KeyboardEvent; component: any }) => {
      // Call the original onKeyDown first to maintain date picker opening behavior
      if (originalOnKeyDown) {
        originalOnKeyDown(args);
      }
      const currentIndex = selectedRowIndex !== null ? selectedRowIndex : 0;

      if (args.event.key === 'ArrowDown') {
        if (isLookupColumn) {
          if (e.row) {
            setSelectedRowIndex(e.row.rowIndex ?? 0); // Ensure rowIndex is valid
          }
          const dataSource = isLookupColumn.dataSource ?? []; // Default to an empty array
          setLookupDataSource(dataSource);
          setFilteredLookupDataSource(dataSource);
          setShowLookupGrid(true);
        }
        
      }

      if (args.event.key === 'ArrowUp') {
        const prevIndex = Math.max(currentIndex - 1, 0);
        setSelectedRowIndex(prevIndex);
        args.event.preventDefault();
      }

      // Check if the Enter key is pressed
      if (args.event.key === 'Enter') {
        if (e.dataField === lastColumn) {
          // Prevent default behavior
          args.event.preventDefault();

          // Add a new row if necessary
          addNewRow();

          // Focus the first column of the next row
          setTimeout(() => {
            (gridRef.current as any)?.editCell(
              currentIndex + 1, // Move to the next row
              0 // Focus the first column
            );
          }, 100); // Slight delay to ensure the row is added
        }
      }
    };
  }
};











// Pop up functions

const handleIconClick = (e: React.MouseEvent, rowIndex: number, columnDataSource?: T[]) => {
  e.stopPropagation();
  setSelectedRowIndex(rowIndex);
  iconRef.current = e.currentTarget as HTMLElement;

  if (columnDataSource) {
    setLookupDataSource(columnDataSource);
    setFilteredLookupDataSource(columnDataSource);
  }

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

    // Find the column with `columnMapping` defined dynamically
    const mappedColumn = columns.find(col => col.columnMapping);
    if (!mappedColumn) return;

    const columnMapping = mappedColumn.columnMapping; // Get columnMapping from the column

    const updatedRow = { ...dataSource[selectedRowIndex] };
    for (const popupColumn in columnMapping) {
      const gridColumn = columnMapping[popupColumn];
      updatedRow[gridColumn] = popupRow[popupColumn];
    }

    const updatedData = dataSource.map((row, index) =>
      index === selectedRowIndex ? updatedRow : row
    );
    setDataSource(updatedData);
    onValueSelect(updatedData);

    // Close the popup
    setShowLookupGrid(false);

  }
};




// Handle the focusedCellChanging event to enable smooth focus movement
const handleFocusedCellChanging = (e: any) => {
  if (e.newRowIndex !== e.rowIndex || e.newColumnIndex !== e.columnIndex) {
    e.isHighlighted = true;
  }
};


  const { isRtl } = useDirection();


  const handlePopupRowClick = (e: any) => {
    const clickedRowIndex = e.rowIndex; // Get the index of the clicked row
    const clickedRowData = e.data; // Get the data of the clicked row
  
    setPopupFocusedRowIndex(clickedRowIndex); // Keep track of the selected row index
    
    console.log('Focused Row Index:', clickedRowIndex);
    console.log('Selected Row Data:', clickedRowData);
  };
  
  // Add keyboard event handler for popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLookupGrid) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); // Prevent default scroll behavior

        setPopupFocusedRowIndex(prevIndex => {
          const maxIndex = filteredLookupDataSource.length - 1;
          if (e.key === 'ArrowDown') {
            return Math.min(prevIndex + 1, maxIndex);
          } else {
            return Math.max(prevIndex - 1, 0);
          }
        });
      }

      // Handle Enter key to select the focused row
      if (e.key === 'Enter' && showLookupGrid) {
        const selectedRow = filteredLookupDataSource[popupFocusedRowIndex];
        if (selectedRow) {
          handleRowDoubleClick({ data: selectedRow });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLookupGrid, filteredLookupDataSource, popupFocusedRowIndex]);

  const [isMobile, setIsMobile] = useState(false);
  // Check if the device is mobile
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);




  const deleteFirstRowAndAddNewRow = () => {
    if (dataSource.length <= 1) {
      // Remove the first row
      const updatedData = dataSource.slice(1);
  
      // Add a new empty row if not already present
      const newId = updatedData.length > 0 ? Math.max(...updatedData.map((item) => item.RowId)) + 1 : 1;
      const newRow: Partial<T> = { RowId: newId } as Partial<T>;
  
      columns.forEach((column) => {
        newRow[column.dataField] =
          column.dataField === 'RowId' ? (newId as T[keyof T]) : undefined as T[keyof T];
      });
  
      // Update the data source
      const finalData = [...updatedData, newRow as T];
      setDataSource(finalData);
      onValueSelect(finalData);
    }
  };
  
  // Hook this function to a delete button or an action triggering the deletion
  const handleDeleteFirstRow = () => {
    deleteFirstRowAndAddNewRow();
  };;
  
  
  return (
    <>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          keyExpr={GridKeyExp}
          onRowRemoving={handleDeleteFirstRow}// Add the row removing handler
          onEditorPreparing={handleEditorPreparing}
          columnHidingEnabled={isMobile}
          repaintChangesOnly={true}
          rtlEnabled={isRtl} // Enable RTL layout for DataGrid
          onContentReady={(e) => {
            // Remove tabIndex from header cells
            const headers = e.element.querySelector('.dx-datagrid-headers');
            if (headers) {
              headers.querySelectorAll('[tabindex]').forEach((header) => {
                header.removeAttribute('tabIndex');
              });
            }
             // Remove tabIndex from delete buttons
              const deleteButtons = e.element.querySelectorAll('.dx-link-delete');
              deleteButtons.forEach((button) => {
                button.removeAttribute('tabIndex'); // Set tabIndex to -1 to remove it from focus order
              });
          }}
        >
          <Editing mode="cell" allowUpdating={true} allowAdding={false} allowDeleting={true} useIcons={true} />

          {columns.map((column) => {
            const isDateColumn = column.dataType === 'date';
            const isLookupColumn = column.inputType === 'lookup';
            const isTimeColumn = column.dataType === 'datetime';
            return (
              <Column
                key={String(column.dataField)}
                dataField={String(column.dataField)}
                caption={getLanguageByEnglish(column.caption)}
                dataType={isDateColumn ? 'date' : isTimeColumn ? 'datetime' : undefined}
                allowEditing={!column.disabled}
                editorOptions={
                  isDateColumn
                  ? {
                      displayFormat: 'dd/MM/yyyy', // Display only the date
                      dateSerializationFormat: 'yyyy-MM-dd', // Serialization ensures no time is included
                      pickerType: 'calendar', // Use calendar for selection
                      format: 'dd/MM/yyyy',
                      openOnFieldClick: true, // Ensure the date picker opens on field click
                      showDropDownButton: true, // Display a dropdown button for date picker
                      onKeyDown: (e:any) => {
                        if (e.event.key === 'ArrowDown') {
                          e.component.open(); // Open the date picker on pressing ArrowDown
                        }
                      },
                    }
                  : 
                  isTimeColumn
                    ? {
                        type: 'datetime',
                        displayFormat: 'yyyy-MM-dd HH:mm:ss', // Display format with seconds
                        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss", // Serialization format
                        placeholder: 'yyyy-MM-dd HH:mm:ss', // Placeholder for guidance
                        mask: '0000-00-00 00:00:00', // Input mask for correct datetime format
                        defaultValue: '0000-00-00 00:00:00', // Set default to '0' value
                      }
                    : {} // No mask applied for non-datetime fields
                }
                cellRender={(cellInfo: CellInfo<T>) => {
                  if (isDateColumn) {
                    return <span>
                      {cellInfo.value
                        ? new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          }).format(new Date(cellInfo.value))
                        : ''}
                  </span>;
                  }else if (isTimeColumn) {
                    return (
                      <span>
                        {cellInfo.value
                          ? new Intl.DateTimeFormat('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            }).format(new Date(cellInfo.value))
                          : '0000-00-00 00:00:00'} {/* Display default '0' value */}
                      </span>
                    );
                  }   else if (isLookupColumn) {
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
          // Find the column with columnMapping
        const mappedColumn = columns.find(col => col.columnMapping);

        // Delay to ensure popup is closed before focusing
        setTimeout(() => {
          if (gridRef.current && selectedRowIndex !== null && mappedColumn) {
            try {
              // Find the index of the specific lookup column
              const lookupColumnIndex = columns.findIndex(
                (col) => col.inputType === 'lookup' && col.dataField === mappedColumn.dataField
              );

              if (lookupColumnIndex !== -1) {
                // Use the grid instance to edit the cell
                (gridRef.current as any).editCell(
                  selectedRowIndex, 
                  lookupColumnIndex
                );
              }
            } catch (error) {
              console.error('Error focusing on lookup column:', error);
            }
          }
        }, 100);
        }}
        title={getLanguageByEnglish("Select Employee")}
        width={600}
        minHeight={250}
        height={'max-content'}
        showCloseButton={true}
        dragEnabled={false}
        position={() => {
          if (!iconRef.current) return;
          
          // Get the DataGrid container element
          const dataGridContainer = iconRef.current.closest('.dx-datagrid');
      
          if (dataGridContainer) {
            const gridRect = dataGridContainer.getBoundingClientRect();
            const iconRect = iconRef.current.getBoundingClientRect();
            const popupWidth = 600;
      
            let my = 'bottom left';
            let at = 'top left';
      
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
          <TextBox
                placeholder={getLanguageByEnglish("Search...")}
                onValueChanged={(e) => handleSearchChange(e.value)}
                className='w-1/2'
              />
              <Button
                text={getLanguageByEnglish("Search")}
                onClick={() => {
                  const input = document.querySelector('.dx-texteditor-input') as HTMLInputElement;
                  if (input) {
                    handleSearchChange(input.value);
                  }
                }}
              />
              <Button
                text={getLanguageByEnglish("Clear")}
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
            keyExpr={PopKeyExp}
            focusedRowIndex={popupFocusedRowIndex}
            focusedRowEnabled={true}
            onRowClick={handlePopupRowClick}
            onRowDblClick={handleRowDoubleClick}
            ref={gridRef} // Attach the ref to the grid
            columnAutoWidth={true}
            style={{ userSelect: 'none', minHeight: '150px' }} // Set minimum height
            rtlEnabled={isRtl}
            focusStateEnabled={false} // Disable default focus handling
            onKeyDown={(e) => e.stopPropagation()} // Prevent event bubbling
          >
            {filteredLookupDataSource.length > 0 &&
              Object.keys(filteredLookupDataSource[0]).map((field) => (
                <Column key={field} dataField={getLanguageByEnglish(field)} />
              ))}
          </DataGrid>

        </div>
      </Popup>
      
      
      )}
    </>
  );
};

export default GenericGrid;