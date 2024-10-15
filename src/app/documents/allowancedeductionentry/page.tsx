"use client";
import React, { useEffect, useState } from 'react';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DPInput from '@/components/ui/dpinput';
import { InitializeForm,payrollPeriod, formSchema, AlldedCode, Company, Department, inputType } from './formSchema';
import { useRouter } from 'next/navigation';
import getLanguageByEnglish from '@/utils/languages';
import DPComboBox from '@/components/ui/dpcombobox';
import DocumentHeader from '@/components/Menu/documentHeader';
// import Sidebar from '@/components/Menu/SideBar';
import Sidebar from '@/components/Menu/documentSideBar';
import DPInputBrowse from '@/components/ui/dpinputbrowse';
import DPDatePicker from '@/components/ui/dpdatepicker';

const LeaveEntry = () => {
  const docCd = 10;
  const docKey = 101;
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();

  const router = useRouter();


  

  // Initialize the form
  const form = InitializeForm();

   


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
                <div className="grid gap-1 py-1 lg:col-span-4">
                  <DPComboBox
                    disabled={false}
                    name="payrollperiodcode"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Payrole Period")}
                    data={payrollPeriod} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("payrollperiodcode", value);
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
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPComboBox
                    disabled={false}
                    name="alldedcode"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("All DED Code")}
                    data={AlldedCode} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("alldedcode", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPComboBox
                    disabled={false}
                    name="empcompid"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Payrole Period")}
                    data={Company} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("empcompid", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPComboBox
                    disabled={false}
                    name="deptcode"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Payrole Period")}
                    data={Department} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("deptcode", value);
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
                  <DPComboBox
                    disabled={false}
                    name="inputtype"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Input Type")}
                    data={AlldedCode} // You can populate this with actual data
                    onValueChange={(field, value) => {
                      form.setValue("inputtype", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                    <div className="flex items-end justify-center gap-4">
                        <Button >Import Excel</Button>
                        <Button >Export Excel</Button>
                        <a href="">Load Data</a>
                    </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default LeaveEntry;
