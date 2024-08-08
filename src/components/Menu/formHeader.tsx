"use client"
import React, { useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from 'next/dist/shared/lib/router/router'; // Import the correct type for router
import { UseFormGetValues } from 'react-hook-form'; // Import UseFormGetValues type

interface FormHeaderProps {
  onSave: () => void;
  docCd: number;
  docKey: number;
  formValues?: any; // Optional as it's not directly used
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  router: AppRouterInstance; // Update the type for router
  getValues: UseFormGetValues<any>; // Add getValues to props
}

const FormHeader: React.FC<FormHeaderProps> = ({ onSave, docCd, docKey, formValues, setModalVisible, router, getValues }) => {
  const draftAlerted = useRef(false);

  const addNew = useCallback(() => {
    const url = '/masters/accomodationmaster';
    router.push(url);
    alert("Added new");
    window.location.reload();
  }, [router]);

  const deleteData = useCallback(() => {
    const url = '/masters/accomodationmaster';
    router.push(url);
    alert("Saved Data");
    window.location.reload();
  }, [router]);

  const printData = useCallback(() => {
    const url = '/masters/accomodationmaster';
    router.push(url);
    alert("printed Data");
    window.location.reload();
  }, [router]);

  const draftData = useCallback(() => {
    if (!draftAlerted.current) {
      draftAlerted.current = true;
      const currentFormValues = getValues(); // Get current form values
      alert(JSON.stringify(currentFormValues, null, 2)); // Show current form values as alert
      // Here you can add logic to save the draft data
      setTimeout(() => {
        draftAlerted.current = false;
      }, 1000); // Reset the alert flag after 1 second
    }
  }, [getValues]);

  const onLogClick = useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible]);
  return (
    <div className="form-header">
      <div className='flex justify-between bg-purple-100 mb-5'>
        <div>
          <Button variant='ghost' type="button" onClick={addNew}>New</Button>
          <Button variant='ghost' type="submit" onClick={onSave}>Save</Button>
          <Button variant='ghost' type="button" onClick={deleteData}>Delete</Button>
        </div>
        <div>
          <Button variant='ghost' type="button" onClick={printData}>Print</Button>
          <Button variant='ghost' type="button" onClick={onLogClick}>Log</Button>
          <Button variant='ghost' type="button" onClick={draftData}>Draft</Button>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;



