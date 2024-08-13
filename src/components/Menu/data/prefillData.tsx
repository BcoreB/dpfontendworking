// prefillData.tsx
interface PredefinedData {
    accocode: string;
    accname: string;
    buildno: string;
    roadno: string;
    accotype: string;
    blockno: string;
    flatno: string;
    area: string;
    remarks: string;
    airseccode:string;
    airsecname:string;
    defaultairline:string;
    cost:string;
  }
  
  const prefillData: Record<number, Record<number, PredefinedData>> = {
    1: {
      101: {
        accocode: "PRE001",
        accname: "Predefined Accommodation",
        buildno: "42",
        roadno: "Main St",
        accotype: "a",
        blockno: "B1",
        flatno: "101",
        area: "Downtown",
        remarks: "This is predefined data.",
      },
      // Add more data as needed
    },
    2: {
      101: {
        airseccode: "AIR101",
        airsecname: "Quatar Airways",
        defaultairline: "a",
        cost: "1000",
        remarks: "Nice flight",
      }
    }
    // Add more docCd entries as needed
  };
  
  export const getPredefinedData = (docCd: number, docKey: number): PredefinedData | null => {
    return prefillData[docCd]?.[docKey] || null;
  };
  