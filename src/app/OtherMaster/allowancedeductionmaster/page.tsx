"use client"
import React,{useEffect, useState} from 'react';
import {z} from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DPInput from '@/components/ui/dpinput';
import { InitializeForm,EmpAllowanceDeductionFormulaDet, formSchema, Type, SubType,EmpAllowanceDeductionGrid , InputType } from './formSchema';
import { useRouter } from 'next/navigation';
import {getLanguageByEnglish} from '@/utils/languages';
import DPComboBox from '@/components/ui/dpcombobox';
import FormHeader from '@/components/Menu/formHeader';
import DPInputBrowse from '@/components/ui/dpinputbrowse';
import GenericGrid from '@/app/documents/leaveentry/GenericGrid';



export const radioOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
];
export const sublevels = [
  {
    value:"c",
    label:"c"
  },
  {
    value:"d",
    label:"d"
  }
]

// Define the addNewRow function
const addNewRow = (setGridData: any) => {
  setGridData((prevGridData: any) => [
    ...prevGridData,
    { Condition: "", Formula: "" }, // New row with empty values
  ]);
};

// Define the function to check for empty rows
const hasEmptyRow = (gridData: any) => {
  return gridData.some((row: any) => row.Condition === "" || row.Formula === "");
};



const AllowanceDeduction = () => {

  const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])


    const docCd = 8;
    const docKey = 101;
    const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();
    
    const [isCompulsoryChecked, setIsCompulsoryChecked] = useState(false);

    const [allowanceDetails, setallowanceDetails] = useState<EmpAllowanceDeductionGrid[]>([
      {
        id:'0',
        RowId:0,
        Condition:'',
        Formula:' ',
      }

    ]);


    useEffect(() => {
      // This will ensure the form is in sync with the updated state data
      const newData = allowanceDetails.map((doc, index) => ({
        id: doc.id,
        condition: doc.Condition,
        formula: doc.Formula,
        rowid: doc.RowId || 0,
        alldedcode:'1',
      })) as unknown as EmpAllowanceDeductionFormulaDet[];
    
      form.setValue('EmpAllowanceDeductionFormula', newData);
    }, [allowanceDetails]); // This dependency ensures reactivity


    const handleCompulsoryChange = () => {
        setIsCompulsoryChecked(!isCompulsoryChecked);
    };
  
    // Handle the editor preparation (when a cell enters edit mode)
  const handleEditorPreparing = (e: any) => {
    if (e.dataField === 'Formula' && e.parentType === 'dataRow') {
      // Intercept the keydown event
      e.editorOptions.onKeyDown = (event: any) => {
        if (event.event.key === 'Enter') {
          if (!hasEmptyRow(gridData)) {
            addNewRow(setGridData);
          } else {
            alert('There are empty rows. Please fill them before adding a new row.');
          }
        }
      };
    }
  };
    
  const handleValueSelect = (updatedData: any) => {
    setallowanceDetails((prevData) => [...prevData, ...updatedData]);
  };

  const loadSampleData = () => {
    console.log(form.getValues());
  };

    const router = useRouter();
    const [gridData, setGridData] = useState([
      { Condition: "", Formula: "" }, // Initial row
    ]);
    // Initialize the form
    const form = InitializeForm();
    return (
      <>
        {isClient ?
        <div className="w-full h-full px-5 py-5 lg:px-20 lg:pb-14 lg:pt-8">
          <MaxWidthWrapper className="px-5 py-5 lg:px-10 lg:pb-6 lg:pt-10">
            <div className="border-solid">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
                  <FormHeader
                    setFormValues={setFormValues}
                    docCd={docCd}
                    docKey={docKey}
                    router={router}
                    getValues={form.getValues}
                    hideItem="Draft"  // Pass the name of the field to hide
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 py-1">
                    <div className="grid gap-1 py-1 lg:col-span-1">
                      <DPInput
                        formcontrol={form.control}
                        name="alldedcode"
                        disabled={false}
                        type="text"
                        labelText={getLanguageByEnglish("AllDed Code")}
                        placeholder={getLanguageByEnglish("00000")}
                        onValueChange={(field, value) => {
                          form.setValue("alldedcode", value);
                        }}
                      />
                    </div>
                    <div className="grid gap-1 py-1 lg:col-span-3">
                      <DPInput
                        formcontrol={form.control}
                        name="alldedname"
                        disabled={false}
                        type="text"
                        labelText={getLanguageByEnglish("Allded Name")}
                        placeholder={getLanguageByEnglish("ABCD")}
                        onValueChange={(field, value) => {
                          form.setValue("alldedname", value);
                        }}
                      />
                    </div>
                    <div className="grid gap-1 py-1 lg:col-span-2">
                      <DPInput
                        formcontrol={form.control}
                        name="alldedshortname"
                        disabled={false}
                        type="text"
                        labelText={getLanguageByEnglish("Allded Short Name")}
                        placeholder={getLanguageByEnglish("ABCD")}
                        onValueChange={(field, value) => {
                          form.setValue("alldedshortname", value);
                        }}
                      />
                    </div>
                    <div className="grid gap-1 py-1 lg:col-span-2">
                    <DPComboBox
                        disabled={false}
                        name="type"
                        formcontrol={form.control}
                        labelText={getLanguageByEnglish("Type")}
                        data={Type} // You can populate this with actual data
                        onValueChange={(field, value) => {
                          form.setValue("type", value);
                        }}
                      />
                    </div>
                    <div className="grid gap-1 py-1 lg:col-span-1">
                      <DPComboBox
                        disabled={false}
                        name="subtype"
                        formcontrol={form.control}
                        labelText={getLanguageByEnglish("Sub Type")}
                        data={SubType} // You can populate this with actual data
                        onValueChange={(field, value) => {
                          form.setValue("subtype", value);
                        }}
                      />
                    </div>
                    <div className="grid gap-1 py-1 lg:col-span-2">
                    <DPComboBox
                        disabled={false}
                        name="inputtype"
                        formcontrol={form.control}
                        labelText={getLanguageByEnglish("Input Type")}
                        data={InputType} // You can populate this with actual data
                        onValueChange={(field, value) => {
                          form.setValue("inputtype", value);
                        }}
                      />
                    </div>
                    <div className="grid gap-1 py-1 lg:col-span-1">
                    <DPInput
                        formcontrol={form.control}
                        name="SeqNo"
                        disabled={false}
                        type="number"
                        labelText={getLanguageByEnglish("SeqNo")}
                        placeholder={'0000'}
                        onValueChange={(field, value) => {
                          form.setValue("seqno", Number(value));
                        }}
                      />
                    </div>
                  </div>
                  {/* DevExtreme DataGrid for Condition and Formula */}
        <div className="mt-5">
                <GenericGrid<EmpAllowanceDeductionGrid>
                  columns={[
                    { dataField: 'Condition', caption: 'All Ded Code' },
                    { dataField: 'Formula', caption: 'Emp Code' },
                  ]}
                  dataSource={allowanceDetails}
                  onValueSelect={handleValueSelect}
                  lastColumn="Formula"
                />
        </div>
        {/* Checkbox for "Compulsory for all" */}
        <div className="grid gap-1 py-1 lg:col-span-6">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={isCompulsoryChecked}
                                            onChange={handleCompulsoryChange}
                                        />
                                        <span>{getLanguageByEnglish("Compulsory for all")}</span>
                                    </label>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 py-1">
          <div className="grid gap-1 py-1 lg:col-span-1">
                <DPInputBrowse
                  formcontrol={form.control}
                  name="glcode"
                  disabled={false}
                  keyExp="glcode"
                  type="text"
                  labelText={getLanguageByEnglish("General Ledger")}
                  placeholder={getLanguageByEnglish("")}
                  onValueChange={(field, value) => {
                    form.setValue("glcode", value);
                  }}
                  getValues={form.getValues} // Pass getValues here
                  setValue={form.setValue} // Pass setValue here
                  docCd={docCd} // Pass docCd
                  fieldMapping={[ // Pass fieldMapping
                    { column: 'glcode', formField: 'glcode' },
                    { column: 'glname', formField: 'ledger' },
                  ]}
                />

          </div>
          <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPInput
                    formcontrol={form.control}
                    name="ledger"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("GL Name")}
                    placeholder={getLanguageByEnglish("")}
                    onValueChange={(field, value) => {
                      
                    }}
                  />
           </div>
           <div className="flex items-end justify-start gap-4">
                    <Button type="button" onClick={loadSampleData}>Load Sample Data</Button>
              </div>
          </div>
          
                </form>
              </Form>
            </div>
            
                
          </MaxWidthWrapper>
        </div>
        : ''
      }
          
      </>
      );



};

export default AllowanceDeduction


