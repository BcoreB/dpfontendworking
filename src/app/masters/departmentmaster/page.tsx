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
import DpRadioGroup from '@/components/ui/dpradiogroup'
import { InitializeForm, formSchema, DisplayForm, saveData, company} from './formSchema'
import { useRouter , useSearchParams } from 'next/navigation'
import getLanguageByEnglish from '@/utils/languages'
import { DocStaus } from '@/dptype'

import DPComboBox from '@/components/ui/dpcombobox'
import FormHeader from '@/components/Menu/formHeader';
import Sidebar from '@/components/Menu/SideBar';
import Modal from '@/components/Menu/modal';
import FormModal from '../formModel'

const DepartmentMaster = () => {
  const searchParams = useSearchParams()
  const docCd = 3;
  const docKey = 101;
  const [formValues,setFormValues]=useState< z.infer<typeof formSchema>>()
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFormModalVisible, setFormModalVisible] = useState(false);
  const [type, setType] = useState<{ value: string; label: string }[]>([]);

  const router = useRouter();
   // 1. Define your form.
  const form =  InitializeForm()
    // 2. Define a submit handler.

    const handleOpenModal = () => {
      setFormModalVisible(true);
    };
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
                        setModalVisible={setModalVisible}
                        router={router}
                        getValues={form.getValues}
                      />
                       <Button onClick={handleOpenModal}>
                          Open Modal
                        </Button>
                    <div className="grid grid-cols-1 lg:grid-cols-6   gap-4 py-1">
                        
                        <div className="grid gap-1 py-1 lg:col-span-1">
                          <DPInput
                                      formcontrol={form.control}
                                      name="depcode"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Department code")}
                                      placeholder={getLanguageByEnglish("00000")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("depcode", value)}}  
                            />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-3">
                          <DPInput
                                      formcontrol={form.control}
                                      name="depname"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Department Name")}
                                      placeholder={getLanguageByEnglish("Al Arab")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("depname", value)}}  
                            />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-2">
                              <DPComboBox 
                                      disabled = {false}
                                      name="company"
                                      formcontrol={form.control} 
                                      labelText = {getLanguageByEnglish("Company")}
                                      data={company}
                                      onValueChange={(field,value)=>{
                                          form.setValue("company", value)
                                          // console.log(value)
                                      }}
                                    />
                        </div>
                        <div className="grid gap-1 py-1 lg:col-span-1">
                          <DPInput
                                      formcontrol={form.control}
                                      name="deptHeadCode"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Dept head code")}
                                      placeholder={getLanguageByEnglish("00000")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("deptHeadCode", value)}}  
                            />
                        </div>
                        
                        
                          <div className="grid gap-1 py-1 lg:col-span-3">
                              <DPInput
                                          formcontrol={form.control}
                                          name="deptHeadName"
                                          disabled={false}
                                          type="text"
                                          labelText ={getLanguageByEnglish("Dept head name")}
                                          placeholder={getLanguageByEnglish("Enter the name")}
                                          onValueChange={(field,value)=>{
                                              form.setValue("deptHeadName", value)}}  
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-3">
                              
                            </div>
                          
                  </div>
          </form>
        </Form>
      </div>
    </MaxWidthWrapper>
    <FormModal isVisible={isFormModalVisible} onClose={() => setFormModalVisible(false)} title="Modal Data" docCd={docCd} />
    <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)} title="Log Data" docCd={docCd} />
    </div>
  )
  
}

export default DepartmentMaster