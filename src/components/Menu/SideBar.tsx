import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Transition } from '@headlessui/react';
import { getNotes, addNote } from './data/notes';
import Cookies from 'js-cookie';
import { getPredefinedData } from '@/components/Menu/data/prefillData' // Import the utility function for predefined data

interface Section {
  name: string;
  content: string;
}

const sections: Section[] = [
  { name: 'Document Actions', content: '' },
  { name: 'Notes', content: '' },
  { name: 'Attachments', content: '' },
  { name: 'Drafts', content: '' },
];

interface SidebarProps {
  docCd: number;
  docKey: number;
  form: any; // Replace with actual type
}

const Sidebar: React.FC<SidebarProps> = ({ docCd, docKey, form }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<{ [key: string]: any }>({}); // State for storing drafts
  const [selectedDraftKey, setSelectedDraftKey] = useState<string | null>(null); // State for selected draft

  const sidebarRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const handleDraftClick = (draftKey: string) => {
    setSelectedDraftKey(draftKey); // Set the selected draft
    const draftValues = drafts[draftKey];
    if (draftValues) {
      Object.keys(draftValues).forEach((key) => {
        form.setValue(key, draftValues[key]);
      });
    }
  };
  const handleDeleteDraft = () => {
    if (selectedDraftKey) {
      const allDraftsKey = 'allDrafts';
      const existingDrafts = Cookies.get(allDraftsKey) ? JSON.parse(Cookies.get(allDraftsKey)!) : {};
      
      // Delete the draft from the state
      setDrafts(prevDrafts => {
        const updatedDrafts = { ...prevDrafts };
        delete updatedDrafts[selectedDraftKey];
        return updatedDrafts;
      });

      // Delete the draft from the cookies
      delete existingDrafts[selectedDraftKey];
      Cookies.set(allDraftsKey, JSON.stringify(existingDrafts));
      
      // Clear the selected draft
      setSelectedDraftKey(null);
    }
  };


  const fetchDrafts = () => {
    const allDraftsKey = 'allDrafts';
    const existingDrafts = Cookies.get(allDraftsKey) ? JSON.parse(Cookies.get(allDraftsKey)!) : {};

    const filteredDrafts = Object.keys(existingDrafts)
      .filter(key => key.startsWith(`draft_${docCd}_${docKey}_`))
      .reduce((acc, key) => {
        acc[key] = existingDrafts[key];
        return acc;
      }, {});

    setDrafts(filteredDrafts || {});
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      addNote(docCd, docKey, newNote);
      fetchNotes(); // Fetch notes after adding a new one
      setNewNote('');
    }
  };

  const fetchNotes = () => {
    const existingNotes = getNotes(docCd, docKey);
    const notesList = existingNotes.map(note => ({
      text: note,
      expanded: false,
    }));
    setNotes(notesList);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      filesArray.forEach(file => {
        const reader = new FileReader();

        if (file.type.startsWith('image/')) {
          reader.onload = (e) => {
            if (e.target?.result) {
              setAttachments(prevAttachments => [...prevAttachments, { file, thumbnail: e.target.result as string }]);
            }
          };
          reader.readAsDataURL(file);
        } else {
          const icon = fileIcons[file.type] || fileIcons['default'];
          setAttachments(prevAttachments => [...prevAttachments, { file, thumbnail: icon }]);
        }
      });
    }
  };

  const handleOpen = (fileIndex: number | null = selectedFileIndex) => {
    if (fileIndex !== null && attachments[fileIndex]) {
      const file = attachments[fileIndex].file;
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }
  };

  const handleDelete = () => {
    if (selectedFileIndex !== null) {
      const confirmed = window.confirm('Do you want to delete this file?');
      if (confirmed) {
        setAttachments(prevAttachments => prevAttachments.filter((_, i) => i !== selectedFileIndex));
        setSelectedFileIndex(null);
      }
    }
  };

  const handlePredefinedData = () => {
    const predefinedData = getPredefinedData(docCd, docKey);
    if (predefinedData) {
      Object.entries(predefinedData).forEach(([field, value]) => {
        form.setValue(field, value);
      });
    }
  };

  useEffect(() => {
    if (activeSection === 1) { // If Notes section is active
      fetchNotes();
    }
  }, [activeSection, docCd, docKey]);

  useEffect(() => {
    if (activeSection === 3) { // If Drafts section is active
      fetchDrafts();
    }
  }, [activeSection, docCd, docKey]);

  const toggleNote = (index: number) => {
    setNotes(prevNotes => prevNotes.map((note, i) => i === index ? { ...note, expanded: !note.expanded } : note));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setActiveSection(null); // Close the sidebar
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen relative">
      <div className="right-0 flex bg-purple-100 flex-col text-sm z-10 pt-2 justify-evenly items-center mt-48 bg-gray-100 shadow-lg" style={{ width: '2.2rem' }}>
        {sections.map((section, index) => (
          <button
            key={index}
            className={`w-20 bg-purple-200 text-black py-1 rounded-sm hover:text-gray-900 text-center transform origin-center rotate-90 ${section.name === 'Document Actions' ? 'w-36 mb-4' : ''} ${section.name === 'Attachments' ? 'w-28' : ''}`}
            onClick={() => toggleSection(index)}
          >
            <div className=''>
              {section.name}
            </div>
          </button>
        ))}
      </div>
      {sections.map((section, index) => (
        <Transition
          key={index}
          show={activeSection === index}
          enter="transition-transform duration-300"
          enterFrom="transform translate-x-full"
          enterTo="transform translate-x-0"
          leave="transition-transform duration-300"
          leaveFrom="transform translate-x-0"
          leaveTo="transform translate-x-full"
          className="absolute right-0 h-5/6 mt-28 shadow-lg p-4"
          style={{ width: '22rem', background:'#FFF7FC'}}
        >
          <div ref={sidebarRef}>
            {section.name === 'Document Actions' && (
              <>
                <h2 className="text-xl font-bold">Document Actions</h2>
                <button
                  onClick={handlePredefinedData}
                  className="mb-4 mt-5 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Fill Form
                </button>
              </>
            )}
             {section.name === 'Notes' && (
              <>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note"
                  className="w-11/12 mb-4 p-2 h-28 text-sm border border-gray-300 rounded resize-none overflow-y-scroll"
                />
                <button
                  onClick={handleAddNote}
                  className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
                <div>
                  <h2 className="text-xl font-bold mb-4">Notes</h2>
                  {notes.map((note, noteIndex) => (
                    <div key={noteIndex} className="mb-2 w-11/12">
                      <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleNote(noteIndex)}>
                        <p className={`p-2 w-11/12 border border-gray-300 rounded ${note.expanded ? 'max-h-full leading-normal text-xs' : 'max-h-8 leading-loose text-xs'} overflow-hidden`}>
                          {note.text}
                        </p>
                        <span className="ml-2">{note.expanded ? '▲' : '▼'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {section.name === 'Attachments' && (
              <div className="flex flex-col h-full">
                <h2 className="text-xl font-bold">Attachments</h2>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex-1 overflow-y-auto">
                  {attachments.map((attachment, fileIndex) => (
                    <div
                      key={fileIndex}
                      className={`p-2 border border-gray-300 rounded mb-2 cursor-pointer flex items-center gap-2 ${selectedFileIndex === fileIndex ? 'bg-gray-200' : ''}`}
                      onClick={() => setSelectedFileIndex(fileIndex)}
                      onDoubleClick={() => handleOpen(fileIndex)}
                    >
                      <img src={attachment.thumbnail} alt="thumbnail" className="w-10 h-10 object-cover rounded" />
                      <span>{attachment.file.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="px-4 py-2 bg-purple-200 text-black rounded"
                    onClick={handleBrowse}
                  >
                    Browse
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-200 text-black rounded"
                    onClick={() => handleOpen()}
                    disabled={selectedFileIndex === null}
                  >
                    Open
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-200 text-black rounded"
                    onClick={handleDelete}
                    disabled={selectedFileIndex === null}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            {section.name === 'Drafts' && (
              <>
                <h2 className="text-xl font-bold mb-4">Drafts</h2>
                {Object.keys(drafts).map((draftKey, index) => (
                  <div
                    key={draftKey}
                    className={`mb-2 w-11/12 cursor-pointer border border-gray-300 p-2 rounded hover:bg-gray-200 ${selectedDraftKey === draftKey ? 'bg-blue-100' : ''}`}
                    onClick={() => handleDraftClick(draftKey)}
                  >
                    {`Draft ${index + 1}`}
                  </div>
                ))}
                <button
                  className="absolute bottom-4 left-4 px-4 py-2 bg-purple-200 text-black rounded"
                  onClick={handleDeleteDraft}
                  disabled={!selectedDraftKey}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default Sidebar;
