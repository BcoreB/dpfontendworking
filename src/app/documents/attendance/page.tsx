"use client";
import React, { useEffect, useState } from 'react';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DPInput from '@/components/ui/dpinput';
import { InitializeForm, formSchema, Company, Department,EmployeeAttendanceDailyDetGrid, payrollperiod } from './formSchema';
import { useRouter } from 'next/navigation';
import getLanguageByEnglish from '@/utils/languages';
import DPComboBox from '@/components/ui/dpcombobox';
import DocumentHeader from '@/components/Menu/documentHeader';
// import Sidebar from '@/components/Menu/SideBar';
import Sidebar from '@/components/Menu/documentSideBar';
import DPTextArea from '@/components/ui/dptextarea';
import DPInputBrowse from '@/components/ui/dpinputbrowse';
import DPDatePicker from '@/components/ui/dpdatepicker';
import GenericGrid from '../leaveentry/GenericGrid';
import * as XLSX from 'xlsx'; // Import XLSX library
const AttendanceEntry = () => {
  const docCd = 10;
  const docKey = 101;
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();

  const router = useRouter();


  const [attendanceData, setattendanceData] = useState< EmployeeAttendanceDailyDetGrid[]>([
    {
        id:'1',
        RowId:0,
        AttDate:undefined,
        InTime:undefined,
        OutDate:undefined,
        OutTime:undefined,
        totalhours:undefined,
        totalminutes:undefined,
        EmpCode:'',
        EmpName:'',
        RefCode:'',
        RefCode2:'',
        Remakrs:'',
        Status:'',
        ScheduleCode:'',
        Idle:false,
    },
  ]);

  // Initialize the form
  const form = InitializeForm();



// Function to trigger file input click
const handleImportClick = () => {
  document.getElementById('fileInput')?.click();
};



const lookupData = [
  { EmpCode: 1, EmpName: 'John Doe' },
  { EmpCode: 2, EmpName: 'Jane Smith' },
  { EmpCode: 3, EmpName: 'Alice Johnson' },
];


const handleValueSelect = (updatedData: any) => {
    setattendanceData([...updatedData]);
  };


  return (
    <div className="w-full h-full px-5 py-5 lg:px-20 lg:pb-14 ">
      <div className="absolute top-0 right-0 z-5">
        <Sidebar docCd={docCd} docKey={docKey} form={form} />
      </div>

      <MaxWidthWrapper className="px-5 py-2 lg:px-10 lg:pb-6 ">
        <div className="border-solid">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
              <DocumentHeader
                setFormValues={setFormValues}
                docCd={docCd}
                docKey={docKey}
                router={router}
                getValues={form.getValues}
                fieldToPrint='EmployeeVariableAllDedDet'
              />
              

              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 py-1">
              <div className="grid gap-1 py-1 lg:col-span-2">
                  
                  <DPDatePicker 
                    name="processdate"
                    formcontrol={form.control} 
                    labelText = {getLanguageByEnglish("Process Date")}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPComboBox
                    disabled={false}
                    name="payrollperiod"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("payroll period")}
                    data={Company} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("payrollperiod", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                  
                  <DPDatePicker 
                    name="fromdate"
                    formcontrol={form.control} 
                    labelText = {getLanguageByEnglish("From Date")}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                  
                  <DPDatePicker 
                    name="todate"
                    formcontrol={form.control} 
                    labelText = {getLanguageByEnglish("To Date")}
                  />
                </div>
                
                <div className="grid gap-1 py-1 lg:col-span-3">
                  <DPComboBox
                    disabled={false}
                    name="EmpCompID"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("EmpCompID")}
                    data={Company} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("EmpCompID", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-3">
                  <DPComboBox
                    disabled={false}
                    name="DeptCode"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Dept Code")}
                    data={Department} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("DeptCode", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                    <DPInputBrowse
                    formcontrol={form.control}
                    name="empcode"
                    disabled={false}
                    keyExp="empcode"
                    type="text"
                    labelText={getLanguageByEnglish("Emp Code")}
                    placeholder={getLanguageByEnglish("")}
                    onValueChange={(field, value) => {
                        form.setValue("empcode", value);
                    }}
                    getValues={form.getValues} // Pass getValues here
                    setValue={form.setValue} // Pass setValue here
                    docCd={docCd} // Pass docCd
                    fieldMapping={[ // Pass fieldMapping
                        { column: 'empcode', formField: 'empcode' },
                        { column: 'empname', formField: 'empname' },
                    ]}
                    />

                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                        <DPInput
                            formcontrol={form.control}
                            name="empname"
                            disabled={false}
                            type="text"
                            labelText={getLanguageByEnglish("Employee Name")}
                            placeholder={getLanguageByEnglish("")}
                            onValueChange={(field, value) => {
                            
                            }}
                        />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                        <DPInput
                            formcontrol={form.control}
                            name="refcode"
                            disabled={false}
                            type="text"
                            labelText={getLanguageByEnglish("RefCode")}
                            placeholder={getLanguageByEnglish("")}
                            onValueChange={(field, value) => {
                                form.setValue("refcode", value);
                            }}
                        />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                    <div className="flex items-end justify-start gap-4">
                        <Button type="button">Fill Reference</Button>
                        <Button type='button'>Refresh</Button>
                        
                    </div>
                </div>
                <div className="grid gap-1 py-1 lg:col-span-6">
                  <DPTextArea
                    formcontrol={form.control}
                    name="Remarks"
                    disabled={false}
                    labelText={getLanguageByEnglish("Remarks")}
                    placeholder={getLanguageByEnglish("...")}
                    onValueChange={(field, value) => form.setValue("Remarks", value)}
                  />
                </div>
              </div>
              <div className="mt-10">
               <GenericGrid<EmployeeAttendanceDailyDetGrid>
                  columns={[
                    { dataField: 'AttDate', caption: 'Date', dataType: 'date' },
                    { dataField: 'EmpCode',
                       caption: 'Emp Code',
                       inputType: 'lookup', // Optional attribute
                       dataSource: lookupData, // Optional data source for lookup
                       columnMapping: { // Pass column mapping directly within EmpCode column
                         EmpCode: 'EmpCode',
                         EmpName: 'EmpName',
                       },
                       },
                       { dataField: 'EmpName', caption: 'Employee Name' },
                    { dataField: 'Status', caption: 'Status' },
                    
                    { dataField: 'InTime', caption: 'In Time',dataType: 'time' },
                    { dataField: 'OutDate', caption: 'Out Date', dataType: 'date' },
                    { dataField: 'OutTime', caption: 'Out Time',dataType: 'time' },
                    { dataField: 'totalhours', caption: 'Total Hours', disabled:true },
                    { dataField: 'totalminutes', caption: 'Total Minutes', disabled:true },
                    { dataField: 'RefCode', caption: 'References' },
                    { dataField: 'RefCode2', caption: 'Sub Referance' },
                    { dataField: 'Idle', caption: 'Idle' },
                  ]}
                  dataSource={attendanceData}
                  onValueSelect={handleValueSelect}
                  lastColumn="Idle"
                />
              </div>
              
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AttendanceEntry;
