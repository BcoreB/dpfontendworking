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
 
import PopupFormEmployeeContract from './PopupFormEmployeeContract'
import { DPContract, DPDocument } from './formschema';

 
type Money = Decimal;



 
type Props = {
  setcons : ()=>void
}
const notesEditorOptions = { height: 100 };

type Contract = {
  id :  string;
  empcode : string;
  compid : string;
  contype : string;
  conno : number;
  startdate : Date;
  enddate :Date;
  startbasic :  number;
  lastbasic : number;
  noofdays :  number;
  remarks : string;
  rowid :  number;
  extendeddate : Date;
  indpaid : boolean,
  deptcode : string;
  refcompid : string;
  refsiteid : string;
  refdocno :  number;
  refdoccd :  number;
};

const EmployeeContract: React.FC<{ data:Contract[],empCode: string ,deptcode: string, updateEmployeeContract:(data:DPContract[])=>void }> = ({ data,empCode,deptcode,updateEmployeeContract}) => {


  const [cons, setCons] = useState<DPContract[] | undefined>(undefined);
  const [con, setCon] = useState<DPContract | undefined>(undefined);
 
  const [isContractPopupOpen, setContractPopupOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<number >(0);

  const handleButtonClick = () => {
    setContractPopupOpen(true);
  };

  const handlePopupClose = () => {
    setContractPopupOpen(false);
  };

 
  const selectItem = useCallback((e: any) => {
      e.component.byKey(e.currentSelectedRowKeys[0]).done((item: any) => {
          // setSelectedRow(item);

      });
  }, []);
 
  const addNew = useCallback(() => {
    console.log('cons',cons)
    // console.log('deptcode',deptcode)
    let maxRowid=0
    if(cons)
    {
        maxRowid = cons.reduce((max, obj) => obj.rowid > max ? obj.rowid : max, 0)
      
    }
      const newData = 

        {

          id : "",
  empcode : empCode,
  compid : GlobalConfig.myCompID, 
  contype : "",
  conno : 0,
  startdate : null,
  enddate :null,
  startbasic :  0,
  lastbasic :  0,
  noofdays :   0,
  remarks : '',
  rowid :  maxRowid+1,
  extendeddate : null,
  indpaid : false,
  deptcode : deptcode,
  refcompid : '',
  refsiteid :  '',
  refdocno :  0,
  refdoccd :  0

        } as unknown as DPContract  ;
        setCon(newData)

 
    handleButtonClick()
  }, [cons]);



 
  
  useEffect(()=>{
    

    console.log('data',data)
  
       
      const fetchData=async ()=>{
          if(data)
            {
              const newData = data.map((doc, index) => (
            
                {

                  id : doc.id,
                  empcode : doc.empcode,
                  compid : doc.compid,
                  contype : doc.contype,
                  conno : doc.conno,
                  startdate : doc.startdate,
                  enddate :doc.enddate,
                  startbasic :  doc.startbasic,
                  lastbasic :  doc.lastbasic,
                  noofdays :   doc.noofdays,
                  remarks : doc.remarks,
                  rowid : doc.rowid,
                  extendeddate : doc.extendeddate,
                  indpaid : doc.indpaid,
                  deptcode : doc.deptcode,
                  refcompid : doc.refcompid,
                  refsiteid :  doc.refsiteid,
                  refdocno :  doc.refdocno,
                  refdoccd :  doc.refdoccd
 
                })) as unknown as DPContract[]  ;
                setCons(newData)

            }
             
          }
 


        
        
        fetchData();
  
  
 
 

 },[data])
const editRow = useCallback(
  (rowData: { rowid: number }) => {
    if (cons) {

      const index = cons.findIndex((item) => item.rowid === rowData.rowid); // Corrected property name
      if (index !== -1) {
        const editDoc :DPContract = cons[index]
        setCon(editDoc)
        console.log('Row editing:', editDoc);
      } else {
        console.log('Row not found for deletion:', rowData);
      }
      handleButtonClick()
    }
  },
  [cons]
);

const updateRow = useCallback(
  (rowData: DPContract | undefined) => {
    let docExists = false;
 
    if (cons && rowData) {
      const updatedcons = cons ? [...cons] : [];
      const index = updatedcons.findIndex((doc) => doc.rowid === rowData.rowid);

      if (index !== -1) {
        // If found, update the document
        updatedcons[index] = rowData;
      } else {
        // If not found, add the new document
        updatedcons.push(rowData);
      }
 
      setCons(updatedcons);
      setContractPopupOpen(false); // Close the popup after updating the row
      updateEmployeeContract(updatedcons);
      
      console.log('updatedcons',updatedcons)
    }
  },
  [cons]
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
  if (rowToDelete !== null && cons) {
    const index = cons.findIndex((item) => item.rowid === rowToDelete);
    if (index !== -1) {
      const newData = [...cons.slice(0, index), ...cons.slice(index + 1)];
      setCons(newData);
      updateEmployeeContract(newData);
      console.log('Row deleted:', rowToDelete); // Debug statement
    } else {
      console.log('Row not found for deletion:', rowToDelete); // Debug statement
    }
  }
  setDeleteConfirmationOpen(false);
  setRowToDelete(0);
}, [rowToDelete, cons, updateEmployeeContract]);

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
                dataSource={cons}

                keyExpr="rowid"
                onSelectionChanged={selectItem}
                showBorders={true}
                
                 

                > 
 
      <Column dataField="rowid" caption="RowID" width={100} visible={false}/>
      <Column dataField="id" caption="ID" width={100} visible={false}/>
      <Column dataField="compid" caption="" width={100} visible={false}/>
      <Column dataField="empcode" caption="EmpCode" width={100} visible={false}/>

      <Column dataField="contype" caption="Type" width={50}   />

      <Column dataField="conno" caption="No"  width={50} />
      <Column dataField="startdate" caption="StartDate"  dataType="date"  width={100} />
      <Column dataField="enddate" caption="EndDate"  dataType="date"  width={100} />


      <Column dataField="startbasic" caption="StartBasic" width={80} />
      

      <Column dataField="lastbasic" caption="LastBasic" width={80} />

      <Column dataField="noofdays" caption="Days" width={60} />
      <Column dataField="remarks"caption='Remarks'/>
      <Column dataField="extendeddate" dataType="date" caption='Extended Date' />

      <Column dataField="indpaid" caption="IndPaid" width={80} />

      <Column dataField="deptcode" caption="DeptCode" width={100} />

      <Column dataField="refcompid" caption="refcompid"  visible={false}/>
      <Column dataField="refsiteid" caption="refsiteid"  visible={false} />
      <Column dataField="refdocno" caption="refdocno"  visible={false} />
      <Column dataField="refdoccd" caption="refdoccd"  visible={false} />


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
        
         
            {isContractPopupOpen && (
              <PopupFormEmployeeContract onClose={handlePopupClose} data={con}  updateRow={updateRow}/>
          )}
                
                 
                
              {/* <CarouselDemo displayData={filtereditems}/> */}
           
              <DPAlertDialog setResult={onDialogButtonClick2} />  

            </div>
        </div>
      </div>
  )
}

export default EmployeeContract