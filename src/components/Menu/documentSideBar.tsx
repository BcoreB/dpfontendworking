import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Transition } from '@headlessui/react';
import { getNotes, addNote } from './data/notes';
import Cookies from 'js-cookie';
import { getPredefinedData } from '@/components/Menu/data/prefillData' // Import the utility function for predefined data
import { DataGrid } from 'devextreme-react/data-grid'; // Import DevExpress DataGrid
import { getReferenceData } from './data/referencesData';
import DateBox from 'devextreme-react/date-box'; // Import DateBox for date selection
import Button from 'devextreme-react/cjs/button';
import {SelectBox} from 'devextreme-react'
import { sampleDocListData } from './data/docListData';
import ComboBox from '../ui/combobox';
import { getLanguageByEnglish } from '@/utils/languages';
interface Section {
  name: string;
  content: string;
}
interface Attachment {
  file: File;
  thumbnail: string;
}
interface DocumentListProps {
  section: {
    name: string;
  };
}

const fileIcons: { [key: string]: string } = {
  'application/pdf': '/fileIcons/pdf.png',
  'application/msword': '/fileIcons/doc.png',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '/fileIcons/doc.png',
  'application/vnd.ms-excel': '/fileIcons/excel-icon.png',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '/fileIcons/excel.png',
  'default': '/fileIcons/default.png',
};

const referencesData = {
  a: [
    { DocNo: 'D001', RefNo: 'R1001', EmpCode: 'E123', EmpName: 'John Doe', SettlementName: 'Settlement A' },
    { DocNo: 'D002', RefNo: 'R1002', EmpCode: 'E124', EmpName: 'Jane Smith', SettlementName: 'Settlement B' },
    { DocNo: 'D003', RefNo: 'R1003', EmpCode: 'E125', EmpName: 'Robert Brown', SettlementName: 'Settlement C' },
    { DocNo: 'D004', RefNo: 'R1004', EmpCode: 'E126', EmpName: 'Emily Clark', SettlementName: 'Settlement D' },
  ],
  b: [
    { DocumentID: 'D001', ReferenceID: 'R2001', EmployeeID: 'E321', EmployeeFullName: 'Alice Johnson', Location: 'Location X' },
    { DocumentID: 'D002', ReferenceID: 'R2002', EmployeeID: 'E322', EmployeeFullName: 'Michael White', Location: 'Location Y' },
    { DocumentID: 'D003', ReferenceID: 'R2003', EmployeeID: 'E323', EmployeeFullName: 'Sophia Turner', Location: 'Location Z' },
    { DocumentID: 'D004', ReferenceID: 'R2004', EmployeeID: 'E324', EmployeeFullName: 'William Davis', Location: 'Location W' },
  ],
};
const sections: Section[] = [
  { name: 'Document Actions', content: '' },
  { name: 'References', content: '' },
  { name: 'Notes', content: '' },
  { name: 'Attachments', content: '' },
  { name: 'Drafts', content: '' },
  { name: 'Document List', content:'' },
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
  const [bottomGridData, setBottomGridData] = useState([]);
  const [selectedDataKey, setSelectedDataKey] = useState('a');

  // Document list section
  // Document list section
const [selectedLeaveType, setSelectedLeaveType] = useState<string | null>(null);
const [fromDate, setFromDate] = useState<Date | null>(null);
const [toDate, setToDate] = useState<Date | null>(null);
const [filteredData, setFilteredData] = useState(sampleDocListData);  // State to store filtered data
const [selectedRowData, setSelectedRowData] = useState<any>(null); // Store selected row data

// Function to handle filtering
const handleRefresh = () => {
  let filtered = sampleDocListData;

  // Filter by LeaveType if selected
  if (selectedLeaveType) {
    filtered = filtered.filter(item => item.leavetype === selectedLeaveType);
  }

  // Filter by fromDate and toDate if both are selected
  if (fromDate && toDate) {
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.date);  // Assuming 'datefield' holds the relevant date value in your data

      // Ensure valid date comparison: fromDate <= itemDate <= toDate
      return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
    });
  }

  // Update the filtered data state
  setFilteredData(filtered);
};

// Handle row selection (single click)
const onRowSelectionChanged = (e: any) => {
  const selectedRow = e.selectedRowsData[0]; // Get the selected row data
  if (selectedRow) {
    setSelectedRowData(selectedRow); // Store the selected row
    console.log("Selected Row Data:", selectedRow); // Log selected row data for verification
  }
};

// Handle double-click event to alert Ref No
const onRowDoubleClick = (e: any) => {
  if (e && e.data && e.data.refno) {  // 'refno' is the correct key based on your data
    handleReferenceData(e.data.refno); // Pass the RefNo to the function
  }
};

// Function to handle the Open button click (same as double-click)
const handleOpenClick = () => {
  console.log("Selected Row Data on Open Click:", selectedRowData); // Log selected row data on button click
  if (selectedRowData && selectedRowData.refno) {
    handleReferenceData(selectedRowData.refno); // Use the selected row's RefNo
  } else {
    alert('Please select a row first');  // In case no row is selected
  }
};

  const handleDataChange = (e:any) => {
    setSelectedDataKey(e.target.value);
  };
  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };
  const [selectedRowsData, setSelectedRowsData] = useState([]);
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

  const handleReferenceData = (refNo:string) => {
    const referenceData = getReferenceData(refNo);
    if (referenceData) {
      Object.entries(referenceData).forEach(([field, value]) => {
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current) {
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      // Check if the click is outside the left boundary of the sidebar
      if (event.clientX < sidebarRect.left) {
        setActiveSection(null); // Close the sidebar
      }
    }
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  
  return (
    <div className="flex h-screen relative">
      {/* Hamburger Menu */}
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="block md:hidden p-2 absolute top-32 text-gray-500 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative top-0 right-0  z-10 h-full transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
        style={{ width: "14rem" }}
      >
      <div className="right-0 flex bg-purple-100 h-full flex-col text-sm z-10 pt-2 justify-evenly items-center mt-28 md:mt-20 bg-gray-100 shadow-lg" style={{ width: '2.2rem' }}>
        {sections.map((section, index) => (
          <button
            key={index}
            className={`w-20 bg-purple-200 text-black py-1 rounded-sm hover:text-gray-900 text-center transform origin-center rotate-90 ${section.name === 'Document Actions' ? 'w-36 mb-10' : ''} ${section.name === 'Attachments' ? 'w-28 mt-6' : ''} ${section.name === 'Drafts' ? 'mt-6' : ''}${section.name === 'Notes' ? 'mt-2' : ''}${section.name === 'Document List' ? 'w-36 mt-10' : ''}`}
            onClick={() => toggleSection(index)}
          >
            <div className=''>
              {getLanguageByEnglish(section.name)}
            </div>
          </button>
        ))}
      </div>
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
          className="sidebar-slide absolute w-[18rem] md:w-[28rem] right-0 pr-12 h-full mt-24 shadow-lg p-4"
          style={{ background:'#FFF7FC',}}
        >
          <div ref={sidebarRef}>
            {section.name === 'Document Actions' && (
              <>
                <h2 className="text-xl font-bold">{getLanguageByEnglish('Document Actions')}</h2>
                <button
                  onClick={handlePredefinedData}
                  className="mb-4 mt-5 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {getLanguageByEnglish('Fill Form')}
                </button>
              </>
            )}
            {section.name === 'References' && (
              
<>
    <h2 className="text-xl font-bold pb-8">{getLanguageByEnglish('References')}</h2>
      <div className="flex items-center mb-4">
            <label htmlFor="referenceType" className="mr-2 font-semibold">{getLanguageByEnglish('Reference Type:')}</label>
            <select
                id="referenceType"
                value={selectedDataKey}
                onChange={handleDataChange}
                className="w-2/4 p-2 border border-gray-300 rounded"
            >
                <option value="a">Data Set A</option>
                <option value="b">Data Set B</option>
            </select>
        </div>

    <div className="w-full overflow-x-auto overflow-y-auto" style={{ height: '220px', overflowY: 'auto' }}>
        {/* Add horizontal scrolling and vertical scrolling */}
        <DataGrid
            dataSource={referencesData[selectedDataKey]} // Use the selected key to get the right data
            showBorders={true}
            keyExpr={selectedDataKey === 'a' ? "DocNo" : "DocumentID"} // Update keyExpr based on selected data
            searchPanel={{ visible: true, width: 365, placeholder: getLanguageByEnglish('Search references...') }}
            selection={{ mode: 'multiple', showCheckBoxesMode: 'always' }} // Enable multi-row selection with checkboxes
            columnAutoWidth={true} // Auto-adjust column width
            onSelectionChanged={(e) => setSelectedRowsData(e.selectedRowsData)} // Store the selected rows
            rtlEnabled={true} // Enable RTL layout for DataGrid
          />
    </div>
    <button
        onClick={() => {
            if (selectedRowsData && selectedRowsData.length > 0) {
                const selectedData = selectedRowsData.map((row) => ({
                    DocCd: row.DocCd,
                    CompID: row.CompID,
                    SiteID: row.SiteID,
                    DocNo: row.DocNo,
                    RefNo: row.RefNo,
                    EmpCode: row.EmpCode,
                }));
                setBottomGridData((prevData) => [...prevData, ...selectedData]);
            } else {
                alert('No rows selected');
            }
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
        {getLanguageByEnglish('Download')}
    </button>

    {/* Bottom DataGrid for selected row */}
    <div className="w-full mt-4 overflow-x-auto overflow-y-auto" style={{ height: '100px', overflowY: 'auto' }}>
        {/* Add horizontal scrolling and vertical scrolling */}
        <DataGrid
            dataSource={bottomGridData} // Data for the bottom grid
            showBorders={true}
            keyExpr="DocNo" // Unique key for the rows
            columnAutoWidth={true} // Auto-adjust column width
            rtlEnabled={true} // Enable RTL layout for DataGrid
            columns={[
                { dataField: 'DocCd', caption: getLanguageByEnglish('DocCd') },
                { dataField: 'CompID', caption: getLanguageByEnglish('CompID') },
                { dataField: 'SiteID', caption: getLanguageByEnglish('SiteID') },
                { dataField: 'DocNo', caption: getLanguageByEnglish('DocNo') },
                { dataField: 'RefNo', caption: getLanguageByEnglish('RefNo') },
                { dataField: 'EmpCode', caption: getLanguageByEnglish('EmpCode') },
            ]}
        />
    </div>

    {/* Buttons to Clear and Ok */}
    <div className="mt-4 flex justify-end gap-4 space-x-4">
        <button
            onClick={() => {
                setBottomGridData([]); // Clear the data in the second DataGrid
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
        >
            {getLanguageByEnglish('Clear')}
        </button>
        <button
            onClick={() => {
                // if (bottomGridData.length > 0) {
                //     const currentRowRefNo = bottomGridData[0].RefNo; // Assuming you want the RefNo from the first row
                //     handleReferenceData(currentRowRefNo); // Pass the RefNo to the function
                // } else {
                //     alert('No data in the selected row details');
                // }
                alert(JSON.stringify(bottomGridData, null, 2)); // Show alert with current data in the second DataGrid
            }}
            className="px-4 py-2 bg-green-500 text-white rounded"
        >
            {getLanguageByEnglish('Ok')}
        </button>
    </div>
</>



            )}


             {section.name === 'Notes' && (
              <>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder={getLanguageByEnglish("Add a note")}
                  className="w-11/12 mb-4 p-2 h-28 text-sm border border-gray-300 rounded resize-none overflow-y-scroll"
                />
                <button
                  onClick={handleAddNote}
                  className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {getLanguageByEnglish('Add')}
                </button>
                <div>
                  <h2 className="text-xl font-bold mb-4">{getLanguageByEnglish('Notes')}</h2>
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
                <h2 className="text-xl font-bold">{getLanguageByEnglish('Attachments')}</h2>
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
                    {getLanguageByEnglish('Browse')}
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-200 text-black rounded"
                    onClick={() => handleOpen()}
                    disabled={selectedFileIndex === null}
                  >
                    {getLanguageByEnglish('Open')}
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-200 text-black rounded"
                    onClick={handleDelete}
                    disabled={selectedFileIndex === null}
                  >
                    {getLanguageByEnglish('Delete')}
                  </button>
                </div>
              </div>
            )}
            {section.name === 'Drafts' && (
              <>
                <h2 className="text-xl font-bold mb-4">{getLanguageByEnglish('Drafts')}</h2>
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
                  {getLanguageByEnglish('Delete')}
                </button>
              </>
            )}
           {section.name === 'Document List' && (
  <>
    <h2 className="text-xl font-bold">{getLanguageByEnglish('Document List')}</h2>

    {/* Date pickers for fromDate and toDate */}
    <div className="mb-4 mt-5 flex justify-between">
      <div className="flex space-x-2">
        <DateBox
          value={fromDate ?? undefined}
          placeholder={getLanguageByEnglish("From Date")}
          onValueChanged={(e) => setFromDate(e.value)}
          dropDownOptions={{ showCloseButton: true }}
        />
        <DateBox
          value={toDate ?? undefined} 
          placeholder={getLanguageByEnglish("To Date")}
          onValueChanged={(e) => setToDate(e.value)}
          dropDownOptions={{ showCloseButton: true }}
        />
      </div>
    </div>

    {/* SelectBox for LeaveType filtering */}
    <div className="mb-4 mt-5 flex justify-between">
      <SelectBox
        dataSource={['a', 'b']}  // Options for LeaveType
        placeholder={getLanguageByEnglish("Select Leave Type")}
        value={selectedLeaveType}
        onValueChanged={(e) => setSelectedLeaveType(e.value)}
        searchEnabled={true}
        className='w-3/4'
      />

      {/* Refresh button */}
      <Button
        text={getLanguageByEnglish("Refresh")}
        onClick={handleRefresh}
        type="success"
        className="ml-4"
      />
    </div>

    {/* DataGrid for displaying filtered data */}
    <div className="data-grid-container" style={{ fontSize: '12px' }}>
      <DataGrid
        dataSource={filteredData}
        showBorders={true}
        searchPanel={{ visible: true, width: '380px', placeholder: getLanguageByEnglish('Search...'), highlightSearchText: false }}
        headerFilter={{ visible: false }}
        columnAutoWidth={true}
        selection={{ mode: 'single' }}  // Single row selection
        onSelectionChanged={onRowSelectionChanged}  // Single click to select
        onRowDblClick={onRowDoubleClick}  // Double-click event to alert row data
        style={{ userSelect: 'none' }} // Disable text selection in the grid
        rtlEnabled={true} // Enable RTL layout for DataGrid
      />
    </div>

    {/* Open button */}
    <div className="absolute bottom-4 right-4">
      <Button
        text="Open"
        onClick={handleOpenClick}
        type="default"
        className="w-full max-w-xs mr-8"  // max-w-xs sets the max width to 4rem
        style={{ maxWidth: '4rem' }}  // Ensure the width doesn't exceed 4rem
      />
    </div>

    {/* Custom styling */}
    <style jsx>{`
      .data-grid-container {
        font-size: 12px; /* Smaller text for DataGrid */
      }
      .dx-datagrid-search-panel {
        width: 100% !important; /* Full-width search bar */
      }
    `}</style>
  </>
)}

          </div>
        </Transition>
      ))}
    </div>
  );
};

export default Sidebar;