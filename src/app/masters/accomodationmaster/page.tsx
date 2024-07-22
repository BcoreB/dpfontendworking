"use client"
import React, { useCallback, useEffect, useState } from 'react'
import {  z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
 } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import DPDatePicker from '@/components/ui/dpdatepicker'
import DPComboBox from '@/components/ui/dpcombobox'
import DPInput from '@/components/ui/dpinput'
import { InitializeForm, formSchema, DisplayForm, saveData, accoType } from './formSchema'
import { useRouter , useSearchParams } from 'next/navigation'
import getLanguageByEnglish from '@/utils/languages'
import { DocStaus } from '@/dptype'
import { DPAlertDialog, useDialog } from '@/components/ui/dpdialogbox'
import { getFileNames } from '@/lib/Image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import DPTextArea from '@/components/ui/dptextarea'



import Navbar from '@/app/components/Navbar'

const AccomodationMaster = () => {
  const searchParams = useSearchParams()
  const [formValues,setFormValues]=useState< z.infer<typeof formSchema>>()

  const [type, setType] = useState<{ value: string; label: string }[]>([]);
  

  const router = useRouter();
   // 1. Define your form.
  const form =  InitializeForm()
    // 2. Define a submit handler.

    const onSubmit=async ( values: z.infer<typeof formSchema> )=> {

  
      setFormValues(values);
   

     // saveData(form,values,docStatus)
     setShowDialog(true)
     // onOpen();
   }

   const addNew = useCallback(() => {
    
      
    const url = '/masters/accomodationmaster'
    router.push( url);
    alert("Added new")
    window.location.reload()
    
  },[])
  const saveData = useCallback(() => {
    
      
    const url = '/masters/accomodationmaster'
    router.push( url);
    alert("Saved Data")
    window.location.reload()
    
  },[])
  const deleteData = useCallback(() => {
    
      
    const url = '/masters/accomodationmaster'
    router.push( url);
    alert("Saved Data")
    window.location.reload()
    
  },[])
  const printData = useCallback(() => {
    
      
    const url = '/masters/accomodationmaster'
    router.push( url);
    alert("printed Data")
    window.location.reload()
    
  },[])
  const onLogClick = useCallback(() => {
    
      
    const url = '/masters/accomodationmaster'
    router.push( url);
    alert("Logging data")
    window.location.reload()
    
  },[])
  const draftData = useCallback(() => {
    
      
    const url = '/masters/accomodationmaster'
    router.push( url);
    // alert("drafted data")
    window.location.reload()
    
  },[])
  
  return (
    <div className='w-full h-full  px-5 py-5  lg:px-20 lg:pb-14 lg:pt-8'>
      <Navbar />
    <MaxWidthWrapper className='px-5 py-5  lg:px-20 lg:pb-6 lg:pt-20'>
      
      <div className='border-solid'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit( onSubmit)} className="space-y-8">
                      {/* <NasterHeader onNewButtonClicked={addNew} onSaveButtonClicked={onSubmit}/> */}
                    <header>
                      <div className='flex justify-between bg-purple-100 mb-5'>
                        <div>
                          <Button  variant='ghost' type="button" onClick={addNew}>New</Button>
                          <Button  variant='ghost'  type="submit" onClick={saveData} >Save</Button>
                          <Button  variant='ghost'  type="button" onClick={deleteData}>Delete</Button>
                  
                        </div>
                        <div>
                          <Button  variant='ghost'  type="button" onClick={printData}  >Print</Button>
                          <Button  variant='ghost' type="button" onClick={onLogClick}>Log</Button>
                          <Button  variant='ghost'  type="button" onClick={draftData}>Draft</Button>
                        </div>
                      </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-6   gap-4 py-1">
                        
                        <div className="grid gap-1 py-1 lg:col-span-2">
                          <DPInput
                                      formcontrol={form.control}
                                      name="accocode"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Accomodation code")}
                                      placeholder={getLanguageByEnglish("00000")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("accocode", value)}}  
                            />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-4">
                          <DPInput
                                      formcontrol={form.control}
                                      name="accname"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Accomodation Name")}
                                      placeholder={getLanguageByEnglish("Al Arab")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("accname", value)}}  
                            />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-2">
                                  <DPComboBox 
                                      disabled = {false}
                                      name="accotype"
                                      formcontrol={form.control} 
                                      labelText = {getLanguageByEnglish("Type")}
                                      data={accoType}
                                      onValueChange={(field,value)=>{
                                          form.setValue("accotype", value)
                                          // console.log(value)
                                      }}
                                    />
                          </div>
                          <div className="grid gap-1 py-1 lg:col-span-2">
                            <DPInput
                                        formcontrol={form.control}
                                        name="buildno"
                                        disabled={false}
                                        type="text"
                                        labelText ={getLanguageByEnglish("Building No")}
                                        placeholder={getLanguageByEnglish("000000")}
                                        onValueChange={(field,value)=>{
                                            form.setValue("buildno", value)}}  
                              />
                          </div>
                          <div className="grid gap-1 py-1 lg:col-span-2">
                              <DPInput
                                          formcontrol={form.control}
                                          name="roadno"
                                          disabled={false}
                                          type="text"
                                          labelText ={getLanguageByEnglish("Road No")}
                                          placeholder={getLanguageByEnglish("000000")}
                                          onValueChange={(field,value)=>{
                                              form.setValue("roadno", value)}}  
                                />
                          </div>
                          <div className="grid gap-1 py-1 lg:col-span-2">
                              <DPInput
                                          formcontrol={form.control}
                                          name="blockno"
                                          disabled={false}
                                          type="text"
                                          labelText ={getLanguageByEnglish("Block No")}
                                          placeholder={getLanguageByEnglish("000000")}
                                          onValueChange={(field,value)=>{
                                              form.setValue("blockno", value)}}  
                                />
                          </div>
                              <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPInput
                                      formcontrol={form.control}
                                      name="flatno"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Flat No")}
                                      placeholder={getLanguageByEnglish("000000")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("flatno", value)}}  
                                />
                             </div>
                             <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPInput
                                      formcontrol={form.control}
                                      name="area"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Area")}
                                      placeholder={getLanguageByEnglish("Manama")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("area", value)}}  
                                />
                             </div>
                            <div className="grid gap-1 py-1 lg:col-span-6">
                              <DPTextArea
                                    formcontrol={form.control}
                                    name="remarks"
                                    disabled={false}
 
                                    labelText ={getLanguageByEnglish("Remarks")}
                                    placeholder={getLanguageByEnglish("Type something...")}
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

export default AccomodationMaster