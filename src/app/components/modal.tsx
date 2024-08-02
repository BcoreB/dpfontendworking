// Modal.tsx
"use client"
import React, { useEffect, useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import {
    DataGrid
} from 'devextreme-react/data-grid';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  docCd: number; // Add docCd prop
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, title, docCd }) => {
  const [data, setData] = useState<any[]>([]); // Store fetched data

  useEffect(() => {
    if (isVisible) {
      // Dynamically import the data file based on docCd
      import(`@/app/components/data/${docCd}.tsx`)
        .then(module => setData(module.default))
        .catch(error => {
          console.error("Failed to load data:", error);
          setData([]); // Handle the error case
        });
    }
  }, [isVisible, docCd]);

  if (!isVisible) return null;

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
            keyExpr="LogId">
          </DataGrid>
        </div>
      </div>
    </div>
  );
};

export default Modal;
