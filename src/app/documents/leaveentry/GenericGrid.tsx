import React, { useState, useRef, useEffect } from 'react';
import { DataGrid, Column, Editing, Lookup } from 'devextreme-react/data-grid';
import { EditorPreparingEvent } from 'devextreme/ui/data_grid';
import { TextBox } from 'devextreme-react/text-box';
import { Popup } from 'devextreme-react/popup';
import { AiFillCaretDown } from 'react-icons/ai';
import Button from 'devextreme-react/cjs/button';
interface GridProps<T> {
  columns: {
    dataField: keyof T;
    caption: string;
    inputType?: 'lookup' | 'combo';
    dataSource?: any;
    dataType?: string;
    disabled?: boolean;
    formula?:string
    columnMapping?: { [key: string]: keyof T }; // Include columnMapping here
  }[];
  dataSource: T[]; // Allow null in the dataSource
  onValueSelect: (updatedData: (T | null)[]) => void;
  lastColumn: keyof T;
  watchColumns?: (keyof T)[];  // Accept new watchColumns prop
  onValuesChange?: (changes: { field: keyof T; currentValues: any[] }) => void; // Add this line
  
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
  
  onValuesChange,
  watchColumns = [], // Initialize watchColumns prop
}: GridProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>(initialDataSource);
  const [lookupDataSource, setLookupDataSource] = useState<T[]>([]);
  const [filteredLookupDataSource, setFilteredLookupDataSource] = useState<T[]>([]);
  const [showLookupGrid, setShowLookupGrid] = useState<boolean>(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const iconRef = useRef<HTMLElement | null>(null);

const addNewRow = () => {
    const isEmptyRowPresent = dataSource.some((row) =>
      columns.some((column) => 
        !column.disabled && column.dataField !== 'id' && (row[column.dataField] === null || row[column.dataField] === '')
      )
    );

    if (!isEmptyRowPresent) {
      const newId = dataSource.length > 0 ? Math.max(...dataSource.map((item) => item.RowId)) + 1 : 1;
      
      
      // Dynamically set up initial values for each column in the new row
      const newRow: Partial<T> = { RowId: newId } as Partial<T>;
      columns.forEach((column) => {
        newRow[column.dataField] = column.dataField === 'RowId' ? (newId as T[keyof T]) : undefined as T[keyof T];
      });
      const updatedData = [...dataSource, newRow as T];
      setDataSource(updatedData);
      onValueSelect(updatedData);
    }
  };



// const handleEditorPreparing = (e: any) => {
//     if (e.parentType === 'dataRow' && e.dataField === lastColumn) {
//       e.editorOptions.onKeyDown = (args: any) => {
//         if (args.event.key === 'Enter') {
//           addNewRow();
//         }
//       };
//     }
//   };



const handleEditorPreparing = (e: EditorPreparingEvent<T>) => {
  if (e.parentType === 'dataRow') {
    // Check if the column being edited is in the watchColumns array
    if (watchColumns.includes(e.dataField as keyof T)) {
      e.editorOptions.onValueChanged = (args: { value: any }) => {
        const rowIndex = e.row?.rowIndex;
        if (rowIndex !== undefined) {
          const updatedData = [...dataSource];
          const updatedRow = { ...updatedData[rowIndex] };

          // Update the field that has changed
          updatedRow[e.dataField as keyof T] = args.value;
          updatedData[rowIndex] = updatedRow;

          // Create an object of key-value pairs where the key is the column and value is the updated value
          const currentValues = watchColumns.reduce((acc, column) => {
            acc[column] = updatedRow[column] || ""; // Assign default empty string if value is undefined
            return acc;
          }, {} as Record<keyof T, any>);

          // Check if all fields in watchColumns are filled (non-empty)
          const allFieldsFilled = watchColumns.every((column) => updatedRow[column]);

          // Only call onValuesChange if all fields in watchColumns are filled
          if (allFieldsFilled) {
            onValuesChange?.({ field: e.dataField as keyof T, currentValues });
          }

          // Update the data source
          setDataSource(updatedData);
          onValueSelect(updatedData);
        }
      };
    }

    // Handle the "Enter" keypress to add a new row
    if (e.dataField === lastColumn) {
      e.editorOptions.onKeyDown = (args: { event: KeyboardEvent }) => {
        if (args.event.key === 'Enter') {
          addNewRow();
        }
      };
    }
  }
};


// const handleEditorPreparing = (e: any) => {
//   const formulaColumns = columns.filter(col => col.formula); // Get all columns with formulas

//   if (e.parentType === 'dataRow' && e.dataField === lastColumn) {
//     e.editorOptions.onKeyDown = (args: any) => {
//       if (args.event.key === 'Enter') {
//         const updatedData = [...dataSource];
//         const currentRow = updatedData[e.row.rowIndex];

//         if (formulaColumns.length > 0) {
//           // Call executeFormulaColumns for all formula columns
//           formulaColumns.forEach((formulaColumn) => {
//             const calculatedValue = executeFormulaColumns([formulaColumn], updatedData, e.row.rowIndex);
//             currentRow[formulaColumn.dataField] = calculatedValue;
//           });
//         }

//         // Update the data source with the modified row
//         updatedData[e.row.rowIndex] = currentRow;
//         setDataSource(updatedData);

//         // Trigger the value select handler with updated data
//         onValueSelect(updatedData);

//         // Add a new row
//         addNewRow();
//       }
//     };
//   }
// };

// const executeFormulaColumns = (
//   formulaColumns: FormulaColumn[],
//   gridData: any[],
//   rowIndex: number
// ) => {
//   let finalValue = null; // Store and return the calculated value

//   if (formulaColumns) {
//     formulaColumns.forEach((fc) => {
//       try {
//         let formula = fc.formula;

//         // Replace placeholders in the formula with the corresponding cell values
//         columns.forEach((col) => {
//           const placeholder = `<${col.dataField}>`;
//           if (formula.includes(placeholder)) {
//             let colVal = gridData[rowIndex][col.dataField];
//             colVal = colVal === null || colVal === undefined || colVal === "" ? "0" : colVal;

//             // No date-specific handling, just replace the placeholder with the value
//             formula = formula.replace(new RegExp(placeholder, "g"), colVal.toString());
//           }
//         });

//         // Evaluate the formula to get the final value
//         finalValue = eval(formula); // Caution: Use eval carefully in real-world applications

//         // Update the corresponding field with the calculated value if it's defined
//         if (finalValue !== null) {
//           gridData[rowIndex][fc.dataField] = finalValue;
//         }
//       } catch (error) {
//         console.error("Error evaluating formula:", error);
//       }
//     });
//   }
//   return finalValue; // Return the calculated value
// };






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

    setShowLookupGrid(false);
  }
};



  return (
    <>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          keyExpr="id"
          onEditorPreparing={handleEditorPreparing}
          
          repaintChangesOnly={true}
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
                allowEditing={!column.disabled}
                cellRender={(cellInfo: CellInfo<T>) => {
                  if (isDateColumn) {
                    return <span>
                    {cellInfo.value ? new Intl.DateTimeFormat('en-US').format(new Date(cellInfo.value)) : ''}
                  </span>;
                  } else if (isLookupColumn) {
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
