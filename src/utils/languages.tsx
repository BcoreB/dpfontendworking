// app/utils/language.tsx
import { useDirection } from '../app/DirectionContext';
import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';

let translations: Record<string, string> = {};

// Function to read translations from Excel
const loadTranslationsFromExcel = async () => {
  try {
    const response = await fetch('/translations.xlsx');
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Convert Excel data into a key-value object
    jsonData.forEach((row: any) => {
      const [english, arabic] = row;
      if (english && arabic) {
        translations[english] = arabic;
      }
    });
  } catch (error) {
    console.error('Error loading translations:', error);
  }
};

// Load translations on initial run
loadTranslationsFromExcel();

export const getLanguageByEnglish = (english: string): string => {
  const { isRtl } = useDirection();

  // Return Arabic if available and direction is RTL, else return English
  return isRtl ? translations[english] || english : english;
};
