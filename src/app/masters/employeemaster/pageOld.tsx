"use client"
import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MyCombobox from '@/components/ui/mycombobox';
import MyDatePicker from '@/components/ui/mydatepicker';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
 
import { cn } from '@/lib/utils';
import { TranslationDictionary } from '@/utils/TranslationDictionary';
import { getEmployeeCompany, getEmployeeDepartments, getEmployeeDesignations, getEmployeeReportingTo, getEmployeeStatus, getEmployeeworklocations, getEmployeeworksections } from '@/app/datalayer/employeedata';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { DatePicker } from '@/components/ui/datepickerold';
import DatePicker from 'react-datepicker';



const EmployeeMaster = () => {
  const form = useForm();
  const {register,control} = form;
  const [isClient, setIsClient] = useState(false)

  
  const [employeeCompany , setEmployeeCompany]=useState<{ value: string; label: string }[]>([]);
  const [employeeStatus , setEmployeeStatus]=useState<{ value: string; label: string }[]>([]);
  const [department , setDepartment]=useState<{ value: string; label: string }[]>([]);
  const [designation , setDesignation]=useState<{ value: string; label: string }[]>([]);
  const [worklocation , setWorklocation]=useState<{ value: string; label: string }[]>([]);
  const [worksection , setWorksection]=useState<{ value: string; label: string }[]>([]);
  const [reportingTo , setReportingTo]=useState<{ value: string; label: string }[]>([]);
  const [language ,setLanguage ] =useState<{ value: string; label: string }[]>([]);
  
  useEffect(() => {
    setIsClient(true)
    //  const fetchlanguageData = async () => {
    //    const data = await TranslationDictionary();
    
    //    setLanguage(data)

    //  };

    // fetchlanguageData();
    const fetchEmployeeData = async () => {
      const data = await getEmployeeCompany();
 
      setEmployeeCompany(data)
    };

    fetchEmployeeData();

    const fetchEmployeeStatusData = async () => {
      const data = await getEmployeeStatus();
 
      setEmployeeStatus(data)
    };

    fetchEmployeeStatusData();

    const fetchEmployeeDepartmentData = async () => {
      const data = await getEmployeeDepartments();
 
      setDepartment(data)
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


  }, []);
  const onSubmit = () => {
  };
  const handleChange = (field: string, value: string | Date ) =>{
    console.log(field,value)
  }
  const getLanguageByEnglish = (english: string): string  => {
    // const person = language.find((p) => p.label === english);
    // return person ? person.value : english;
     return english;
  };
 
 
  return (
    

    <MaxWidthWrapper>
            {/* <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">*/}
                <div className="border-solid"> 
                <form onSubmit={onSubmit} className='p-4 border-solid '>
                  <div className="grid grid-cols-1 lg:grid-cols-6   gap-1 py-2">
 
 

                    {/* Employee Photo */}
                  <div className="grid gap-1 lg:row-span-3   py-1">
                    <div className='flex flex-col items-center justify-center border-solid'>
                      <Image
                          id='profilepic'
                          src="/Images/profile.jpg"
                          width={100}
                          height={100}
                          alt={getLanguageByEnglish("Picture of the author")}
                          className='m-0 p-0 rounded-md'
                        />
                        {/* <Button className=''>Browse</Button> */}
                        <Button className='bg-transparent  hover:bg-inherit m-0 p-0 '>{getLanguageByEnglish("Browse")}</Button>
                    </div>                      
                  </div>   
                  <div className="grid gap-1 py-2 ">
                    <Label htmlFor="empcode">{getLanguageByEnglish("Employee Code")} </Label>
                      <Input     
                          id='empcode'
                          type='text'          
                          placeholder="0000000"
                          {...register("empcode")}
                       />
                    </div>
                    <div className="grid gap-1 py-2 ">
                    <Label htmlFor="localid"> {getLanguageByEnglish("Local Id (CPR)")}</Label>
                      <Input               
                          id='localid'
                          type='text'          
                          placeholder="0000000"
                          {...register("localid")}
                       />
                    </div>                    
                    <div className="grid gap-1 py-2 lg:col-span-1 ">
                      <Label htmlFor="doj">{getLanguageByEnglish("Date Of Joining")}</Label>
                      <MyDatePicker id="doj" defdate={null} onValueChange={handleChange} />

                    </div>   

                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="Status">Status{getLanguageByEnglish("Status")}</Label>
                       <MyCombobox data={employeeStatus}
                          placeholder={getLanguageByEnglish("Status")}
                          id='status'
                          onValueChange={handleChange}
                        />
                    </div>  

 
                    <div className="grid gap-1 py-2 col-span-1">
                      <Label htmlFor="Salutation">{getLanguageByEnglish("Salutation")}</Label>
                      <Input               
                          placeholder={getLanguageByEnglish("Salutation")} 
                       />
                    </div>  

                    <div className="grid gap-1 py-2 lg:col-span-4">
                      <Label htmlFor="EmpName">{getLanguageByEnglish("Employee Name")}</Label>
                      <Input               
                          placeholder={getLanguageByEnglish("Employee Name")} 
                       />
                    </div>

                    <div className="grid gap-1 py-2 lg:col-span-5">
                      <Label htmlFor="EmpNameArb">{getLanguageByEnglish("Employee Name In Arabic")}</Label>
                      <Input               
                          placeholder={getLanguageByEnglish("Employee Name In Arabic")}
                       />
                    </div>     
                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="DesgCode">{getLanguageByEnglish("Designation")}</Label>
                       <MyCombobox data={designation}
                          placeholder={getLanguageByEnglish("Designation")} 
                          id='DesgCode'
                          onValueChange={handleChange}
                        />
                    </div>  

                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="EmpCompID">{getLanguageByEnglish("Company")}</Label>
                       <MyCombobox data={employeeCompany}
                          placeholder={getLanguageByEnglish("Company")} 
                          id='EmpCompID'
                          onValueChange={handleChange}
                        />
                    </div>     
                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="DeptCode">{getLanguageByEnglish("Department")}</Label>
                      <MyCombobox data={department}
                          placeholder={getLanguageByEnglish("Department")} 
                          id='DeptCode'
                          onValueChange={handleChange}
                        />
                    </div> 
                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="WLocCode">{getLanguageByEnglish("Work Location")}</Label>
                      <MyCombobox data={worklocation}
                          placeholder={getLanguageByEnglish("Work Location")} 
                          id='WLocCode'
                          onValueChange={handleChange}
                        />
                    </div> 
                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="WSecCode">{getLanguageByEnglish("Work Section")}</Label>
                      <MyCombobox data={worksection}
                          placeholder={getLanguageByEnglish("Work Section")}
                          id='WSecCode'
                          onValueChange={handleChange}
                        />
                    </div>          
                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="ReportingTo">{getLanguageByEnglish('Reporting To')} </Label>
                      <MyCombobox data={reportingTo}
                          placeholder={getLanguageByEnglish('Reporting To')}
                          id='ReportingTo'
                          onValueChange={handleChange}
                        />
                    </div>                                                        
                     {/*<div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="DeptCode">Department</Label>
                       <ComboBoxResponsive />
                    </div>     
                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="WLocCode">Work Location</Label>
                       <ComboBoxResponsive />
                    </div>     
                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="WSecCode">Work Section</Label>
                       <ComboBoxResponsive />
                    </div>     
                    <div className="grid gap-1 py-2 lg:col-span-2 ">
                      <Label htmlFor="reportingto">Reporting To</Label>
                       <ComboBoxResponsive />
                    </div>      */}
                </div>
                </form>
                <DevTool control={control}/>
                 </div>
               {/* </div> */}
         {/* </div> */}
     </MaxWidthWrapper>
    
  )
}

export default EmployeeMaster