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
import { InitializeForm, formSchema, DisplayForm, saveData, defaultAirlines} from './formSchema'
import { useRouter , useSearchParams } from 'next/navigation'
import getLanguageByEnglish from '@/utils/languages'
import { DocStaus } from '@/dptype'

import DPComboBox from '@/components/ui/dpcombobox'
import FormHeader from '@/components/Menu/formHeader';
import Sidebar from '@/components/Menu/SideBar';
import Modal from '@/components/Menu/modal';

const AirSectorMaster = () => {
  const searchParams = useSearchParams()
  const docCd = 2;
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
    <MaxWidthWrapper className='px-5 py-5  lg:px-20 lg:pb-6 lg:pt-20'>
      
      <div className='border-solid'>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
                      {/* <NasterHeader onNewButtonClicked={addNew} onSaveButtonClicked={onSubmit}/> */}
                      <FormHeader
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
                                      name="airseccode"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Airsec code")}
                                      placeholder={getLanguageByEnglish("00000")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("airseccode", value)}}  
                            />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-4">
                          <DPInput
                                      formcontrol={form.control}
                                      name="airsecname"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Airsec Name")}
                                      placeholder={getLanguageByEnglish("Al Arab")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("airsecname", value)}}  
                            />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-1">
                          <DPInput
                                      formcontrol={form.control}
                                      name="cost"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Cost")}
                                      placeholder={getLanguageByEnglish("00000")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("cost", value)}}  
                            />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-3">
                              <DPComboBox 
                                      disabled = {false}
                                      name="defaultairline"
                                      formcontrol={form.control} 
                                      labelText = {getLanguageByEnglish("Default Airline")}
                                      data={defaultAirlines}
                                      onValueChange={(field,value)=>{
                                          form.setValue("defaultairline", value)
                                          // console.log(value)
                                      }}
                                    />
                          </div>
                          <div className="grid gap-1 py-1 lg:col-span-3">
                              <DPInput
                                          formcontrol={form.control}
                                          name="remarks"
                                          disabled={false}
                                          type="text"
                                          labelText ={getLanguageByEnglish("Remarks")}
                                          placeholder={getLanguageByEnglish("Type Something")}
                                          onValueChange={(field,value)=>{
                                              form.setValue("remarks", value)}}  
                                />
                            </div>
                          
                  </div>
          </form>
        </Form>
      </div>
    </MaxWidthWrapper>
    </div>
  )
  
}

export default AirSectorMaster