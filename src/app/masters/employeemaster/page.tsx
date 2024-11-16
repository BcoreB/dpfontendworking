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
import { getEmployeeCompany, getEmployeeDepartments, getEmployeeDesignations, getEmployeeReligion, getEmployeeReportingTo, getEmployeeStatus, 
  getEmployeeworklocations, getEmployeeworksections, getNationalities  } from '@/app/datalayer/employeedata'
import DPInput from '@/components/ui/dpinput'
import { InitializeForm, formSchema, DisplayFrom, saveData, salutationData, sex, maritalstatus, bloodgroup, relation, DPDocument, DPContract } from './formschema'
import { useRouter , useSearchParams } from 'next/navigation'
import {getLanguageByEnglish} from '@/utils/languages'
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

import EmployeeDocuments from './documentslist'
import PopupForm from './PopupFormEmployeeDocument'
import EmployeeContract from './contractlist'
import EmployeeSalary from './salarypage'

interface EmployeeMasterProps {
  code: string | { code: string };
}

const EmployeeMaster = () => {
  const searchParams = useSearchParams()

  const [employeeCompany , setEmployeeCompany]=useState<{ value: string; label: string }[]>([]);
  const [department , setDepartment]=useState<{ value: string; label: string,compid: string }[]>([]);
  const [filtereddepartment , setFilteredDepartment]=useState<{ value: string; label: string,compid: string }[]>([]);
  const [designation , setDesignation]=useState<{ value: string; label: string }[]>([]);
  const [worklocation , setWorklocation]=useState<{ value: string; label: string }[]>([]);
  const [worksection , setWorksection]=useState<{ value: string; label: string }[]>([]);
  const [reportingTo , setReportingTo]=useState<{ value: string; label: string }[]>([]);
  const [employeeStatus , setEmployeeStatus]=useState<{ value: string; label: string }[]>([]);

  const [religion , setEmployeeReligion]=useState<{ value: string; label: string }[]>([]);

  const [employeenationalities , setEmployeeNationalities]=useState<{ value: string; label: string }[]>([]);
  const [typeCode,setTypeCode]=useState<string>()
  const [catCode,setCatCode]=useState<string>()
  const [docStatus,setDocStatus]=useState<DocStaus>(DocStaus.NEW)
  const [formValues,setFormValues]=useState< z.infer<typeof formSchema>>()
  const [keyCode,setKeyCode]=useState('')
  const [selectedFile, setSelectedFile] = useState( '');
  const [selectedImageFile, setSelectedImageFile] = useState( '');

  const [showDialog, setShowDialog] = useState(false);

  const router = useRouter();
   // 1. Define your form.
  const form =  InitializeForm()
    // 2. Define a submit handler.

  

  
// Function to get file extension from MIME type
const getFileExtension = (mime: string) => {
  const mimeParts = mime.split('/');
  const exten=mimeParts[1].split(';')[0]
  if (exten) {
     return `.${exten}`;
  }
  return ''; // Default to empty string if MIME type is not in the expected format
};
  const handleUpload =async  () => {
    if (selectedFile) {
      // Generate a unique filename (you can use a library like `uuid` for this)

      // delete existing file
      if(keyCode && keyCode!='0'  && keyCode!='' && selectedImageFile){
        
        const fileName=selectedImageFile
        try {
          const delresponse = await fetch(`/api/deleteImage`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName }),
          });
    
          if (!delresponse.ok) {
            throw new Error('Failed to delete image');
          }
    
          const data = await delresponse.json();
          console.log(data.message); // Log the response message
        } catch (error) {
          console.error('Error:', error);
        }
      }

      // add selected one

      const extnType=getFileExtension(selectedFile)
      const filename = `${form.getValues('empcode')}${extnType}`;
  
      // Use fetch or your preferred method to upload the file to the server
      // For simplicity, this example assumes you're using the Fetch API
      
      const addresponse = await fetch(`/api/upload-image?filename=${filename}`, {
        method: 'POST',
        body: selectedFile,
        headers: {
          'Content-Type': `image/${extnType.substring(1)}`,
        },
      });
    }
  };
  const handleFileChange = (e:any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        //const t = getFileNames(keyCode)


        setSelectedFile(reader.result as string);
      }
      reader.readAsDataURL(file)
    }
  }
  useEffect(()=>{
    let code=""
    if(searchParams) 
    {

    
    const queryParams = Object.fromEntries(searchParams.entries());
  
    code = queryParams.code
    const type= queryParams.type 
    const category = queryParams.category
    const mode = queryParams.mode
    if(mode)
      {
        const status = mode.toUpperCase() as DocStaus
        setDocStatus(status)
      }
    
    
    if(category)
      setCatCode(category)
    if (type)
      setTypeCode(type.toString())
    }
    const fetchEmployeeCompanyData = async () => {
      const data = await getEmployeeCompany();
 
      setEmployeeCompany(data)
   
    };
    fetchEmployeeCompanyData();
    const fetchEmployeeStatusData = async () => {
      const data = await getEmployeeStatus();
 
      setEmployeeStatus(data)
    };
    fetchEmployeeStatusData();

    const fetchEmployeeReligionData = async () => {
      const data = await getEmployeeReligion();
 
      setEmployeeReligion(data)
    };
    fetchEmployeeReligionData();

    const fetchEmployeeDepartmentData = async () => {
      const data = await getEmployeeDepartments();
      setDepartment(data)
      setFilteredDepartment(data)
    };
    fetchEmployeeDepartmentData();
    const fetchEmployeeDesignationData = async () => {
      const data = await getEmployeeDesignations();
 
      setDesignation(data)
    };
    fetchEmployeeDesignationData();
    const fetchEmployeeWorkLocationData = async () => {
      const data = await getEmployeeworklocations();
      setWorklocation(data)
    };
    fetchEmployeeWorkLocationData();
    const fetchEmployeeNationalityData = async () => {
      const data = await getNationalities();
      setEmployeeNationalities(data)
    };
    fetchEmployeeNationalityData();

    fetchEmployeeWorkLocationData();
    const fetchEmployeeWorksectionData = async () => {
      const data = await getEmployeeworksections();
      setWorksection(data)
    };
    fetchEmployeeWorksectionData();
    
    const fetchEmployeeReportingToData = async () => {
      const data = await getEmployeeReportingTo();
 
      setReportingTo(data)
    };

    fetchEmployeeReportingToData();
    
    if(code && code!='0'  && code!='')
    {
      
      
      DisplayFrom(form,code)
      setKeyCode(code)
 
   
    }
      


      

  },[])

  useEffect(()=>{
    if(keyCode && keyCode!='0'  && keyCode!=''){
      getFileNames(keyCode).then(fileNames => {
         if(fileNames[0])
            setSelectedImageFile(fileNames[0]); // This will log the array of file names
        


          })
  }else
  setSelectedImageFile('defaultprofilepic.jpg');
},[keyCode])


  useEffect(()=>{
    if(typeCode)
      form.setValue('empcompid', typeCode)
    if(catCode)
    form.setValue('deptcode', catCode)

  },[typeCode,catCode])
 

    const changeDept=(compid: string)=>{
      const filteredData = department.filter(p => p.compid===compid)
      setFilteredDepartment(filteredData)
    }

    const addNew = useCallback(() => {
    
      
      const url = '/masters/employeemaster'
      // const urlString = format(url);
      setSelectedImageFile('defaultprofilepic.jpg');
      router.push( url);
    
      window.location.reload()
      
    },[])
    const {   onOpen   } = useDialog(); // Use the useDialog hook
    const onDialogButtonClick =useCallback( (result:string)=>{
      console.log('onDialogButtonClick')
      setShowDialog(false)
        if(result==='Continue')
        {
          console.log('Continue formValues',formValues)
          if(formValues)
            {
              console.log('onDialogButtonClick formValues',formValues)
              saveData(form,formValues,docStatus)
              handleUpload();

            }

        }
          
    },[form, formValues, docStatus])
    
    const onSubmit=async ( values: z.infer<typeof formSchema> )=> {

  
         setFormValues(values);
      

        // saveData(form,values,docStatus)
        setShowDialog(true)
        // onOpen();
    }
   
     // Use effect to open dialog when showDialog becomes true
  useEffect(() => {
    if (showDialog) {
      onOpen();
    }
  }, [showDialog, onOpen]);


    const onLogClick = () =>{
 
      form.setValue("basicsalary",100.00)
    console.log(form)
       
    }

    const updateEmployeeDocument=(uodatedDoc: DPDocument[])=>{
      const sortedDocs = [...uodatedDoc].sort((a, b) => a.rowid - b.rowid);

      sortedDocs.forEach((doc, index) => {
        doc.rowid = index + 1; // Assuming rowid starts from 1
      });
      form.setValue('employeedocuments',sortedDocs)

    }

    const updateEmployeeContract=(uodatedDoc: DPContract[])=>{
      const sortedDocs = [...uodatedDoc].sort((a, b) => a.rowid - b.rowid);

      sortedDocs.forEach((doc, index) => {
        doc.rowid = index + 1; // Assuming rowid starts from 1
      });
      form.setValue('employeecontractdet',sortedDocs)
      console.log('employeecontractdet',sortedDocs)

    }

    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])
   
    return (
      <>
        {isClient ?
        <MaxWidthWrapper>
            <div className="border-solid ">
              
                <Form {...form}>
                    <form onSubmit={form.handleSubmit( onSubmit)} className="space-y-8">
                      {/* <NasterHeader onNewButtonClicked={addNew} onSaveButtonClicked={onSubmit}/> */}
                    <header>
                      <div className='flex justify-between bg-purple-100'>
                        <div>
                          <Button  variant='ghost' type="button" onClick={addNew}>New</Button>
                          <Button  variant='ghost'  type="submit" >Save</Button>
                          <Button  variant='ghost'  type="button">Delete</Button>
                  
                        </div>
                        <div>
                          <Button  variant='ghost'  type="button"  >Print</Button>
                          <Button  variant='ghost' type="button" onClick={onLogClick}>Log</Button>
                          <Button  variant='ghost'  type="button">Draft</Button>
                        </div>
                      </div>
                    </header>
                    
                        <div className="grid grid-cols-1 lg:grid-cols-6   gap-1 py-1">
                            <div className="grid gap-1 lg:row-span-3   py-1">
                              <div className='flex flex-col items-center justify-center border-solid'>
                                  <Image
                                        id='profilepic'
                                        key={keyCode}
                                        src= {selectedFile || `/images/${selectedImageFile}?${Date.now()}` || `/images/defaultprofilepic.jpg`}
                                        width={100}
                                        height={100}
                                        alt={getLanguageByEnglish("Picture of the author")}
                                        className='m-0 p-0 rounded-md' 
                                        
                                  />
                              
                                  {/* <Button className=''>Browse</Button> */}
                                    <Input id="picture" type="file" onChange={handleFileChange} 
                                      className='w-12 text-white bg-transparent border-none hover:bg-inherit m-auto p-0 items-center'/>
                               </div>                      
                             </div>

                            <div className="grid gap-1 py-1">
                                <DPInput
                                    formcontrol={form.control}
                                    name="empcode"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Employee Code")}
                                    placeholder={getLanguageByEnglish("00000")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("empcode", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1">
                                <DPInput
                                    formcontrol={form.control}
                                    name="localid"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Local Id (CPR)")}
                                    placeholder={getLanguageByEnglish("00000")}
                                    onValueChange={(field,value)=>{
                                        console.log('localid',value)
                                        form.setValue("localid", value)
                                        console.log('form.setValue',form.getValues('localid')) 
                                      
                                      }}
                            
                                    
                                />
                                
                            </div>
                            <div className="grid gap-1 py-1"></div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPDatePicker 
                                    name="doj"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Date Of Joining")}
                                  />

                        
                            </div>
                             {/* Status */}
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="status"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Status")}
                                    data={employeeStatus}
                                    onValueChange={(field,value)=>{
                                        form.setValue("status", value)
                                      
                                    }}
                                  />
                            </div>
                           {/* Salutation */}
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="salutation"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Salutation")}
                                    data={salutationData}
                                    onValueChange={(field,value)=>{
                                        form.setValue("salutation", value)
                                      
                                    }}
                                  />
                            </div>
                            
                            <div className="grid gap-1 py-1 lg:col-span-4">
                                <DPInput
                                    formcontrol={form.control}
                                    name="empname"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Employee Name")}
                                    placeholder={getLanguageByEnglish("Employee Name")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("empname", value)}}
                                />
                            </div>          
                            <div className="grid gap-1 py-1 lg:col-span-5">
                                <DPInput
                                    formcontrol={form.control}
                                    name="empnamearb"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Employee Name In Arabic")}
                                    placeholder={getLanguageByEnglish("Employee Name In Arabic")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("empnamearb", value)}}
                                />
                            </div>
                             {/* Employee Designation */}
                            <div className="grid gap-1 py-1 lg:col-span-2 ">
                                <DPComboBox 
                                    disabled = {false}
                                    name="desgcode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Designation")}
                                    data={designation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("desgcode", value)
                                      
                                    }}
                                  />
                            </div>
                           {/* Employee Comapy */}
                            <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPComboBox 
                                    disabled = {typeCode!==undefined}
                                    name="empcompid"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Company")}
                                    data={employeeCompany}
                                    onValueChange={(field,value)=>{
                                        form.setValue("empcompid", value)
                                        changeDept(value)
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                             {/* Employee Department */}
                             <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPComboBox 
                                  disabled = {catCode!==undefined}
                                    name="deptcode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Department")}
                                    data={filtereddepartment}
                                    onValueChange={(field,value)=>{
                                        form.setValue("deptcode", value)
                                      
                                    }}
                                  />
                            </div>      
                            {/* Work Location */}
                            <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPComboBox 
                                    disabled = {false}
                                    name="wloccode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Work Location")}
                                    data={worklocation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("wloccode", value)
                                      
                                    }}
                                  />
                            </div>                   
                            {/* Work Section */}
                            <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPComboBox 
                                    disabled = {false}
                                    name="seccode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Work Section")}
                                    data={worksection}
                                    onValueChange={(field,value)=>{
                                        form.setValue("seccode", value)
                                      
                                    }}
                                  />
                            </div>            
                            {/* Reporting To */}
                            <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPComboBox 
                                    disabled = {false}
                                    name="reportingto"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Reporting To")}
                                    data={reportingTo}
                                    onValueChange={(field,value)=>{
                                        form.setValue("reportingto", value)
                                      
                                    }}
                                  />
                            </div>                                     
                        </div> 
                        <Accordion type="multiple"  className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className='font-extrabold'>Personal</AccordionTrigger>
                          <AccordionContent>
                          <div className="grid grid-cols-1 lg:grid-cols-6   gap-1 py-1">
                            <div className="grid gap-1 py-1 lg:col-span-2">
                            <DPTextArea
                                    formcontrol={form.control}
                                    name="presentaddress"
                                    disabled={false}
 
                                    labelText ={getLanguageByEnglish("Present Address")}
                                    placeholder={getLanguageByEnglish("Present Address")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("presentaddress", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                               <DPTextArea
                                    formcontrol={form.control}
                                    name="permentaddress"
                                    disabled={false}
 
                                    labelText ={getLanguageByEnglish("Permenant Address")}
                                    placeholder={getLanguageByEnglish("Permenant Address")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("permentaddress", value)}}
                                    
                                />

                                
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                               <DPTextArea
                                    formcontrol={form.control}
                                    name="personalremarks"
                                    disabled={false}
 
                                    labelText ={getLanguageByEnglish("Personal Remarks")}
                                    placeholder={getLanguageByEnglish("Personal Remarks")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("personalremarks", value)}}
                                    
                                />

                                
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                            <DPInput
                                    formcontrol={form.control}
                                    name="telephone"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Telephone Number")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("telephone", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                            <DPInput
                                    formcontrol={form.control}
                                    name="telephoneext"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Telephone Extension")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("telephoneext", value)}}
                                    
                                />
                            </div>
                            
                            <div className="grid gap-1 py-1 lg:col-span-1">
                            <DPInput
                                    formcontrol={form.control}
                                    name="mobile1"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Mobile -1")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("mobile1", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                            <DPInput
                                    formcontrol={form.control}
                                    name="mobile2"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Mobile -2")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("mobile2", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                            <DPInput
                                    formcontrol={form.control}
                                    name="mobileht"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Home Town Mobile Number")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("mobileht", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                            <DPInput
                                    formcontrol={form.control}
                                    name="emailpersonal"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Email - Personal")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("emailpersonal", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                              <DPInput
                                      formcontrol={form.control}
                                      name="emailofficial"
                                      disabled={false}
                                      type="text"
                                      labelText ={getLanguageByEnglish("Email - Official")}
                                      placeholder={getLanguageByEnglish("")}
                                      onValueChange={(field,value)=>{
                                          form.setValue("emailofficial", value)}}
                                      
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPComboBox 
                                    disabled = {false}
                                    name="nationalitycode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Nationality")}
                                    data={employeenationalities}
                                    onValueChange={(field,value)=>{
                                        form.setValue("nationalitycode", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPDatePicker 
                                    name="dob"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Date Of Birth")}
                                  />

                        
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="sex"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Gender")}
                                    data={sex}
                                    onValueChange={(field,value)=>{
                                        form.setValue("sex", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="religioncode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Religion")}
                                    data={religion}
                                    onValueChange={(field,value)=>{
                                        form.setValue("religioncode", value)
                                         
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="meritalstatus"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Marital Status")}
                                    data={maritalstatus}
                                    onValueChange={(field,value)=>{
                                        form.setValue("meritalstatus", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="bloodgroup"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Blood Group")}
                                    data={bloodgroup}
                                    onValueChange={(field,value)=>{
                                        form.setValue("bloodgroup", value)
                                     
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1"></div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                            <DPInput
                                    formcontrol={form.control}
                                    name="fathername"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Father Name")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("fathername", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                            <DPInput
                                    formcontrol={form.control}
                                    name="mothername"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Mother Name")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("mothername", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                            <DPInput
                                    formcontrol={form.control}
                                    name="spausename"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Spause Name")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("spausename", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-6"> <label htmlFor="" className='font-light '>Emergency &rarr;</label></div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                            <DPInput
                                    formcontrol={form.control}
                                    name="emergencycontactperon"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Contact Person")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("emergencycontactperon", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                            <DPInput
                                    formcontrol={form.control}
                                    name="emergencycontactpersonno"
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Contact No")}
                                    placeholder={getLanguageByEnglish("")}
                                    onValueChange={(field,value)=>{
                                        form.setValue("emergencycontactpersonno", value)}}
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-2">
                                <DPComboBox 
                                    disabled = {false}
                                    name="emergencycontactpersonrelation"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Relation")}
                                    data={relation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("emergencycontactpersonrelation", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                          </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>
                            Documents
                            </AccordionTrigger>
                          <AccordionContent>
                          <div className="grid grid-cols-1 lg:grid-cols-6   gap-1 py-1">
                            <div className="grid gap-1 py-1 lg:col-span-6">
                              {
                                
                             <EmployeeDocuments data={form.getValues('employeedocuments')} empCode={form.getValues('empcode')} 
                             updateEmployeeDocument={updateEmployeeDocument}/>
                              }
                              
                          </div>
                          </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Contract</AccordionTrigger>
                          <AccordionContent>
                          <div className="grid grid-cols-1 lg:grid-cols-6   gap-1 py-1">
                            <div className="grid gap-1 py-1 lg:col-span-6">
                              {
                                
                                <EmployeeContract data={form.getValues('employeecontractdet')} empCode={form.getValues('empcode')} deptcode={form.getValues('deptcode')} 
                                updateEmployeeContract={updateEmployeeContract}/>
                              }
                              
                          </div>
                          </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="AssetDetails">
                          <AccordionTrigger>Asset Details</AccordionTrigger>
                          <AccordionContent>
                          Asset Details 
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="salary">
                          <AccordionTrigger>Salary Details</AccordionTrigger>
                          <AccordionContent>
                          {/* <div className="grid grid-cols-1 lg:grid-cols-6   gap-1 py-1">
                          <div className="grid gap-1 py-1 lg:col-span-6">
                              <EmployeeSalary name="salary"/>

                   
                          </div>
                          </div> */}
            <div className="grid grid-cols-1 lg:grid-cols-6   gap-1 py-1">
                <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="gradecode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Grade")}
                                    data={relation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("gradecode", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>

                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="salarytype"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Salary Type")}
                                    data={relation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("salarytype", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="payrollperiodcode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Payroll Period")}
                                    data={relation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("payrollperiodcode", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="calendorcode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Calendar")}
                                    data={relation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("calendorcode", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="paymentmethod"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Payment")}
                                    data={relation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("paymentmethod", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="bankcode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Bank")}
                                    data={relation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("bankcode", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1">
                                <DPInput
                                    formcontrol={form.control}
                                    name={`bankaccountno`}
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Account No")}
                                    placeholder={getLanguageByEnglish("123456789")}
                                   
                                    onValueChange={(field,value)=>{
                                      form.setValue("bankaccountno",  (value))}}
                            
                                    
                                />
                            </div>
                            <div className="grid gap-1 py-1 lg:col-span-1">
                                <DPComboBox 
                                    disabled = {false}
                                    name="salarycurrencycode"
                                    formcontrol={form.control} 
                                    labelText = {getLanguageByEnglish("Currency")}
                                    data={relation}
                                    onValueChange={(field,value)=>{
                                        form.setValue("salarycurrencycode", value)
                                        
                                        // console.log(value)
                                      
                                    }}
                                  />
                            </div>
                            <div className="grid gap-1 py-1">
                                <DPInput
                                    formcontrol={form.control}
                                    name={`basicsalary`}
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Basic Salary")}
                                    placeholder={getLanguageByEnglish("0.000")}
                                   
                                    onValueChange={(field,value)=>{
                                      form.setValue("basicsalary", Number(value))}}
                            
                                    
                                />
                            </div>
                
            </div>
 
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value=">AccountsDetails">
                          <AccordionTrigger>Accounts Details</AccordionTrigger>
                          <AccordionContent>
                          Accounts Details 
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger> Qualification </AccordionTrigger>
                          <AccordionContent>
                          Qualification  
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      </form>
                    </Form>
            </div>
            {
              showDialog &&  <DPAlertDialog setResult={onDialogButtonClick} />

            }
           
        </MaxWidthWrapper>
        : ''
      }
          
      </>
      )
 
}

export default EmployeeMaster