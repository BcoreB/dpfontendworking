"use client";
import React, { useEffect, useState } from 'react';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DPInput from '@/components/ui/dpinput';
import { InitializeForm,EmployeeLeaveDetSave, formSchema, EmployeeLeaveDet, leaveType, payrolPeriod } from './formSchema';
import { useRouter } from 'next/navigation';
import getLanguageByEnglish from '@/utils/languages';
import DPComboBox from '@/components/ui/dpcombobox';
import DocumentHeader from '@/components/Menu/documentHeader';
// import Sidebar from '@/components/Menu/SideBar';
import Sidebar from '@/components/Menu/documentSideBar';
import TrailManagement from './trailGrid';
import DPDatePicker from '@/components/ui/dpdatepicker';
import LeaveManagement from './LeaveDetails';

const LeaveEntry = () => {
  const docCd = 6;
  const docKey = 101;
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();
  const [employeeLeaveDetails, setEmployeeLeaveDetails] = useState<EmployeeLeaveDet[]>([]);
  const router = useRouter();


  

  // Initialize the form
  const form = InitializeForm();

  useEffect(()=>{
    

    // console.log('data',data)
  
       
      const fetchData=async ()=>{
          if(employeeLeaveDetails)
            {
              const newData = employeeLeaveDetails.map((doc, index) => (
            
                {

                  fromdate: doc.FromDate || new Date(), // Adjust as necessary
                  todate: doc.ToDate || new Date(),     // Adjust as necessary
                  id: doc.id,
                  empcode: doc.EmpCode || 'default_empcode', // Adjust as necessary
                  remarks: doc.Remarks || 'default_remarks', // Adjust as necessary
                  leavetypecode: doc.LeaveType || 'default_code',
                  rowid: doc.RowId || 0,  // Adjust as necessary
 
                })) as unknown as EmployeeLeaveDetSave[]  ;
                form.setValue('employeeLeaveDet', newData);
    

            }
             
          }
        
        fetchData();
 
 

 },[employeeLeaveDetails])

  // Callback to handle updating the employee data in LeaveManagement component
  const updateEmployeeData = (updatedData: EmployeeLeaveDet[]) => {
    setEmployeeLeaveDetails(updatedData);
  };

   // New state variable to track fromDate and toDate
   const [fromDate, setFromDate] = useState<Date | null>(null);
   const [toDate, setToDate] = useState<Date | null>(null);
 
   // Function to calculate number of days
   const calculateNoDays = (fromDate: Date | null, toDate: Date | null): number | null => {
     if (fromDate && toDate) {
       const differenceInTime = toDate.getTime() - fromDate.getTime();
       const differenceInDays = differenceInTime / (1000 * 3600 * 24);
       return differenceInDays + 1;  // Add 1 to include both start and end date
     }
     return null;
   };
 
   // Callback function to handle date change
   const handleDateChange = (field: string, value: Date | null) => {
     if (field === "fromdate") {
       setFromDate(value);
     } else if (field === "todate") {
       setToDate(value);
     }
 
     // If both dates are present, calculate the number of days and update employeeData
     if (fromDate && toDate) {
       const updatedEmployeeData = employeeLeaveDetails.map((item) => ({
         ...item,
         NoDays: calculateNoDays(fromDate, toDate),
       }));
       setEmployeeLeaveDetails(updatedEmployeeData);
     }
   };

  // Function to handle the button click and alert form values
  const handleAlertFormValues = () => {

    const values = form.getValues();
    console.log('Form Values:', values);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="w-full h-full px-5 py-5 lg:px-20 lg:pb-14 lg:pt-8">
      <div className="absolute top-0 right-0 z-5">
        <Sidebar docCd={docCd} docKey={docKey} form={form} />
      </div>

      <MaxWidthWrapper className="px-5 py-5 lg:px-10 lg:pb-6 lg:pt-10">
        <div className="border-solid">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
              <DocumentHeader
                setFormValues={setFormValues}
                docCd={docCd}
                docKey={docKey}
                router={router}
                getValues={form.getValues}
              />
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 py-1">
                <div className="grid gap-1 py-1 lg:col-span-1">
                  <DPInput
                    formcontrol={form.control}
                    name="refno"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Ref No")}
                    placeholder={getLanguageByEnglish("00000")}
                    onValueChange={(field, value) => {
                      form.setValue("refno", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-3">
                  <DPComboBox
                    disabled={false}
                    name="leavetype"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Leave Type")}
                    data={leaveType} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("leavetype", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                  <DPDatePicker 
                    name="date"
                    formcontrol={form.control} 
                    labelText = {getLanguageByEnglish("Date")}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-3">
                  <DPComboBox
                    disabled={false}
                    name="payrolperiod"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Payrole Period")}
                    data={payrolPeriod} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("payrolperiod", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                  
                  <DPDatePicker 
                    name="fromdate"
                    formcontrol={form.control} 
                    labelText = {getLanguageByEnglish("Attendance from Date")}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                  
                  <DPDatePicker 
                    name="todate"
                    formcontrol={form.control} 
                    labelText = {getLanguageByEnglish("To Date")}
                  />
                </div>
              </div>
              <LeaveManagement data={employeeLeaveDetails} updateEmployeeData={updateEmployeeData} />
        
              {/* <div className="mt-5">
                <Button onClick={handleAlertFormValues}>Alert Form Values</Button>
              </div> */}
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default LeaveEntry;
