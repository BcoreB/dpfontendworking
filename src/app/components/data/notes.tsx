export const getNotes = (docCd: number, docKey: number): string => {
    const notesData = {
      1: {
        101: "Note for DocCd 1, DocKey 101",
        102: "Note for DocCd 1, DocKey 102",
        // Add more notes for other docKeys
      },
      // Add more docCds with their respective notes
    };
  
    return notesData[docCd]?.[docKey] || "No notes available for this document.";
  };
  