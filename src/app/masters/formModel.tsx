"use client"
import React, { useEffect, useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import {
  DataGrid,
  SearchPanel,
  Column,
} from 'devextreme-react/data-grid';

interface ModalProps {
  isVisible: boolean;
  onClose: (data?: any) => void;
  title: string;
  docCd: number;
}

const FormModal: React.FC<ModalProps> = ({ isVisible, onClose, title, docCd }) => {
  const [data, setData] = useState<any[]>([]);
  const [gridKey, setGridKey] = useState(0); // Key for force re-rendering

  useEffect(() => {
    if (isVisible) {
      import(`@/components/menu/data/browser-text/${docCd}.tsx`)
        .then(module => {
          setData(module.default);
          setGridKey(prevKey => prevKey + 1); // Increment key to force re-render
        })
        .catch(error => {
          console.error("Failed to load data:", error);
          setData([]);
        });
    }
  }, [isVisible, docCd]);

  if (!isVisible) return null;

  const handleCellDblClick = (e: any) => {
    const selectedData = e.data;
    onClose(selectedData); // Pass the selected data to the onClose function to update the form
  };

  // Dynamically generate columns based on data keys
  const columns = data.length > 0
    ? Object.keys(data[0]).map((key) => (
        <Column key={`column_${key}`} dataField={key} caption={key} />
      ))
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-5/6 mx-auto">
        <div className="flex modal-header justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={() => onClose()} className="text-white font-bold">X</button>
        </div>
        <div className="mt-4">
          <DataGrid
            key={gridKey} // Use key to force re-render
            columnAutoWidth={true}
            allowColumnReordering={true}
            dataSource={data}
            keyExpr="deptHeadCode"
            onCellDblClick={handleCellDblClick} // Handle double-click on a specific cell
          >
            <SearchPanel visible={true} highlightCaseSensitive={true} />
            {columns} {/* Render the dynamically generated columns */}
          </DataGrid>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
