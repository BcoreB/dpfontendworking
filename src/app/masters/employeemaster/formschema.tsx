// formUtils.ts
import { useForm } from 'react-hook-form';
import { ZodObject, boolean, date, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { getEmployeeMasterData, saveEmployeeMaster } from '@/app/datalayer/employeedata';

import { DocStaus } from '@/dptype';
import { saveMasterData, updateMasterData } from '../../datalayer/api';
import { isValid, parseISO } from 'date-fns';

export const formSchemaEmployeeContract=
z.object({
  empcode : z.string().max(20,{message:'maximum length allowed 20'})
  .min(5, {
    message: "empcode must be at least 5 characters.",
  }),
  compid : z.string(),
  id:z.string(),
  rowid : z.number(),
  contype: z.string(),
  conno:  z.number(),
  startdate : z.date(),
  enddate : z.date(),
  startbasic:z.number(),
  lastbasic:z.number(),
  noofdays:z.number(),
  remarks : z.string() ,
  extendeddate: z.date(),
  indpaid:z.boolean(),
  deptcode: z.string() ,
  refcompid: z.string() ,
  refsiteid: z.string() ,
  refdocno:z.number(),
  refdoccd:z.number(),
})



export const formSchemaEmployeeDocument=
z.object({
  empcode : z.string().max(20,{message:'maximum length allowed 20'})
  .min(5, {
    message: "empcode must be at least 5 characters.",
  }),
  compid : z.string(),
  id:z.string(),
  rowid : z.number(),
  code : z.string().max(10,{message:'maximum length allowed 10'}),
  type : z.string().max(10,{message:'maximum length allowed 10'}),
  no : z.string().max(50,{message:'maximum length allowed 50'}),
  ref : z.string().max(10,{message:'maximum length allowed 10'}),
  issuedate : z.date(),
  expirydate : z.date(),
  notes : z.string().max(200,{message:'maximum length allowed 200'}),
})


export const salutationData = [
  {
    value: "Mr.",
    label: "Mr.",
  },
  {
    value: "Mrs.",
    label: "Mrs.",
  },
  {
    value: "Miss.",
    label: "Miss.",
  },
  {
    value: "Ms.",
    label: "Ms.",
  }
];

export const sex = [
  {
    value: "m",
    label: "Male",
  },
  {
    value: "f",
    label: "Female",
  }
];

export const relation = [
  {
    value: "par",
    label: "Parent",
  },
  {
    value: "chi",
    label: "Child",
  },
  {
    value: "sib",
    label: "Sibling",
  },
  {
    value: "grp",
    label: "Grandparent",
  },
  {
    value: "grc",
    label: "Grandchild",
  },
  {
    value: "auu",
    label: "Aunt/Uncle",
  },
  {
    value: "nin",
    label: "Niece/Nephew",
  },
  {
    value: "cou",
    label: "Cousin",
  },
  {
    value: "spp",
    label: "Spouse/Partner",
  },
  {
    value: "hus",
    label: "Husband",
  },
  {
    value: "wif",
    label: "Wife",
  },
  {
    value: "nei",
    label: "Neighbor",
  },
  {
    value: "tea",
    label: "Teacher",
  }
];


export const maritalstatus = [
  {
    value: "s",
    label: "Single",
  },
  {
    value: "m",
    label: "Married",
  },
  {
    value: "d",
    label: "Divorced",
  },
  {
    value: "w",
    label: "Widowed",
  },
  {
    value: "sp",
    label: "Separated",
  }
];



export const bloodgroup = [
  {
    value: "A+",
    label: "A Positive",
  },
  {
    value: "A-",
    label: "A Negative",
  },
  {
    value: "B+",
    label: "B Positive",
  },
  {
    value: "B-",
    label: "B Negative",
  },
  {
    value: "AB+",
    label: "AB Positive",
  },
  {
    value: "AB-",
    label: "AB Negative",
  },
  {
    value: "O+",
    label: "O Positive",
  },
  {
    value: "O-",
    label: "O Negative",
  },
];


export const InitializeEmployeeContractForm = () => {
  return useForm<z.infer<typeof formSchemaEmployeeContract>>({
    resolver: zodResolver(formSchemaEmployeeContract),
    defaultValues: {
      id : '',
      empcode : '',
      compid : '',
      contype : '',
      conno : 0,
      startdate : new Date(Date.now()),
      enddate : new Date(Date.now()),
      startbasic : 0,
      lastbasic : 0,
      noofdays : 0,
      remarks : '',
      rowid : 0,
      extendeddate : new Date(Date.now()),
      indpaid : false,
      deptcode : '',
      refcompid : '',
      refsiteid : '',
      refdocno : 0,
      refdoccd : 0,
     
    },
  });
};

export const InitializeEmployeeDocumentForm = () => {
  return useForm<z.infer<typeof formSchemaEmployeeDocument>>({
    resolver: zodResolver(formSchemaEmployeeDocument),
    defaultValues: {
      id:"",
      empcode: "",
      compid: "",
      rowid:0,
      code: "",
      type: "",
      no: "",
      ref: "",
      issuedate: new Date(Date.now()),
      expirydate: new Date(Date.now()),
      notes: ""
    },
  });
};


export type DPContract = {
      id :  string;
      empcode : string;
      compid : string;
      contype : string;
      conno : number;
      startdate : Date;
      enddate :Date;
      startbasic :  number;
      lastbasic : number;
      noofdays :  number;
      remarks : string;
      rowid :  number;
      extendeddate : Date;
      indpaid : boolean,
      deptcode : string;
      refcompid : string;
      refsiteid : string;
      refdocno :  number;
      refdoccd :  number;

 
};


export type DPDocument = {
  rowid: number;
  id:string;
  compid: string;
  empcode: string;
  code: string;
  docname: string;
  type: string;
  no: string;
  ref: string;
  issuedate: Date;
  expirydate: Date;
  notes: string;
};

export const formSchema = z.object({
  empcode : z.string().max(20,{message:'maximum length allowed 20'})
  .min(5, {
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
    
    basicsalary : z.number(),
    presentaddress : z.string().max(1000,{message:'maximum length allowed 1000'}),
    permentaddress : z.string().max(1000,{message:'maximum length allowed 1000'}),
    telephone : z.string().max(20,{message:'maximum length allowed 20'}),
    telephoneext : z.string().max(5,{message:'maximum length allowed 5'}),
    mobile1 : z.string().max(20,{message:'maximum length allowed 20'}),
    mobileht : z.string().max(20,{message:'maximum length allowed 20'}),
    mobile2 : z.string().max(20,{message:'maximum length allowed 20'}),
    emailpersonal : z.string().max(100,{message:'maximum length allowed 100'}),
    emailofficial : z.string().max(400,{message:'maximum length allowed 400'}),
    nationalitycode : z.string().max(6,{message:'maximum length allowed 6'}),
    dob : z.date(),
    religioncode : z.string().max(6,{message:'maximum length allowed 6'}),
    sex : z.string().max(1,{message:'maximum length allowed 1'}),
    meritalstatus : z.string().max(1,{message:'maximum length allowed 1'}),
    fathername : z.string().max(200,{message:'maximum length allowed 200'}),
    mothername : z.string().max(200,{message:'maximum length allowed 200'}),
    spausename : z.string().max(200,{message:'maximum length allowed 200'}),
    bloodgroup : z.string().max(20,{message:'maximum length allowed 20'}),
    personalremarks : z.string().max(1000,{message:'maximum length allowed 1000'}),
    languageknown : z.string().max(200,{message:'maximum length allowed 200'}),
    emergencycontactperon : z.string().max(200,{message:'maximum length allowed 200'}),
    emergencycontactpersonno : z.string().max(50,{message:'maximum length allowed 50'}),
    emergencycontactpersonrelation : z.string().max(100,{message:'maximum length allowed 100'}),

    employeedocuments: z.array(
      formSchemaEmployeeDocument
    ),
    employeecontractdet: z.array(
      formSchemaEmployeeContract
    ),

    gradecode : z.string().max(10,{message:'maximum length allowed 10'}),
salarytype : z.string().max(30,{message:'maximum length allowed 30'}),
payrollperiodcode : z.string().max(20,{message:'maximum length allowed 20'}),
calendorcode : z.string().max(6,{message:'maximum length allowed 6'}),
paymentmethod : z.string().max(20,{message:'maximum length allowed 20'}),
bankcode : z.string().max(10,{message:'maximum length allowed 10'}),
bankaccountno : z.string().max(100,{message:'maximum length allowed 100'}),
formalsalary : z.number(),
salarycurrencycode : z.string().max(6,{message:'maximum length allowed 6'}),
variableallowances : z.string().max(200,{message:'maximum length allowed 200'}),
variabledeductions : z.string().max(200,{message:'maximum length allowed 200'}),
nettotal : z.number(),

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
      basicsalary : 0,
      presentaddress : '',
      permentaddress : '',
      telephone : '',
      telephoneext : '',
      mobile1 : '',
      mobileht : '',
      mobile2 : '',
      emailpersonal : '',
      emailofficial : '',
      nationalitycode : '',
      dob : new Date(),
      religioncode : '',
      sex : '',
      meritalstatus : '',
      fathername : '',
      mothername : '',
      spausename : '',
      bloodgroup : '',
      personalremarks : '',
      languageknown : '',
      emergencycontactperon : '',
        employeedocuments: undefined ,
        employeecontractdet: undefined ,
        
        gradecode : '',
        salarytype : '',
        payrollperiodcode : '',
        calendorcode : '',
        paymentmethod : '',
        bankcode : '',
        bankaccountno : '',
        formalsalary : 0,
        salarycurrencycode : '',
        variableallowances : '',
        variabledeductions : '',
        nettotal : 0
    },
  });
};


interface FieldType {
  fieldName: string;
  fieldType: string;
}

function getFieldTypes(frmSchema: ZodObject<any>): FieldType[]{
  if (!(frmSchema instanceof z.ZodObject)) {
     throw new Error('Schema must be an instance of ZodObject');
  }
 
  const fieldTypes: FieldType[] = [];
 
  for (const [fieldName, fieldSchema] of Object.entries(frmSchema.shape)) {
   
     let fieldType = 'unknown';
 
     if (fieldSchema instanceof z.ZodString) {
       fieldType = 'string';
     } else if (fieldSchema instanceof z.ZodNumber) {
       fieldType = 'number';
     } else if (fieldSchema instanceof z.ZodDate) {
       fieldType = 'date';
      } else if (fieldSchema instanceof z.ZodBoolean) {
        fieldType = 'boolean';
     } else if (fieldSchema instanceof z.ZodArray) {
       fieldType = 'array';
       // You can further inspect the array's element type if needed
     }
 
     if(fieldType === 'unknown')      console.log('xx-->',fieldSchema)
       
     fieldTypes.push({ fieldName, fieldType });
     // Handle optional and nullable fields
 
  }
 
    return fieldTypes;
 }
 
 


export const DisplayFrom = async (form: any, code: string) => {
  try {
    const data = await getEmployeeMasterData(code);
    const fieldTypes = getFieldTypes(formSchema);

    console.log('DisplayFrom data',data)

    const fieldArray: { name: string; value: any }[] = Object.entries(data).map(
      ([name, value]) => ({ name, value })
    );
      
    fieldArray.forEach((item: any) => {
      const { name, value } = item;

     const fieldTypeObj = fieldTypes.find(field => field.fieldName.toLowerCase() === name.toLowerCase());
  
      if (fieldTypeObj?.fieldType==='date') {
        form.setValue(String(name).toLowerCase(), new Date(value));

      } else if (fieldTypeObj?.fieldType === 'boolean') {
        form.setValue(String(name).toLowerCase(), Boolean(value));

        
      }
      else if (name.toLowerCase() === 'employeedocuments' ) {
      // Handling employeeDocuments array
      
      const fieldTypes = getFieldTypes(formSchemaEmployeeDocument);
      value.forEach((document: any, index: number) => {
      
        Object.entries(document).forEach(([docName, docValue]: [string, any]) => {
          const fieldName = `${name}.${index}.${docName}`.toLowerCase();
            const fieldTypeObj = fieldTypes.find(field => field.fieldName.toLowerCase() === docName.toLowerCase());
 
         if (fieldTypeObj?.fieldType==='date')  {
            form.setValue(fieldName, new Date(docValue));
                  //   form.setValue(String(name).toLowerCase(), new Date(value));
      } else if (fieldTypeObj?.fieldType === 'boolean') {
        form.setValue(fieldName, Boolean(value));
          } else {
            form.setValue(fieldName, docValue);
          }
        });
      });
    }       else if (name.toLowerCase() === 'employeecontractdet' ) {
      // Handling employeeDocuments array
      
 
      const fieldTypes = getFieldTypes(formSchemaEmployeeContract);
      value.forEach((document: any, index: number) => {
        
        Object.entries(document).forEach(([docName, docValue]: [string, any]) => {
          const fieldName = `${name}.${index}.${docName}`.toLowerCase();
            const fieldTypeObj = fieldTypes.find(field => field.fieldName.toLowerCase() === docName.toLowerCase());
 
         if (fieldTypeObj?.fieldType==='date')  {
            form.setValue(fieldName, new Date(docValue));
            
                  //   form.setValue(String(name).toLowerCase(), new Date(value));
      } else if (fieldTypeObj?.fieldType === 'boolean') {
        form.setValue(fieldName, Boolean(value));
        
          } else {
            form.setValue(fieldName, docValue);
            
          }
        });
      });
    } 

      else {
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
  console.log('saveData',form)
  const formData = new FormData();

    for (const key in formValues) {
      if (Object.prototype.hasOwnProperty.call(formValues, key)) {
        const value = formValues[key as keyof typeof formValues];

        if (key === 'img' && value) {
          // If the key is 'img' and has a value, it's a file; append it separately
          // formData.append(key, (value as File));
        } else if (key.toLowerCase() === 'employeedocuments' || key.toLowerCase() === 'employeecontractdet') {
          // Handling employeedocuments array
          value.forEach((document: any, index: number) => {
            Object.entries(document).forEach(([docName, docValue]: [string, any]) => {

              const fieldName = `${key.toLowerCase()}.${index}.${docName}`;
              if (docValue instanceof Date) {
                // If the value is a Date object, convert it to a string before appending
                formData.append(fieldName, docValue.toISOString());
              } else if (typeof docValue === 'boolean') {
                // If the value is a boolean, convert it to a string before appending
                formData.append(fieldName, String(docValue));
              } else {
                // Use the key directly if it exists in values
                formData.append(fieldName, String(docValue));
              }
            });
          });
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
        console.log('formData',formData)
        const  keyCode =form.getValues('empcode').toString()
        if (formData.has('empcode')){
          const res=await updateMasterData(`employeemaster?code=${keyCode}`,formData)

        }
         
          console.log('formValues 1',formValues)
          // form.setValue('empcode',keyCode)
      }
          else
          {
            saveMasterData("employeemaster",formData)
          }
      
   }