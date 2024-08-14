// Modal.tsx
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
  onClose: () => void;
  title: string;
  docCd: number; // Add docCd prop
}

const FormModal: React.FC<ModalProps> = ({ isVisible, onClose, title, docCd }) => {
  const [data, setData] = useState<any[]>([]); // Store fetched data

  useEffect(() => {
    if (isVisible) {
      // Dynamically import the data file based on docCd
      import(`@/components/menu/data/${docCd}.tsx`)
        .then(module => setData(module.default))
        .catch(error => {
          console.error("Failed to load data:", error);
          setData([]); // Handle the error case
        });
    }
  }, [isVisible, docCd]);

  if (!isVisible) return null;

  const handleRowDblClick = (e: any) => {
    const rowData = e.data;
    alert(JSON.stringify(rowData, null, 2)); // Alert the data in JSON format
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-5/6 mx-auto">
        <div className="flex modal-header justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-white font-bold">X</button>
        </div>
        <div className="mt-4">
          <DataGrid
            columnAutoWidth={true}
            allowColumnReordering={true}
            dataSource={data}
            keyExpr="LogId"
            onRowDblClick={handleRowDblClick} // Handle double-click
          >
            <SearchPanel visible={true} highlightCaseSensitive={true} /> {/* Enable search panel */}
            {/* Define columns explicitly if needed */}
            <Column dataField="LogId" caption="Log ID" />
            <Column dataField="SysTerminal" caption="System Terminal" />
            <Column dataField="CompId" caption="Company ID" />
            <Column dataField="SiteId" caption="Site ID" />
            <Column dataField="UserId" caption="User ID" />
            <Column dataField="LogAction" caption="Log Action" />
            <Column dataField="DocCd" caption="Document Code" />
            <Column dataField="DocKey" caption="Document Key" />
            <Column dataField="Description" caption="Description" />
            <Column dataField="LogTime" caption="Log Time" dataType="datetime" />
          </DataGrid>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
