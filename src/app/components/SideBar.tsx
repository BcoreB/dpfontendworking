// components/Sidebar.tsx
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

interface Section {
  name: string;
  content: string;
}

const sections: Section[] = [
  { name: 'Document Actions', content: 'Content for Document Actions' },
  { name: 'Notes', content: 'Content for Notes' },
  { name: 'Attachments', content: 'Content for Attachments' },
  { name: 'Drafts', content: 'Content for Drafts' },
];

const Sidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="flex h-screen relative">
      <div className=" right-0 flex flex-col text-sm z-10 pt-40 gap-24 items-center h-full bg-gray-100 shadow-lg gap-8 py-8" style={{ width: '2rem' }}>
        {sections.map((section, index) => (
          <button
            key={index}
            className="w-full text-gray-700 hover:text-gray-900 text-center transform origin-center rotate-90 py-2"
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
          className="absolute right-0 h-full mt-40 bg-white shadow-lg p-4"
          style={{ width: '20rem' }}
        >
          <div>
            <h2 className="text-xl font-bold">{section.name}</h2>
            <p>{section.content}</p>
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default Sidebar;
