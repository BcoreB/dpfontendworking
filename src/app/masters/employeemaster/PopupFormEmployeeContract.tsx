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
import { DPContract, InitializeEmployeeContractForm, formSchemaEmployeeContract } from './formschema'
 

const conType = [
  {
    value: "gen",
    label: "General",
  },
  {
    value: "fam",
    label: "Family",
  }
];
 
  
interface PopupFormProps {
    onClose: () => void;
     data:  DPContract|undefined  ;
     updateRow : (data:DPContract|undefined )=> void;
  }
  const PopupFormEmployeeContract: React.FC<PopupFormProps> = ({ onClose,data,updateRow }) => {
    const form =  InitializeEmployeeContractForm()
    const [empCodeEnabled,setEmpCodeEnabled]=useState(false)
 
    
   

    // 2. Define a submit handler.

    const onSubmit = async (values: z.infer<typeof formSchemaEmployeeContract>, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        console.log('onSubmit', values);
        // Your submission logic here
      }
      const onSave = () => {
        const empcodeValue = form.getValues('empcode');
        console.log('onSave - empcode value:', empcodeValue); // Check empcode value
        const data:DPContract= {
            id:form.getValues("id"),
            compid:form.getValues("compid"),
            empcode:form.getValues("empcode"),

   
            contype : form.getValues("contype"),
            conno : form.getValues("conno"),
            startdate : form.getValues("startdate"),
            enddate : form.getValues("enddate"),
            startbasic : form.getValues("startbasic"),
            lastbasic : form.getValues("lastbasic"),
            noofdays : form.getValues("noofdays"),
            remarks : form.getValues("remarks"),
            rowid : form.getValues("rowid"),
            extendeddate : form.getValues("extendeddate"),
            indpaid : form.getValues("indpaid"),
            deptcode : form.getValues("deptcode"),
            refcompid : form.getValues("refcompid"),
            refsiteid : form.getValues("refsiteid"),
            refdocno : form.getValues("refdocno"),
            refdoccd : form.getValues("refdoccd"),

             
            //docname:((documents.find(item => item.value === form.getValues("code"))?.label===undefined)? "" : (documents.find(item => item.value === form.getValues("code")))?.label ),
        }
        updateRow(data)
      }
  
   
  useEffect(()=>{
 
    console.log('check code',data)
    if(data)
    {
        form.setValue("compid",data.compid)
        form.setValue("conno",data.conno)
        form.setValue("contype",data.contype)
        form.setValue("deptcode",data.deptcode)
        form.setValue("empcode",data.empcode)
        form.setValue("enddate",data.enddate)
        form.setValue("extendeddate",data.extendeddate)
 
        form.setValue("id",data.id)
        form.setValue("indpaid",data.indpaid)
        form.setValue("lastbasic",data.lastbasic)
        form.setValue("noofdays",data.noofdays)
        form.setValue("refcompid",data.refcompid)
        form.setValue("refdoccd",data.refdoccd)
        form.setValue("refdocno",data.refdocno)
        form.setValue("refsiteid",data.refsiteid)
        form.setValue("remarks",data.remarks)
        form.setValue("rowid",data.rowid)
        form.setValue("startbasic",data.startbasic)
        form.setValue("startdate",data.startdate)


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
                        <div className='p-1 py-1'><p>Employee Contract</p></div>
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
                                    <div className="grid gap-1 py-1 lg:col-span-1">
                                        <DPInput
                                            formcontrol={form.control}
                                            name="deptcode"
                                            disabled={false}
                                            type="hidden"
                                            labelText ={getLanguageByEnglish("Department")}
                                            placeholder={getLanguageByEnglish("Department")}
                                            onValueChange={(field,value)=>{
                                                console.log('value',value)
                                                form.setValue("deptcode", value)}}
                                            
                                        />
                                         <Input type='text' value={form.getValues('deptcode')} disabled={true}/>
                                        
                                    </div>
                                    <div className="grid gap-1 py-1 lg:col-span-1 z-50">
                                        <DPComboBox 
                                            disabled = {data?.contype!==""}
                                            name="contype"
                                            formcontrol={form.control} 
                                            labelText = {getLanguageByEnglish("Type")}
                                            data={conType}
                                            onValueChange={(field,value)=>{
                                                form.setValue("contype", value)
                                            
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-1 py-1 lg:col-span-1">
                                        <DPInput
                                            formcontrol={form.control}
                                            name="conno"
                                            disabled={false}
                                            type="number"
                                            labelText ={getLanguageByEnglish("Con.No")}
                                            placeholder={getLanguageByEnglish("00")}
                                            onValueChange={(field,value)=>{
                                                if (!isNaN(Number(value))) {
                                                    form.setValue("conno", Number(value));
                                                }}}
                                            
                                        />
                                    </div>
   
                                    <div className="grid gap-1 py-1 lg:col-span-1" >
                                        <DPDatePicker 
                                            name="startdate"
                                            formcontrol={form.control} 
                                            labelText = {getLanguageByEnglish("Start Date")}
                                        />                        
                                </div>
                                <div className="grid gap-1 py-1 lg:col-span-1" >
                                        <DPDatePicker 
                                            name="enddate"
                                            formcontrol={form.control} 
                                            labelText = {getLanguageByEnglish("End Date")}
                                        />                        
                                </div>
                                <div className="grid gap-1 py-1 lg:col-span-1" >
                                        <DPDatePicker 
                                        
                                            name="extendeddate"
                                            formcontrol={form.control} 
                                            labelText = {getLanguageByEnglish("Extended Date")}
                                        />                        
                                </div>
                                <div className="grid gap-1 py-1 lg:col-span-1">
                                        <DPInput
                                            formcontrol={form.control}
                                            name="noofdays"
                                            disabled={false}
                                            type="number"
                                            labelText ={getLanguageByEnglish("NoOfDays")}
                                            placeholder={getLanguageByEnglish("00")}
                                            onValueChange={(field,value)=>{
                                                if (!isNaN(Number(value))) {
                                                    form.setValue("noofdays", Number(value));
                                                }}}
                                            
                                        />
                                    </div> 
                                <div className="grid gap-1 py-1 lg:col-span-1">
                                        <DPInput
                                            formcontrol={form.control}
                                            name="startbasic"
                                            disabled={false}
                                            type="number"
                                            labelText ={getLanguageByEnglish("Start Basic")}
                                            placeholder={getLanguageByEnglish("000.000")}
                                            onValueChange={(field,value)=>{
                                                if (!isNaN(Number(value))) {
                                                    form.setValue("startbasic", Number(value));
                                                }}}
                                            
                                        />
                                    </div>

                                    <div className="grid gap-1 py-1 lg:col-span-1">
                                        <DPInput
                                            formcontrol={form.control}
                                            name="lastbasic"
                                            disabled={false}
                                            type="number"
                                            labelText ={getLanguageByEnglish("Last Basic")}
                                            placeholder={getLanguageByEnglish("000.000")}
                                            onValueChange={(field,value)=>{
                                                if (!isNaN(Number(value))) {
                                                    form.setValue("lastbasic", Number(value));
                                                }}}
                                            
                                        />
                                    </div>
     
                                    <div className="grid gap-1 py-1 lg:col-span-2 z-50">
                                    <DPInput
                                            formcontrol={form.control}
                                            name="remarks"
                                            disabled={false}
                                            type="text"
                                            labelText ={getLanguageByEnglish("Remarks")}
                                            placeholder={getLanguageByEnglish("Remarks")}
                                            onValueChange={(field,value)=>{
                                   
                                                form.setValue("remarks", value)}}
                                            
                                        />
                                    </div>
                                    <div className="grid gap-1 py-1 lg:col-span-1"></div>
                                     
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

export default PopupFormEmployeeContract