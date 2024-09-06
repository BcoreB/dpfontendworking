"use client"
import React, { useCallback, useEffect, useState } from 'react'
import {  z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
 } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

import DPInput from '@/components/ui/dpinput'
import { InitializeForm, formSchema, DisplayForm, saveData,leaveType } from './formSchema'
import { useRouter , useSearchParams } from 'next/navigation'
import getLanguageByEnglish from '@/utils/languages'
import { DocStaus } from '@/dptype'
import DPComboBox from '@/components/ui/dpcombobox'
import DocumentHeader from '@/components/Menu/documentHeader'
import Sidebar from '@/components/Menu/SideBar';
import LeaveManagementGrid from './formGrid'
const LeaveEntry = () => {
  const searchParams = useSearchParams()
  const docCd = 5;
  const docKey = 101;
  const [formValues,setFormValues]=useState< z.infer<typeof formSchema>>()
  
  const [type, setType] = useState<{ value: string; label: string }[]>([]);

  const router = useRouter();
   // 1. Define your form.
  const form =  InitializeForm()
    // 2. Define a submit handler.


  
  return (
    <div className='w-full h-full  px-5 py-5  lg:px-20 lg:pb-14 lg:pt-8'>
      <div className='absolute top-0 right-0 z-5'>
        <Sidebar
          docCd={docCd}
          docKey={docKey}
          form={form}
        />
      </div>
      
    <MaxWidthWrapper className='px-5 py-5  lg:px-10 lg:pb-6 lg:pt-10'>
      
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
                    <div className="grid grid-cols-1 lg:grid-cols-6   gap-4 py-1">
                        
                        <div className="grid gap-1 py-1 lg:col-span-1">
                          <DPInput
                                      formcontrol={form.control}
                                      name="refno"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Ref No")}
                                      placeholder={getLanguageByEnglish("00000")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("refno", value)}}  
                            />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-3">
                              <DPComboBox 
                                      disabled = {false}
                                      name="leavetype"
                                      formcontrol={form.control} 
                                      labelText = {getLanguageByEnglish("Leave Type")}
                                      data={leaveType}
                                      onValueChange={(field,value)=>{
                                          form.setValue("leavetype", value)
                                          // console.log(value)
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
                                    const dateValue = new Date(value);
                                    form.setValue("date", dateValue);
                                }}
                            />
                        </div>
                        
                          <div className="grid gap-1 py-1 lg:col-span-3">
                            <DPComboBox 
                                      disabled = {false}
                                      name="payroleperiod"
                                      formcontrol={form.control} 
                                      labelText = {getLanguageByEnglish("Payrole Period")}
                                      data={leaveType}
                                      onValueChange={(field,value)=>{
                                          form.setValue("payrolperiod", value)
                                          // console.log(value)
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
                                    const dateValue = new Date(value);
                                    form.setValue("fromdate", dateValue);
                                }}
                            />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-1">
                            <DPInput
                                formcontrol={form.control}
                                name="fromdate"
                                disabled={false}
                                type="date"
                                labelText={getLanguageByEnglish("To Date")}
                                placeholder={getLanguageByEnglish("")}
                                onValueChange={(field, value) => {
                                    const dateValue = new Date(value);
                                    form.setValue("fromdate", dateValue);
                                }}
                            />
                        </div>
                          
                  </div>
          </form>
        </Form>
      </div>
      <div className='mt-10'>
        <LeaveManagementGrid/>
      </div>
    </MaxWidthWrapper>
    </div>
  )
  
}

export default LeaveEntry