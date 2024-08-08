import React, { useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";

interface FormHeaderProps {
  onNew: () => void;
  onSave: () => void;
  onDelete: () => void;
  onPrint: () => void;
  onLog: () => void;
  docCd: number;
  docKey: number;
  formValues?: any; // Optional as it's not directly used
}

const FormHeader: React.FC<FormHeaderProps> = ({ onNew, onSave, onDelete, onPrint, onLog, docCd, docKey, formValues }) => {
  
  const draftData = useCallback(() => {
    if (formValues) {
      alert(JSON.stringify(formValues, null, 2)); // Show form values as alert
      // Here you can add logic to save the draft data
    }
  }, [formValues]);

  return (
    <div className="form-header">
      <div className='flex justify-between bg-purple-100 mb-5'>
        <div>
          <Button variant='ghost' type="button" onClick={onNew}>New</Button>
          <Button variant='ghost' type="submit" onClick={onSave}>Save</Button>
          <Button variant='ghost' type="button" onClick={onDelete}>Delete</Button>
        </div>
        <div>
          <Button variant='ghost' type="button" onClick={onPrint}>Print</Button>
          <Button variant='ghost' type="button" onClick={onLog}>Log</Button>
          <Button variant='ghost' type="button" onClick={draftData}>Draft</Button>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
