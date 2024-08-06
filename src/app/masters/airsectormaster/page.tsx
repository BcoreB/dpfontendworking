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

const AccomodationMaster = () => {
  const searchParams = useSearchParams()
  const docCd = 2;
  const [formValues,setFormValues]=useState< z.infer<typeof formSchema>>()
  const [isModalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState<{ value: string; label: string }[]>([]);
  

  const router = useRouter();
   // 1. Define your form.
  const form =  InitializeForm()
    // 2. Define a submit handler.


   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormValues(values);
    alert(JSON.stringify(values, null, 2)); // Show form values as alert
  };
   const addNew = useCallback(() => {
    
      
    const url = '/masters/airsectormaster'
    router.push( url);
    alert("Added new")
    window.location.reload()
    
  },[])
  // const saveData = useCallback(() => {
    
      
  //   const url = '/masters/airsectormaster'
  //   router.push( url);
  //   alert("Saved Data")
  //   window.location.reload()
    
  // },[])
  const deleteData = useCallback(() => {
    
      
    const url = '/masters/airsectormaster'
    router.push( url);
    alert("Saved Data")
    window.location.reload()
    
  },[])
  const printData = useCallback(() => {
    
      
    const url = '/masters/airsectormaster'
    router.push( url);
    alert("printed Data")
    window.location.reload()
    
  },[])
  const onLogClick = useCallback(() => {
    setModalVisible(true);
  }, []);
  const draftData = useCallback(() => {
    
      
    const url = '/masters/airsectormaster'
    router.push( url);
    // alert("drafted data")
    window.location.reload()
    
  },[])
  
  return (
    <div className='w-full h-full  px-5 py-5  lg:px-20 lg:pb-14 lg:pt-8'>
     
    <MaxWidthWrapper className='px-5 py-5  lg:px-20 lg:pb-6 lg:pt-20'>
      
      <div className='border-solid'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit( onSubmit)} className="space-y-8">
                      {/* <NasterHeader onNewButtonClicked={addNew} onSaveButtonClicked={onSubmit}/> */}
                      <FormHeader
                        onNew={addNew}
                        onSave={form.handleSubmit(onSubmit)} // Pass the form's submit handler
                        onDelete={deleteData}
                        onPrint={printData}
                        onLog={onLogClick}
                        onDraft={draftData}
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
    <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)} title="Log Data" docCd={docCd} />
    </div>
  )
  
}

export default AccomodationMaster