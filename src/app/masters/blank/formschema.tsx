// formUtils.ts
import { useForm } from 'react-hook-form';
import { boolean, date, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { getEmployeeMasterData, saveEmployeeMaster } from '@/app/datalayer/employeedata';
import { useRouter } from 'next/navigation'
import { DocStaus } from '@/dptype';
import { saveMasterData, updateMasterData } from '../../datalayer/api';
import { isValid, parseISO } from 'date-fns';
export const formSchema = z.object({
    empcode: z.string().min(2, {
      message: "empcode must be at least 5 characters.",
    }),
    localid: z.string().min(2, {
      message: "Employee name must be at least 2 characters.",
    }),
    doj:z.date({
      required_error: "A date of joining is required.",
    }),
   
    status:z.string(),
    salutation:z.string(),
    empname:z.string().min(3,{message:"Employee name must be at least 3 characters"}),
    empnamearb:z.string(),
    desgcode:z.string(),
    deptcode:z.string(),
    empcompid:z.string().min(3, {
      message: "Employee company invalid or not selected",
    }),
    wloccode:z.string(),
    seccode:z.string(),
    reportingto:z.string(),
  
    siteID:z.string(),
    compID:z.string(),
    lastModifiedBy:z.string(),
    lastModifiedOn: z.date(), 
    
  
  })
  
export const InitializeForm = () => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      empcode: "",
      localid: "",
      doj: new Date(Date.now()),
      status: "0",
      salutation: "Mr.",
      empname: "",
      empnamearb: "",
      empcompid: "",
      deptcode: "",
      desgcode: "",
      wloccode: "",
      seccode: "",
      reportingto: "",
      siteID: "ADM",
      compID: "82D04AC9-412C-446E-8437-70376830A913",
      lastModifiedBy: "Admin",
      lastModifiedOn: new Date(),
 
    },
  });
};

 


export const DisplayFrom = async (form: any, code: string) => {
  try {
    const data = await getEmployeeMasterData(code);
    const fieldArray: { name: string; value: any }[] = Object.entries(data).map(
      ([name, value]) => ({ name, value })
    );

    fieldArray.forEach((item: any) => {
      const { name, value } = item;

      if (value instanceof Date) {
        form.setValue(String(name).toLowerCase(), new Date(value));
      } else if (typeof value === 'string' && isValid(parseISO(value)))   {
        form.setValue(String(name).toLowerCase(), new Date(value));
      } else if (typeof value === 'boolean') {
        form.setValue(String(name).toLowerCase(), Boolean(value));
      } else {
        form.setValue(String(name).toLowerCase(), String(value));
      }
    });
    
  } catch (error) {
    console.error('Error fetching or processing employee data:', error);
    // Handle error appropriately, e.g., show an error message or log it
  }
  
  }
  
 
 export const saveData=async (form:any,formValues:any,docStatus:DocStaus)=>{
  form.setValue("siteID","ADM")
  form.setValue("compID","82D04AC9-412C-446E-8437-70376830A913")
  form.setValue("lastModifiedBy","ADM")
  form.setValue("lastModifiedOn",new Date())

  const formData = new FormData();
 
    for (const key in formValues) {
      if (Object.prototype.hasOwnProperty.call(formValues, key)) {
        const value = formValues[key as keyof typeof formValues];

        if (key === 'img' && value) {
          // If the key is 'img' and has a value, it's a file; append it separately
          // formData.append(key, (value as File));
        } else if (value instanceof Date) {
          // If the value is a Date object, convert it to a string before appending
          formData.append(key, value.toISOString());
        } else if (typeof value === 'boolean') {
          // If the value is a boolean, convert it to a string before appending
          formData.append(key, String(value));
        } else {
          // Use the key directly if it exists in values
          formData.append(key, String(value));
        }
      }
    }
    if(docStatus===DocStaus.EDIT )
      {
      
        const  keyCode =form.getValues('empcode').toString()
          const res=await updateMasterData(`employeemaster?code=${keyCode}`,formData)
          
          // form.setValue('empcode',keyCode)
      }
          else
          {
            saveMasterData("employeemaster",formData)
          }
      
  }