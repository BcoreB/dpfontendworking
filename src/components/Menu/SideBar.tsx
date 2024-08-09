import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Transition } from '@headlessui/react';
import { getNotes, addNote } from './data/notes'; // Adjust path as needed
import { getDraftData } from '@/components/Menu/data/draftData'; // Adjust path as needed

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
  fillFormWithPredefinedData: () => void;
  docCd: number;
  docKey: number;
  form: any; // Replace with actual type
  setDraftData: (data: any) => void; // Add the correct type for data if known
}

const Sidebar: React.FC<SidebarProps> = ({ fillFormWithPredefinedData, docCd, docKey, form, setDraftData }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<{ [key: string]: any }>({}); // State for storing drafts

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const handleDraftClick = (draftKey: string) => {
    const draftValues = drafts[draftKey];
    if (draftValues) {
      setDraftData(draftValues); // Use the function passed as a prop
    }
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

  const fetchDrafts = () => {
    const draftsData = getDraftData(docCd, docKey); // Fetch all drafts based on docCd and docKey
    setDrafts(draftsData || {}); // Store drafts data in state
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
          style={{ width: '22rem', background:'#FEFAF6'}}
        >
          <div>
            {section.name === 'Document Actions' && (
              <>
                <h2 className="text-xl font-bold">Document Actions</h2>
                <button
                  onClick={fillFormWithPredefinedData}
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
                <h2 className="text-xl pb-4 font-bold">Drafts</h2>
                <div>
                  {Object.keys(drafts).map((draftKey) => (
                    <button
                      key={draftKey}
                      onClick={() => handleDraftClick(draftKey)}
                      className="block py-4  text-black rounded mb-2 w-1/2 text-left"
                    >
                      {draftKey}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default Sidebar;
