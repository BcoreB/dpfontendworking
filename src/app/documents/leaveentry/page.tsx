"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DPInput from '@/components/ui/dpinput';
import { InitializeForm, formSchema, DisplayForm, saveData, leaveType, EmployeeData } from './formSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import getLanguageByEnglish from '@/utils/languages';
import { DocStaus } from '@/dptype';
import DPComboBox from '@/components/ui/dpcombobox';
import DocumentHeader from '@/components/Menu/documentHeader';
import Sidebar from '@/components/Menu/SideBar';
import LeaveManagement from './formGrid';

const LeaveEntry = () => {
  const searchParams = useSearchParams();
  const docCd = 5;
  const docKey = 101;
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();
  
  const [type, setType] = useState<{ value: string; label: string }[]>([]);
  const router = useRouter();
  
  // 1. Define your form.
  const form = InitializeForm();
  
  // 2. Define a submit handler.
  const updateEmployeeData = (uodatedDoc: EmployeeData[]) => {
    const sortedDocs = [...uodatedDoc].sort((a, b) => a.rowid - b.rowid);

    sortedDocs.forEach((doc, index) => {
      doc.rowid = index + 1; // Assuming rowid starts from 1
    });
    form.setValue('employeeData', sortedDocs);
    console.log('employeeData', sortedDocs);
  };

  // Function to handle the button click and alert form values
  const handleAlertFormValues = () => {
    const values = form.getValues();
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className='w-full h-full px-5 py-5 lg:px-20 lg:pb-14 lg:pt-8'>
      <div className='absolute top-0 right-0 z-5'>
        <Sidebar
          docCd={docCd}
          docKey={docKey}
          form={form}
        />
      </div>
      
      <MaxWidthWrapper className='px-5 py-5 lg:px-10 lg:pb-6 lg:pt-10'>
        <div className='border-solid'>
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
                    data={leaveType}
                    onValueChange={(field, value) => {
                      form.setValue("leavetype", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                  <DPInput
                    formcontrol={form.control}
                    name="date"
                    disabled={false}
                    type="date"
                    labelText={getLanguageByEnglish("Date")}
                    placeholder={getLanguageByEnglish("")}
                    onValueChange={(field, value) => {
                      const dateValue = value instanceof Date ? value.toISOString().substring(0, 10) : value;
                      form.setValue("date", dateValue);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-3">
                  <DPComboBox 
                    disabled={false}
                    name="payroleperiod"
                    formcontrol={form.control} 
                    labelText={getLanguageByEnglish("Payrole Period")}
                    data={leaveType}
                    onValueChange={(field, value) => {
                      form.setValue("payroleperiod", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                  <DPInput
                    formcontrol={form.control}
                    name="fromdate"
                    disabled={false}
                    type="date"
                    labelText={getLanguageByEnglish("Attendance from Date")}
                    placeholder={getLanguageByEnglish("")}
                    onValueChange={(field, value) => {
                      const dateValue = value instanceof Date ? value.toISOString().substring(0, 10) : value;
                      form.setValue("fromdate", dateValue);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                  <DPInput
                    formcontrol={form.control}
                    name="todate"
                    disabled={false}
                    type="date"
                    labelText={getLanguageByEnglish("To Date")}
                    placeholder={getLanguageByEnglish("")}
                    onValueChange={(field, value) => {
                      const dateValue = value instanceof Date ? value.toISOString().substring(0, 10) : value;
                      form.setValue("todate", dateValue);
                    }}
                  />
                </div>
              </div>
              <div className='mt-10'>
                <LeaveManagement data={form.getValues('employeeData')} updateEmployeeData={updateEmployeeData} />
              </div>
              <div className='mt-5'>
                <Button onClick={handleAlertFormValues}>Alert Form Values</Button>
              </div>
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default LeaveEntry;
