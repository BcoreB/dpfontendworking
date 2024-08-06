// app/component/data/notes.tsx
interface NotesData {
    [docCd: number]: {
      [docKey: number]: string[];
    };
  }
  
  // In-memory storage for notes
  const notesData: NotesData = {
    1: {
      101: ["Note for DocCd 1, DocKey 101"],
      102: ["Note for DocCd 1, DocKey 102"],
      // Add more notes for other docKeys
    },
    // Add more docCds with their respective notes
  };
  
  // Function to get notes for a specific docCd and docKey
  export const getNotes = (docCd: number, docKey: number): string[] => {
    return notesData[docCd]?.[docKey] || [];
  };
  
  // Function to add a note to a specific docCd and docKey
  export const addNote = (docCd: number, docKey: number, note: string) => {
    if (!notesData[docCd]) {
      notesData[docCd] = {};
    }
    if (!notesData[docCd][docKey]) {
      notesData[docCd][docKey] = [];
    }
    notesData[docCd][docKey].push(note);
  };
  