import React from 'react';
import { Button } from "@/components/ui/button";

interface FormHeaderProps {
  onNew: () => void;
  onSave: () => void;
  onDelete: () => void;
  onPrint: () => void;
  onLog: () => void;
  onDraft: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ onNew, onSave, onDelete, onPrint, onLog, onDraft }) => {
  return (
    <div className="form-header">
      <div className='flex justify-between bg-purple-100 mb-5'>
                        <div>
                          <Button  variant='ghost' type="button" onClick={onNew}>New</Button>
                          <Button  variant='ghost'  type="submit" onClick={onSave}>Save</Button>
                          <Button  variant='ghost'  type="button" onClick={onDelete}>Delete</Button>
                  
                        </div>
                        <div>
                          <Button  variant='ghost'  type="button" onClick={onPrint}  >Print</Button>
                          <Button  variant='ghost' type="button" onClick={onLog}>Log</Button>
                          <Button  variant='ghost'  type="button" onClick={onDraft}>Draft</Button>
                        </div>
        </div>
    </div>
  );
};

export default FormHeader;

