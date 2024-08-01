"use client"
import React from 'react';
import 'devextreme/dist/css/dx.light.css';
 
import {
    DataGrid
} from 'devextreme-react/data-grid';


interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  data: any[]; // Modify this to fit your data structure
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, title, data }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-5/6  mx-auto">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-red-500">X</button>
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
