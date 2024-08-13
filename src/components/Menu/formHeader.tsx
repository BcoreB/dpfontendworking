"use client";
import React, { useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from 'next/dist/shared/lib/router/router';
import { UseFormGetValues } from 'react-hook-form';
import Cookies from 'js-cookie';
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
    const currentFormValues = getValues(); // Get current form values
    const allDraftsKey = 'allDrafts'; // Key for storing the collection of drafts

    // Retrieve the existing drafts from the cookie, or initialize an empty object
    const existingDrafts = Cookies.get(allDraftsKey) ? JSON.parse(Cookies.get(allDraftsKey)!) : {};

    // Find the maximum existing index for the current docCd and docKey
    const existingKeys = Object.keys(existingDrafts).filter(key => key.startsWith(`draft_${docCd}_${docKey}_`));
    let maxIndex = 0;

    if (existingKeys.length > 0) {
      maxIndex = Math.max(
        ...existingKeys.map(key => {
          const parts = key.split('_');
          return parseInt(parts[3], 10);
        })
      );
    }

    // Increment the index to generate a new unique draft key
    const newDraftIndex = maxIndex + 1;
    const draftKey = `draft_${docCd}_${docKey}_${newDraftIndex}`;

    // Add the new draft under the unique key
    existingDrafts[draftKey] = currentFormValues;

    try {
      // Save the updated collection back to the cookie
      Cookies.set(allDraftsKey, JSON.stringify(existingDrafts), { expires: 365 }); // Store with a 1-year expiry
      console.log("Draft saved successfully with key:", draftKey);
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
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
