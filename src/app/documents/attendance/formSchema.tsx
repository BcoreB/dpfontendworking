// formUtils.ts
import { useForm } from 'react-hook-form';
import { ZodObject, boolean, date, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { saveMasterData, updateMasterData } from '../../datalayer/api';
import DPComboBox from '@/components/ui/dpcombobox'

// Define schema for the formGrid elements
export const formSchemaEmployeeAttendanceDailyDet = z.object({
    id:z.string(),
    AttDate:z.date(),
    InTime:z.date(),
    OutDate:z.date(),
    OutTime:z.date(),
    EmpCode:z.string(),
    RefCode:z.string(),
    RefCode2:z.string(),
    Remakrs:z.string(),
    Status:z.string(),
    basicsalary:z.string(),
    ScheduleCode:z.string(),
    Idle:z.boolean()
})

// Interface for Grid
export interface EmployeeAttendanceDailyDet {

    id:string,
    AttDate:Date | undefined,
    InTime:Date | undefined,
    OutDate:Date | undefined,
    OutTime:Date | undefined,
    EmpCode:string | undefined,
    RefCode:string,
    RefCode2:string,
    Remakrs:string,
    Status:string,
    basicsalary:string,
    ScheduleCode:string,
    Idle:boolean,
}

export interface EmployeeAttendanceDailyDetGrid {

    id:string,
    RowId:number,
    AttDate:Date | undefined,
    InTime:Date | undefined,
    OutDate:Date | undefined,
    OutTime:Date | undefined,
    totalhours:number | undefined,
    totalminutes:number | undefined,
    EmpCode:string,
    EmpName:string,
    RefCode:string,
    RefCode2:string,
    Remakrs:string,
    Status:string,
    ScheduleCode:string,
    Idle:boolean,
}
//  export interface EmployeeVariableAllDedDetGrid {
//   id:string,
//   alldedcode:string,
//   empcode:string,
//   empname:string,
//   basicsalary:string,
//   inputtypevalue:string,
//   amount:string
//   details:string,
//   RowId:number,
//  }

 

// Initialize formGrid with default values
export const InitializeformSchemaEmployeeVariableAllDedDet = () =>{
  return useForm<z.infer<typeof  formSchemaEmployeeAttendanceDailyDet>>({
    resolver: zodResolver( formSchemaEmployeeAttendanceDailyDet),
    defaultValues: {
      id:'',
        AttDate:undefined,
        InTime:undefined,
        OutDate:undefined,
        OutTime:undefined,
        EmpCode:'',
        RefCode:'',
        RefCode2:'',
        Remakrs:'',
        Status:'',
        basicsalary:'',
        ScheduleCode:'',
        Idle:false,
    
    },
  });
}


// Define the schema for air sector master
export const formSchema = z.object({
    DeptCode:z.string().min(1, {
      message: "deptcode must be at least 1 characters.",
    }),
    EmpCompID:z.string().min(1, {
        message: "EmpCompID name must be at least 1 characters.",
      }),
    
    FromDate:z.date(),
    ToDate:z.date(),
    empname:z.string(),
    empcode:z.string(),
    payrollperiod:z.string(),
    processdate:z.date(),
    Remarks:z.string(),
    PPCode:z.string(),
    refcode:z.string(),
    EmployeeAttendanceDailyDet : z.array(
        formSchemaEmployeeAttendanceDailyDet
      ),
})

// Initialize the form with default values
export const InitializeForm = () => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        DeptCode:'',
        EmpCompID:'',
        FromDate:undefined,
        ToDate:undefined,
        processdate:undefined,
        empcode:'',
        empname:'',
        payrollperiod:'',
        refcode:'',
        Remarks:'',
        PPCode:'',
        EmployeeAttendanceDailyDet: [],
       
       
    },
  });
};


export const payrollperiod = [
    {
        value: "a",
        label: "A",
      },
      {
        value: "b",
        label: "B",
      }
];

export const Company = [
    {
        value: "a",
        label: "A",
      },
      {
        value: "b",
        label: "B",
      }
];

export const Department = [
  {
      value: "a",
      label: "A",
    },
    {
      value: "b",
      label: "B",
    }
];



interface FieldType {
  fieldName: string;
  fieldType: string;
}

function getFieldTypes(frmSchema: ZodObject<any>): FieldType[] {
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

    if (fieldType === 'unknown') console.log('Unknown field type:', fieldSchema);

    fieldTypes.push({ fieldName, fieldType });
  }

  return fieldTypes;
}

export const DisplayForm = async (form: any, code: string) => {
  try {
    const data = await getLeaveEntryData(code);
    const fieldTypes = getFieldTypes(formSchema);

    const fieldArray: { name: string; value: any }[] = Object.entries(data).map(
      ([name, value]) => ({ name, value })
    );

    fieldArray.forEach((item: any) => {
      const { name, value } = item;

      const fieldTypeObj = fieldTypes.find(field => field.fieldName.toLowerCase() === name.toLowerCase());

      if (fieldTypeObj?.fieldType === 'date') {
        form.setValue(String(name).toLowerCase(), new Date(value));
      } else if (fieldTypeObj?.fieldType === 'boolean') {
        form.setValue(String(name).toLowerCase(), Boolean(value));
      } else {
        form.setValue(String(name).toLowerCase(), String(value));
      }
    });
  } catch (error) {
    console.error('Error fetching or processing accommodation data:', error);
  }
}

export const saveData = async (form: any, formValues: any, docStatus: DocStaus) => {
  form.setValue("siteID", "ADM");
  form.setValue("compID", "82D04AC9-412C-446E-8437-70376830A913");
  form.setValue("lastModifiedBy", "ADM");
  form.setValue("lastModifiedOn", new Date());

  const formData = new FormData();

  for (const key in formValues) {
    if (Object.prototype.hasOwnProperty.call(formValues, key)) {
      const value = formValues[key as keyof typeof formValues];

      if (key === 'img' && value) {
        // If the key is 'img' and has a value, it's a file; append it separately
        // formData.append(key, (value as File));
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === 'boolean') {
        formData.append(key, String(value));
      } else {
        formData.append(key, String(value));
      }
    }
  }

  
}
