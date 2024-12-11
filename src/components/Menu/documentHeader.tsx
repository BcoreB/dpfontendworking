"use client";
import { useRouter } from 'next/navigation';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import  AppRouterInstance from 'next/dist/shared/lib/router/router';
import Modal from '@/components/Menu/modal'; // Import Modal component
import { UseFormGetValues } from 'react-hook-form';
import Cookies from 'js-cookie';
import { getLanguageByEnglish } from '@/utils/languages';
interface FormHeaderProps {
  docCd: number;
  docKey: number;
  router: ReturnType<typeof useRouter>;
  getValues: UseFormGetValues<any>;
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
  fieldToPrint?: string; // New prop for the field name
}

const DocumentHeader: React.FC<FormHeaderProps> = ({
  docCd,
  docKey,
  router,
  getValues,
  setFormValues,
  fieldToPrint,
}) => {
  const draftAlerted = useRef(false);
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [documentDate, setDocumentDate] = useState(""); // State for document date

  // Get current date and format it for the date input field
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setDocumentDate(formattedDate); // Set the current date as default
  }, []);

 const addNew = useCallback(() => {
    const url = '/masters/accomodationmaster';
    router.push(url); // No change in logic, only type alignment
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
    const values = getValues(); // Get form values
    console.log(values);
    const valueToPrint = values[fieldToPrint]; // Get the specific field value
    
    // Create a printable layout for the specific form field data
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print Form Data</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Form Data</h2>
          <table>
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${fieldToPrint}</td>
                <td>${typeof valueToPrint === 'object' ? JSON.stringify(valueToPrint) : valueToPrint}</td>
              </tr>
            </tbody>
          </table>
          <script>
            window.print();
          </script>
        </body>
      </html>
    `);
    printWindow?.document.close();
  }, [getValues, fieldToPrint]);
  

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
  }, []);

  // Move the onSubmit function here
  const onSubmit = useCallback(async () => {
    try {
      const values = getValues();
      setFormValues(values);
      console.log(values);
    } catch (error) {
      console.error("Form submission error: ", error);
    }
  }, [getValues, setFormValues]);

  return (
    <div className="form-header" onKeyDown={(e) => {
      if (e.key === "Tab") {
        e.preventDefault(); // Prevent Tab navigation
      }
    }}>
      <div className="flex flex-col gap-5 md:flex-row justify-between items-center  bg-purple-100 mb-5 p-4">
        
        <div className="flex space-x-2" tabIndex={-1}>
          <Button tabIndex={-1} variant='ghost' type="button" onClick={addNew}>{getLanguageByEnglish('New')}</Button>
          <Button tabIndex={-1} variant='ghost' type="submit"  onClick={onSubmit}>{getLanguageByEnglish('Save')}</Button>
          <Button tabIndex={-1} variant='ghost' type="button" onClick={deleteData}>{getLanguageByEnglish('Delete')}</Button>
          <Button tabIndex={-1} variant='ghost' type="button" className='hidden md:block' onClick={printData}>{getLanguageByEnglish('Print')}</Button>
          <Button tabIndex={-1} variant='ghost' type="button" className='hidden md:block' onClick={onLogClick}>{getLanguageByEnglish('Log')}</Button>
          <Button tabIndex={-1} variant='ghost' type="button" className='hidden md:block' onClick={saveDraft}>{getLanguageByEnglish('Draft')}</Button>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <label className='px-2'>
              {getLanguageByEnglish('Doc No:')}
            </label>
            <input
              tabIndex={-1}
                type="text"
                name="documentNumber"
                className="p-1 border rounded w-28 md:w-40"
              />
          </div>
          <div>
            <label className='px-2'>
              {getLanguageByEnglish('Doc Date:')}
            </label>
            <input
                tabIndex={-1}
                type="date"
                name="documentDate"
                className="p-1 border rounded w-28 md:w-40"
                value={documentDate}  // Set default value as current date
                onChange={(e) => setDocumentDate(e.target.value)} // Allow changing the date
              />
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        title="Log Data"
        docCd={docCd} // Passing docCd to Modal
      />
    </div>
  );
};

export default DocumentHeader;
