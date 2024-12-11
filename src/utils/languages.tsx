// app/utils/language.tsx
import { useDirection } from '../app/DirectionContext';
import * as XLSX from 'xlsx';

let translations: Record<string, string> = {};
let newWordsBuffer: [string, string][] = []; // Array to store new words
let logTimeout: NodeJS.Timeout | null = null; // Timeout for batching logs

// Function to read translations from Excel
const loadTranslationsFromExcel = async () => {
  try {
    const response = await fetch('/Updatedtranslations.xlsx');
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

// Function to log new translations in batches
const logNewTranslations = () => {
  if (logTimeout) clearTimeout(logTimeout); // Clear previous timeout if any

  logTimeout = setTimeout(() => {
    if (newWordsBuffer.length > 0) {
      // Copy the buffer to avoid mutation issues during logging
      const bufferCopy = [...newWordsBuffer];
      newWordsBuffer = []; // Clear the buffer

      console.log('New words added to translations:', bufferCopy);
    }
  }, 500); // Batch log every 500ms
};

// Load translations on initial run
loadTranslationsFromExcel();

export const getLanguageByEnglish = (english: string): string => {
  const { isRtl } = useDirection();

  if (!translations[english]) {
    // Add missing word to translations with an empty Arabic value
    translations[english] = '';

    // Store the new word in the buffer
    newWordsBuffer.push([english, '']);

    // Log the new translations
    logNewTranslations();
  }

  // Return Arabic if available and direction is RTL, else return English
  return isRtl ? translations[english] || english : english;
};
