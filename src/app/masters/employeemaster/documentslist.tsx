"use client"
import 'devextreme/dist/css/dx.light.css'
import {  useSearchParams } from 'next/navigation'
import React, { useCallback,  useEffect,  useState } from 'react'
import { DPAlertDialog, useDialog } from '@/components/ui/dpdialogbox'
import {
  DataGrid,
  ColumnChooser,
  ColumnFixing,
  Column,
   
  Selection,
  Toolbar,
  Item, 
} from 'devextreme-react/data-grid';
import GlobalConfig  from '../../app.config'
import { Workbook } from 'exceljs';
 
import { Button } from 'devextreme-react/button';

import 'devextreme/dist/css/dx.light.css';
 
import Decimal from 'decimal.js';
 
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
 
import PopupFormEmployeeDocument from './PopupFormEmployeeDocument'
import { DPDocument } from './formschema';
import { getSysDocs } from '@/app/datalayer/employeedata'
 
type Money = Decimal;



 
type Props = {
  setDocs : ()=>void
}
const notesEditorOptions = { height: 100 };

type Document = {
  rowid: number;
  id:string;
  compid: string;
  empcode: string;
  code: string;
  type: string;
  no: string;
  ref: string;
  issuedate: Date;
  expirydate: Date;
  notes: string;
};

const EmployeeDocuments: React.FC<{ data:Document[],empCode: string , updateEmployeeDocument:(data:DPDocument[])=>void }> = ({ data,empCode,updateEmployeeDocument}) => {
  const [documents , setDocuments]=useState<{ value: string; label: string }[]>([]);

  const [docs, setDocs] = useState<DPDocument[] | undefined>(undefined);
  const [doc, setDoc] = useState<DPDocument | undefined>(undefined);
 
  const [isDocumentsPopupOpen, setDocumentsPopupOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<number >(0);

  const handleButtonClick = () => {
    setDocumentsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setDocumentsPopupOpen(false);
  };

 
  const selectItem = useCallback((e: any) => {
      e.component.byKey(e.currentSelectedRowKeys[0]).done((item: any) => {
          // setSelectedRow(item);

      });
  }, []);
 
  const addNew = useCallback(() => {
    console.log('docs',docs)
    let maxRowid=0
    if(docs)
    {
        maxRowid = docs.reduce((max, obj) => obj.rowid > max ? obj.rowid : max, 0)
      
    }
      const newData = 

        {
          rowid: maxRowid+1,
          id:"",
          compid: GlobalConfig.myCompID,
          empcode: empCode,
          code: "",
          docname: "",
          type: 'gen',
          no: '',
          ref: '',
          issuedate: null,
          expirydate: null,
          notes: '',
        } as unknown as DPDocument  ;
        setDoc(newData)

 
    handleButtonClick()
  }, [docs]);



 
  
  useEffect(()=>{
    

    
  
       
      const fetchData=async ()=>{
        const DOCdata=await getSysDocs()
        if (!data || data.length === 0) {
            const newData = DOCdata.map((doc, index) => (

              {
                rowid: index+1,
                id: "",
                compid: GlobalConfig.myCompID,
                empcode: empCode,
                code: doc.value,
                docname: doc.label,
                type: 'gen',
                no: '',
                ref: '',
                issuedate: null,
                expirydate: null,
                notes: '',
              })) as unknown as DPDocument[]  ;
              setDocs(newData)
              
            }
            else {
              const newData = data.map((doc, index) => (
            
                {
                  rowid: doc.rowid,
                  id: doc.id,
                  compid: doc.compid,
                  empcode:  empCode,
                  code: doc.code,
                  docname: (DOCdata.find(item => item.value ===doc.code)?.label) || "",
                  type: doc.type,
                  no: doc.no,
                  ref: doc.ref,
                  issuedate: doc.issuedate,
                  expirydate: doc.expirydate,
                  notes: doc.notes,
                })) as unknown as DPDocument[]  ;
                setDocs(newData)
          }
          setDocuments(DOCdata)


        }
        
        fetchData();
  
  
 
 

 },[data])
const editRow = useCallback(
  (rowData: { rowid: number }) => {
    if (docs) {

      const index = docs.findIndex((item) => item.rowid === rowData.rowid); // Corrected property name
      if (index !== -1) {
        const editDoc :DPDocument = docs[index]
        setDoc(editDoc)
        console.log('Row editing:', editDoc);
      } else {
        console.log('Row not found for deletion:', rowData);
      }
      handleButtonClick()
    }
  },
  [docs]
);

const updateRow = useCallback(
  (rowData: DPDocument | undefined) => {
    let docExists = false;
 
    if (docs && rowData) {
      const updatedDocs = docs ? [...docs] : [];
      const index = updatedDocs.findIndex((doc) => doc.rowid === rowData.rowid);

      if (index !== -1) {
        // If found, update the document
        updatedDocs[index] = rowData;
      } else {
        // If not found, add the new document
        updatedDocs.push(rowData);
      }
 
      setDocs(updatedDocs);
      setDocumentsPopupOpen(false); // Close the popup after updating the row
      updateEmployeeDocument(updatedDocs);
      
      console.log('updatedDocs',updatedDocs)
    }
  },
  [docs]
);
const deleteRow = useCallback((rowData: { rowid: number }) => {
  console.log('deleteRow rowData.rowid', rowData.rowid); // Debug statement
  
  setDeleteConfirmationOpen(true);
  setRowToDelete(rowData.rowid);
},[]);
useEffect(() => {
  if (isDeleteConfirmationOpen) {
    console.log('Opening delete confirmation dialog'); // Debug statement
    onOpen();
  }
}, [isDeleteConfirmationOpen]);

const confirmDeleteRow = useCallback(() => {
  console.log('confirmDeleteRow', rowToDelete); // Debug statement
  if (rowToDelete !== null && docs) {
    const index = docs.findIndex((item) => item.rowid === rowToDelete);
    if (index !== -1) {
      const newData = [...docs.slice(0, index), ...docs.slice(index + 1)];
      setDocs(newData);
      updateEmployeeDocument(newData);
      console.log('Row deleted:', rowToDelete); // Debug statement
    } else {
      console.log('Row not found for deletion:', rowToDelete); // Debug statement
    }
  }
  setDeleteConfirmationOpen(false);
  setRowToDelete(0);
}, [rowToDelete, docs, updateEmployeeDocument]);

const cancelDeleteRow = useCallback(() => {
  console.log('cancelDeleteRow'); // Debug statement
  setDeleteConfirmationOpen(false);
  setRowToDelete(0);
}, []);

const {   onOpen   } = useDialog(); // Use the useDialog hook

const onDialogButtonClick2 = useCallback((result: string) => {
  console.log('Dialog result:', result); // Debug statement
  console.log('rowToDelete before action:', rowToDelete); // Debug statement
  
  if (result === 'Continue') {
    confirmDeleteRow();
  } else {
    cancelDeleteRow();
  }

  console.log('rowToDelete after action:', rowToDelete); // Debug statement
}, [rowToDelete, confirmDeleteRow, cancelDeleteRow]);
// const onDialogButtonClick2 = useCallback((result:string)=>{
//   console.log('onDialogButtonClick2',result,rowToDelete)
    
//   if (result === 'Continue') {
 
//     confirmDeleteRow();
//   } else {
//     cancelDeleteRow();
//   }
      
// },[])
   return (

      <div className="container flex flex-col">
 
        <div className='flex flex-row w-full' >
 
            <div style={{ overflowX: 'auto', width: '100%', minHeight: '300px'}}>
  
                <DataGrid
                style={{ height: '300px' }}
                id="dataGrid"
                allowColumnResizing={true}
                columnAutoWidth={true}
                allowColumnReordering={true}
                focusedRowEnabled={true}
                dataSource={docs}
                keyExpr="rowid"
                onSelectionChanged={selectItem}
                showBorders={true}
                
                 

                > 
 
        
 
      <Column dataField="rowid" caption="RowID" width={100} visible={false}/>
      <Column dataField="id" caption="ID" width={100} visible={false}/>
      <Column dataField="compid" caption="" width={100} visible={false}/>
      <Column dataField="empcode" caption="EmpCode" width={100} visible={false}/>
      <Column dataField="code" caption="Document" width={125}  visible={false}/>
      <Column dataField="docname" caption="Document" width={125} />
      <Column dataField="type" caption="Type" width={125} />
        
      <Column dataField="no" caption="Number#" width={100} />
      <Column dataField="ref" caption="Ref#" width={100} />
      <Column dataField="issuedate" dataType="date" caption='Issue Date'/>
      <Column dataField="expirydate" dataType="date" caption='Expiry Date' />

      <Column dataField="notes"  />


      <Column key={"Actions"}  width={100} caption={"Actions"} cellRender={(data) => (
          <div className='text-center'>
               <Button
                icon="edit"
                onClick={() => editRow(data.data)}
            />
            <Button
                icon="trash"
                  onClick={() => deleteRow(data.data)}
            />
          </div>
          )}/>
                <ColumnFixing enabled={true} />
                {/* <FilterRow visible={true} /> */}
                <ColumnFixing enabled={true} />
                <ColumnChooser enabled={true} />
                {/* <FilterRow visible={true} /> */}
                {/* <SearchPanel visible={true} /> */}
                {/* <GroupPanel visible={true} /> */}
                <Selection mode="single" />
                <Toolbar>
                    {/* <Item name="groupPanel" /> */}
                    <Item location="after">
                        <Button
                            text={'+'}
                            width={136}
                            onClick={addNew}
                        />
                    </Item>
                    <Item name="exportButton" showText="always" />
                    <Item name="columnChooserButton" />
                    {/* <Item name="searchPanel" /> */}
                    
                    
                </Toolbar>  
              

            </DataGrid>
        
            {isDocumentsPopupOpen && (
              <PopupFormEmployeeDocument onClose={handlePopupClose} data={doc}  updateRow={updateRow}/>
          )}
                
              {/* <CarouselDemo displayData={filtereditems}/> */}
           
              <DPAlertDialog setResult={onDialogButtonClick2} />  

            </div>
        </div>
      </div>
  )
}

export default EmployeeDocuments