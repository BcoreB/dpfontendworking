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
    disabled?: boolean;
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
  const iconRef = useRef<HTMLElement | null>(null);

  const addNewRow = () => {
    const isEmptyRowPresent = dataSource.some((row) =>
      columns.some((column) => 
        !column.disabled && column.dataField !== 'id' && (row[column.dataField] === null || row[column.dataField] === '')
      )
    );

    if (!isEmptyRowPresent) {
      const newId = dataSource.length > 0 ? Math.max(...dataSource.map((item) => item.id)) + 1 : 1;
      const newRow: Partial<T> = { id: newId } as Partial<T>;
      
      // Dynamically set up initial values for each column in the new row
      columns.forEach((column) => {
        newRow[column.dataField] = column.dataField === 'id' ? newId : null;
      });

      const updatedData = [...dataSource, newRow as T];
      setDataSource(updatedData);
      onValueSelect(updatedData);
    }
  };

  // const handleEditorPreparing = (e: any) => {
  //   if (e.parentType === 'dataRow' && e.dataField === lastColumn) {
  //     e.editorOptions.onKeyDown = (args: any) => {
  //       if (args.event.key === 'Enter') {
  //         addNewRow();
  //       }
  //     };
  //   }
  // };

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

  const calculateAmount = (price: number | null, count: number | null) => {
    return (price ?? 0) * (count ?? 0);
  };

//   const handleCellValueChanged = (e: any) => {
//     const updatedData = [...dataSource];
//     const updatedRow = { ...updatedData[e.rowIndex], [e.column.dataField]: e.value };

//     if (e.column.dataField === 'Price' || e.column.dataField === 'Count') {
//         // Get the new Price and Count values
//         const price = updatedRow['Price'] ?? 0;
//         const count = updatedRow['Count'] ?? 0;

//         // Calculate and update the Amount field
//         updatedRow['Amount'] = price * count;
//     }

//     // Update the row in the data source
//     updatedData[e.rowIndex] = updatedRow;
//     setDataSource(updatedData);

//     // Call the value select handler with the updated data
//     onValueSelect(updatedData);
// };

const handleEditorPreparing = (e: any) => {
  // Find the column with the formula
  const formulaColumn = columns.find(col => col.formula);

  if (e.parentType === 'dataRow' && e.dataField === lastColumn) {
    e.editorOptions.onKeyDown = (args: any) => {
      if (args.event.key === 'Enter') {
        const updatedData = [...dataSource];
        const currentRow = updatedData[e.row.rowIndex];

        if (formulaColumn && formulaColumn.formula) {
          const formula = formulaColumn.formula; // Get the formula, e.g., "Price * Count"

          // Extract field names (like Price, Count) from the formula
          const formulaFields = formula.match(/[a-zA-Z]+/g);
          let calculatedValue = formula;

          // Replace the field names with their corresponding values from the row
          formulaFields.forEach(field => {
            const fieldValue = currentRow[field] ?? 0;
            calculatedValue = calculatedValue.replace(new RegExp(field, 'g'), fieldValue);
          });

          // Evaluate the calculated expression
          try {
            // Use the dataField of the formula column to dynamically assign the calculated value
            currentRow[formulaColumn.dataField] = eval(calculatedValue);
          } catch (error) {
            currentRow[formulaColumn.dataField] = 'NaN';
          }
        }

        // Update the data source with the modified row
        updatedData[e.row.rowIndex] = currentRow;
        setDataSource(updatedData);

        // Trigger the value select handler with updated data
        onValueSelect(updatedData);

        // Add a new row
        addNewRow();
      }
    };
  }
};



const handleCellValueChanged = (e: any) => {
  const updatedData = [...dataSource];
  const updatedRow = { ...updatedData[e.rowIndex], [e.column.dataField]: e.value };

  // Find the column that has the formula prop
  const formulaColumn = columns.find(col => col.formula);

  if (formulaColumn) {
    const formula = formulaColumn.formula; // e.g., 'Price * Count' or 'EndDate - StartDate'

    // Extract the field names from the formula
    const formulaFields = formula.match(/[a-zA-Z]+/g);

    // Dynamically update the fields involved in the formula
    let calculatedValue = formula;

    formulaFields.forEach(field => {
      let fieldValue = updatedRow[field] ?? 0;

      // Check if the field is a date, convert it to a Date object
      if (isDateField(field)) {
        console.log(`Converting ${field} to Date:`, updatedRow[field]);
        fieldValue = new Date(updatedRow[field]);
        console.log(`Converted ${field} to Date object:`, fieldValue);
      }

      calculatedValue = calculatedValue.replace(new RegExp(field, 'g'), fieldValue);
    });

    console.log('Calculated Value After Replacements:', calculatedValue);

    // Handle date calculations separately
    if (formulaColumn.dataField === 'NoDays') {
      const startDate = new Date('2025-07-19'); // YYYY-MM-DD format
      const endDate = new Date('2025-07-25');   // YYYY-MM-DD format

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Invalid dates:', startDate, endDate);
        updatedRow['NoDays'] = 'Invalid Dates';
      } else {
        const diffInTime = endDate.getTime() - startDate.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24); // Difference in days

        console.log('Difference in Time:', diffInTime);
        console.log('Difference in Days:', diffInDays);
        updatedRow[formulaColumn.dataField] = diffInDays;
      }
    } else {
      // Evaluate the calculated expression for non-date formulas
      try {
        updatedRow[formulaColumn.dataField] = eval(calculatedValue);
        
      } catch (error) {
        console.error('Error evaluating formula:', error);
        updatedRow[formulaColumn.dataField] = 'NaN';
      }
    }
  }

  // Update the row in the data source
  updatedData[e.rowIndex] = updatedRow;
  setDataSource(updatedData);

  // Call the value select handler with updated data
  onValueSelect(updatedData);
};

// Helper function to identify date fields
const isDateField = (field: string) => {
  // Assuming your column definitions have a type property, you can check if it's a date type
  const column = columns.find(col => col.dataField === field);
  return column?.dataType === 'date';
};

// Helper function to determine if the formula involves date fields
const isDateFormula = (fields: string[]) => {
  return fields.every(isDateField);
};


  return (
    <>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          keyExpr="id"
          onEditorPreparing={handleEditorPreparing}
          onCellValueChanged={handleCellValueChanged} // This is crucial for tracking changes
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
