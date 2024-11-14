"use client"
import React, { useCallback, useEffect, useState } from 'react'
import {  z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
 } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import DPDatePicker from '@/components/ui/dpdatepicker'
import DPComboBox from '@/components/ui/dpcombobox'
import { getSysDocs  } from '@/app/datalayer/employeedata'
import DPInput from '@/components/ui/dpinput'
 

import {getLanguageByEnglish} from '@/utils/languages'
import DPTextArea from '@/components/ui/dptextarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { DPDocument, InitializeEmployeeDocumentForm, formSchemaEmployeeDocument } from './formschema'
 

const docType = [
  {
    value: "gen",
    label: "General",
  }
];
 
  
interface PopupFormProps {
    onClose: () => void;
     data:  DPDocument|undefined  ;
     updateRow : (data:DPDocument|undefined )=> void;
  }
  const PopupFormEmployeeDocument: React.FC<PopupFormProps> = ({ onClose,data,updateRow }) => {
    const form =  InitializeEmployeeDocumentForm()
    const [empCodeEnabled,setEmpCodeEnabled]=useState(false)
    const [documents , setDocuments]=useState<{ value: string; label: string }[]>([]);
    
   

    // 2. Define a submit handler.

    const onSubmit = async (values: z.infer<typeof formSchemaEmployeeDocument>, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        console.log('onSubmit', values);
        // Your submission logic here
      }
      const onSave = () => {
        const empcodeValue = form.getValues('empcode');
        console.log('onSave - empcode value:', empcodeValue); // Check empcode value
        const data:DPDocument= {
            id:form.getValues("id"),
            code:form.getValues("code"),
            compid:form.getValues("compid"),
            empcode:form.getValues("empcode"),
            expirydate:form.getValues("expirydate"),
            issuedate:form.getValues("issuedate"),
            no:form.getValues("no"),
            notes:form.getValues("notes"),
            ref:form.getValues("ref"),
            rowid:form.getValues("rowid"),
            type:form.getValues("type"),
            docname: (documents.find(item => item.value === form.getValues("code"))?.label) || "",
            //docname:((documents.find(item => item.value === form.getValues("code"))?.label===undefined)? "" : (documents.find(item => item.value === form.getValues("code")))?.label ),
        }
        updateRow(data)
      }
  
   
  useEffect(()=>{
   const fetchData = async () => {
      try {
        const dcdata = await getSysDocs();
        setDocuments(dcdata);
        console.log('data-document', dcdata);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
    console.log('check code',data)
    if(data)
    {
        form.setValue("code",data.code)
        form.setValue("compid",data.compid)
   
        form.setValue("empcode",data.empcode)
        setEmpCodeEnabled(true)

        form.setValue("expirydate",data.expirydate)
        form.setValue("issuedate",data.issuedate)
        form.setValue("no",data.no)
        form.setValue("notes",data.notes)
        form.setValue("ref",data.ref)
        form.setValue("rowid",data.rowid)
        form.setValue("type",data.type)
        form.setValue("id",data.id)


    }

    console.log('empcode-1',form.getValues('empcode'))
    
  },[])
 
    
    return (
        
        <>
          <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
        // onClick={onClose} // Close the popup if overlay is clicked
      />
        
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-400 p-8 rounded-md border" style={{ zIndex: 1000 }}>

     
            <div className="border-solid ">
                <Form {...form}>
                    <form onSubmit={(event) => form.handleSubmit((values) => onSubmit(values, event))} className="space-y-8">
                    {/* </form><form onSubmit={form.handleSubmit( onSubmit)} className="space-y-8"> */}
                     <div className='flex justify-between bg-slate-300 border-red-400 bottom-1'>
                        <div className='p-1 py-1'><p>Employee Document</p></div>
                        <button
                                        onClick={onClose}
                                        className="white-red-500 hover:bg-slate-500 text-black font-bold py-2 px-4 rounded border-l-indigo-50"
                                        aria-label="Close"
                                        >
                                        X
                        </button>

                    </div>   
                    <div className="grid grid-cols-1 lg:grid-cols-4   gap-1 py-1">
     
                                <div className="grid gap-1 py-1 lg:col-span-1">
                                        {/* <DPInput
                                            formcontrol={form.control}
                                            name="empcode"
                                            disabled={true}
                                            type="text"
                                            labelText ={getLanguageByEnglish("Employee Code")}
                                            placeholder={getLanguageByEnglish("00000")}
                                            onValueChange={(field,value)=>{
                                                console.log('value',value)
                                                }}
                                            
                                        /> */}
                                        <DPInput
                                            formcontrol={form.control}
                                            name="empcode"
                                            disabled={false}
                                            type="hidden"
                                            labelText ={getLanguageByEnglish("Employee Code")}
                                            placeholder={getLanguageByEnglish("00000")}
                                            onValueChange={(field,value)=>{
                                                console.log('value',value)
                                                form.setValue("empcode", value)}}
                                            
                                        />
                                        <Input type='text' value={form.getValues('empcode')} disabled={true}/>
                                        
                                    </div>
                                    <div className="grid gap-1 py-1 lg:col-span-1 z-50">
                                        <DPComboBox 
                                            disabled = {data?.code!==""}
                                            name="code"
                                            formcontrol={form.control} 
                                            labelText = {getLanguageByEnglish("Document")}
                                            data={documents}
                                            onValueChange={(field,value)=>{
                                                form.setValue("code", value)
                                            
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-1 py-1 lg:col-span-1">
                                        <DPComboBox 
                                            disabled = {false}
                                            name="type"
                                            formcontrol={form.control} 
                                            labelText = {getLanguageByEnglish("Document Type")}
                                            data={docType}
                                            onValueChange={(field,value)=>{
                                                form.setValue("type", value)
                                            
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-1 py-1 lg:col-span-1"></div>
                                    <div className="grid gap-1 py-1 lg:col-span-1">
                                        <DPInput
                                            formcontrol={form.control}
                                            name="no"
                                            disabled={false}
                                            type="text"
                                            labelText ={getLanguageByEnglish("Number")}
                                            placeholder={getLanguageByEnglish("00000000")}
                                            onValueChange={(field,value)=>{
                                                form.setValue("no", value)}}
                                            
                                        />
                                    </div>
                                    
                                    
                                    <div className="grid gap-1 py-1 lg:col-span-1" >
                                        <DPDatePicker 
                                            name="issuedate"
                                            formcontrol={form.control} 
                                            labelText = {getLanguageByEnglish("Issue Date")}
                                        />                        
                                </div>
                                <div className="grid gap-1 py-1 lg:col-span-1"  >
                                        <DPDatePicker 
                                            name="expirydate"
                                            formcontrol={form.control} 
                                            labelText = {getLanguageByEnglish("Expiry Date")}
                                        />                        
                                </div>    
                                <div className="grid gap-1 py-1 lg:col-span-1"></div>
                                <div className="grid gap-1 py-1 lg:col-span-1">
                                        <DPInput
                                            formcontrol={form.control}
                                            name="ref"
                                            disabled={false}
                                            type="text"
                                            labelText ={getLanguageByEnglish("Reference")}
                                            placeholder={getLanguageByEnglish("Reference")}
                                            onValueChange={(field,value)=>{
                                                form.setValue("ref", value)}}
                                            
                                        />
                                    </div>
                                <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPInput
                                    formcontrol={form.control}
                                    name="notes"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Notes")}
                                    placeholder={getLanguageByEnglish("Notes")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("notes", value)}}
                                    
                                />
                            </div>                           
                            </div>  

                            
                            <div className='flex justify-end'>
                         
                        <button
                                         type='button'
                                        onClick= {onClose} 
                                        className="white-red-500 hover:bg-slate-500 text-black font-bold py-2 px-4 rounded border-l-indigo-50"
                                        aria-label="Close"
                                        >
                                        Cancel
                        </button>
                        <button
                                          type='button'
                                          onClick={onSave}
                                        className="white-red-500 hover:bg-slate-500 text-black font-bold py-2 px-4 rounded border-l-indigo-50"
                                        aria-label="Close"
                                        >
                                        Save
                        </button>

                    </div>   
                    </form>
                </Form>
            </div>
            </div>                                    
            </>
      )
 
}

export default PopupFormEmployeeDocument