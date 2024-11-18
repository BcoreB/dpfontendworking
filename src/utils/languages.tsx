// app/utils/language.tsx
import { useDirection } from '../app/DirectionContext';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useState, useEffect } from 'react';

let translations: Record<string, string> = {};

// Function to read translations from Excel
const loadTranslationsFromExcel = async () => {
  try {
    const response = await fetch('/translations.xlsx');
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });

    // Convert Excel data into a key-value object
    jsonData.forEach(([english, arabic]) => {
      if (english) {
        translations[english] = arabic || '';
      }
    });
  } catch (error) {
    console.error('Error loading translations:', error);
  }
};

// Function to save updated translations to Excel
const saveTranslationsToExcel = () => {
  const data = Object.entries(translations).map(([english, arabic]) => [english, arabic]);
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Translations');

  // Save the updated Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'translations.xlsx'); // Ensure the file is downloaded
};

// Load translations on initial run
loadTranslationsFromExcel();

export const getLanguageByEnglish = (english: string): string => {
  const { isRtl } = useDirection();

  if (!translations[english]) {
    // Add missing word to translations with an empty Arabic value
    translations[english] = '';

    // Save the updated translations to Excel
    saveTranslationsToExcel();
  }

  // Return Arabic if available and direction is RTL, else return English
  return isRtl ? translations[english] || english : english;
};
