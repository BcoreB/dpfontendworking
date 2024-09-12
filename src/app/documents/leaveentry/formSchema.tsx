// formUtils.ts
import { useForm } from 'react-hook-form';
import { ZodObject, boolean, date, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { saveMasterData, updateMasterData } from '../../datalayer/api';
import DPComboBox from '@/components/ui/dpcombobox'

// Define schema for the formGrid elements
export const formSchemaFormGrid = z.object({
  empcode:z.string().max(20,{message:'maximum length allowed 20'})
  .min(5, {
    message: "empcode must be at least 5 characters.",
  }),
  empname: z.string(),
  cpr: z.string(),
  empfromdate: z.date(),
  emptodate: z.date(),
  numberofdays: z.string(),
  entitled: z.string(),
  remarks: z.string(),
  npbalance: z.string(),
  leavetyle: z.string(),

})


// Initialize formGrid with default values
export const InitializeFormGridForm = () =>{
  return useForm<z.infer<typeof formSchemaFormGrid>>({
    resolver: zodResolver(formSchemaFormGrid),
    defaultValues: {
        empcode: '',
        empname: '',
        cpr: '',
        empfromdate: undefined,
        emptodate: undefined,
        numberofdays: '',
        entitled: '',
        remarks: '',
        npbalance: '',
        leavetyle: '',

    },
  });
}


// Define the schema for air sector master
export const formSchema = z.object({
  refno: z.string(),
  leavetype: z.string().min(1, "Please select a type"),
  date: z.date(),
  payrolperiod: z.string().min(1, "Please select a type"),
  fromdate: z.date(),
  todate: z.date({
    required_error: "A date of joining is required.",
  }),
  employeeData : z.array(
    formSchemaFormGrid
  ),
  
});

// Initialize the form with default values
export const InitializeForm = () => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        refno: '',
        leavetype: '',
        date: undefined,
        payrolperiod: '',
        fromdate: undefined,
        todate: undefined,
        employeeData: [],
       
    },
  });
};

export type EmployeeDataType = {
  empcode: string;
  empname: string;
  cpr: string;
  empfromdate: Date;
  emptodate: Date;
  numberofdays: string;
  entitled: string;
  remarks: string;
  npbalance: string;
  leavetyle: string;
  rowid :  number;
}

// Define the leave entry type with date fields as Date
export type leavenetry = {
  refno: string;
  leavetype: string;
  date: Date;
  payrolperiod: string;
  fromdate: Date;
  todate: Date;
  
};
export const leaveType = [
  {
    value: "a",
    label: "A",
  },
  {
    value: "b",
    label: "B",
  }
];
export const payrolPeriod = [
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
