// src/components/menu/data/draftData.tsx
interface DraftData {
    [key: string]: any; // Use any for flexibility
  }
  
  const draftData: Record<number, Record<number, Record<string, DraftData>>> = {
    1: {
      101: {
        draft1: {
          accocode: "1001",
          accname: "Draft One",
          buildno: "10",
          roadno: "5",
          accotype: "Type A",
          blockno: "20",
          flatno: "3A",
          area: "Downtown",
          remarks: "First draft remarks"
        },
        draft2: {
          accocode: "1002",
          accname: "Draft Two",
          buildno: "12",
          roadno: "7",
          accotype: "Type B",
          blockno: "22",
          flatno: "4B",
          area: "Uptown",
          remarks: "Second draft remarks"
        }
      }
    },
    2: {
      201: {
        draft1: {
          accocode: "2001",
          accname: "Draft Three",
          buildno: "20",
          roadno: "15",
          accotype: "Type C",
          blockno: "30",
          flatno: "5C",
          area: "Suburb",
          remarks: "Third draft remarks"
        }
      }
    }
    // Add more docCd and docKey combinations as needed
  };
  
  export const getDraftData = (docCd: number, docKey: number) => {
    return draftData[docCd]?.[docKey] || null;
  };
  