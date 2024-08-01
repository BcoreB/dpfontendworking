
"use client"

import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

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
}

const Sidebar: React.FC<SidebarProps> = ({ fillFormWithPredefinedData }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);

  const fileInputRef = React.createRef<HTMLInputElement>();

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments([...attachments, ...Array.from(event.target.files)]);
    }
  };

  const handleOpen = (fileIndex: number | null = selectedFileIndex) => {
    if (fileIndex !== null && attachments[fileIndex]) {
      const file = attachments[fileIndex];
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }
  };

  const handleDelete = () => {
    if (selectedFileIndex !== null) {
      setAttachments(attachments.filter((_, i) => i !== selectedFileIndex));
      setSelectedFileIndex(null);
    }
  };

  return (
    <div className="flex h-screen relative ">
      <div className="right-0 flex bg-purple-100 flex-col text-sm z-10 pt-2 gap-20 items-center mt-48 bg-gray-100 shadow-lg" style={{ width: '2rem' }}>
        {sections.map((section, index) => (
          <button
            key={index}
            className="w-5/6 text-gray-700 hover:text-gray-900 text-center transform origin-center rotate-90 py-2"
            onClick={() => toggleSection(index)}
          >
            <div className='w-40'>
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
          className="absolute right-0 h-5/6 mt-28 bg-white shadow-lg p-4"
          style={{ width: '20rem' }}
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
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note"
                  className="w-5/6 mb-4 p-2 h-28 border border-gray-300 rounded"
                />
                <button
                  onClick={addNote}
                  className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
                <div>
                  <h2 className="text-xl font-bold mb-4">Notes</h2>
                  {notes.map((note, noteIndex) => (
                    <p key={noteIndex} className="mb-2 w-5/6 p-2 border border-gray-300 rounded">{note}</p>
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
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <div className="flex flex-col flex-grow mt-4">
                  {attachments.map((file, fileIndex) => (
                    <div
                      key={fileIndex}
                      className={`p-2 border border-gray-300 rounded mb-2 cursor-pointer ${selectedFileIndex === fileIndex ? 'bg-gray-200' : ''}`}
                      onClick={() => setSelectedFileIndex(fileIndex)}
                      onDoubleClick={() => handleOpen(fileIndex)}
                    >
                      {file.name}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleBrowse}
                  >
                    Browse
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => handleOpen()}
                    disabled={selectedFileIndex === null}
                  >
                    Open
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
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
                <h2 className="text-xl font-bold">Drafts</h2>
              </>
            )}
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default Sidebar;
