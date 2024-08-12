"use client";
import React, { useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from 'next/dist/shared/lib/router/router';
import { UseFormGetValues } from 'react-hook-form';

interface FormHeaderProps {
  docCd: number;
  docKey: number;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  router: AppRouterInstance;
  getValues: UseFormGetValues<any>;
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  docCd,
  docKey,
  setModalVisible,
  router,
  getValues,
  setFormValues,
}) => {
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

  const saveDraft = useCallback(() => {
    // Existing save draft logic
  }, [getValues, docCd, docKey]);

  const onLogClick = useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible]);

  // Move the onSubmit function here
  const onSubmit = useCallback(async () => {
    try {
      const values = getValues();
      setFormValues(values);
    } catch (error) {
      console.error("Form submission error: ", error);
    }
  }, [getValues, setFormValues]);

  return (
    <div className="form-header">
      <div className='flex justify-between bg-purple-100 mb-5'>
        <div>
          <Button variant='ghost' type="button" onClick={addNew}>New</Button>
          <Button variant='ghost' type="submit" onClick={onSubmit}>Save</Button> {/* Using onSubmit here */}
          <Button variant='ghost' type="button" onClick={deleteData}>Delete</Button>
        </div>
        <div>
          <Button variant='ghost' type="button" onClick={printData}>Print</Button>
          <Button variant='ghost' type="button" onClick={onLogClick}>Log</Button>
          <Button variant='ghost' type="button" onClick={saveDraft}>Draft</Button>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
