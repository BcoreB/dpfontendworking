import { fetchEmployeeData } from "../app/datalayer/api";

export const TranslationDictionary =async ():Promise<{ value: string; label: string }[]>   => {
    try {
    const rawData = await fetchEmployeeData(`SyslanguageAr?doccd=1000`);
    const formattedData  = rawData.map((item: any) => ({
        value: item.arabic,
        label: item.english,
      }));
 
    return formattedData 
} catch (error) {
    console.error('Error fetching employee status data:', error);
    return [];
  }
  };