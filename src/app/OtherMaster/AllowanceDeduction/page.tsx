"use client"
import React,{useEffect, useState} from 'react';
import {z} from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DPInput from '@/components/ui/dpinput';
import { InitializeForm,EmpAllowanceDeductionFormulaDet, formSchema, Type, SubType, InputType } from './formSchema';
import { useRouter } from 'next/navigation';
import getLanguageByEnglish from '@/utils/languages';
import DPComboBox from '@/components/ui/dpcombobox';
import DpRadioGroup from '@/components/ui/dpradiogroup';
import FormHeader from '@/components/Menu/formHeader';
// Import DataGrid from DevExtreme
import { DataGrid, Column, Editing, Lookup } from 'devextreme-react/data-grid';

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

const AllowanceDeduction = () => {
    const docCd = 7;
    const docKey = 101;
    const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();
    const [allowanceDetails, setallowanceDetails] = useState<EmpAllowanceDeductionFormulaDet[]>([]);
    const [isCompulsoryChecked, setIsCompulsoryChecked] = useState(false);
    const handleCompulsoryChange = () => {
        setIsCompulsoryChecked(!isCompulsoryChecked);
    };

  const [selectedDepartmentType, setSelectedDepartmentType] = useState(''); // Initially no selection
  const [isComboBoxDisabled, setComboBoxDisabled] = useState(true); // Initially disabled

   // Handle changes in the radio group
   const handleDepartmentTypeChange = (field: string, value: string) => {
    setSelectedDepartmentType(value);
    form.setValue('ledger', value);

    if (value === 'A') {
      // Disable ComboBox if Top Level is selected
      setComboBoxDisabled(true);
      form.setValue('ledger', ' '); // Reset sublevelType if Top Level is selected
    } else if (value === 'sublevel') {
      // Enable ComboBox if Sub Level is selected
      setComboBoxDisabled(false);
    }
  };
    const router = useRouter();
    const [gridData, setGridData] = useState([
      { Condition: '', Formula: '' }, // Initial row
    ]);
    // Initialize the form
    const form = InitializeForm();
    return (
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
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 py-1">
                    <div className="grid gap-1 py-1 lg:col-span-1">
                      <DPInput
                        formcontrol={form.control}
                        name="AllDedCode"
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
                        name="AlldedName"
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
                        name="AlldedShortName"
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
                        name="Type"
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
                        name="SubType"
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
                        name="InputType"
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
                  
                </form>
              </Form>
            </div>
            {/* DevExtreme DataGrid for Condition and Formula */}
        <div className="mt-5">
          <DataGrid
            dataSource={gridData}
            showBorders={true}
            onRowInserted={(e) => {
              setGridData([...gridData, e.data]); // Add new row data to gridData state
            }}
          >
            <Editing mode="cell" allowUpdating={true} allowAdding={false} allowDeleting={true} useIcons={true} />
            {/* Define columns */}
            <Column dataField="Condition" caption="Condition" />
            <Column dataField="Formula" caption="Formula" />
          </DataGrid>
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
          {/* <div className="grid gap-1 py-1 lg:col-span-2">
                  <DpRadioGroup
                    formcontrol={form.control}
                    name="depType"
                    disabled={false}
                    labelText={getLanguageByEnglish("Department Type")}
                    options={radioOptions}
                    selectedValue={selectedDepartmentType}
                    onValueChange={handleDepartmentTypeChange}
                  />
          </div>
          <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPComboBox
                    disabled={isComboBoxDisabled} // Use state to disable
                    name="sublevelType"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Sublevel")}
                    data={sublevels}
                    onValueChange={(field, value) => {
                      form.setValue("ledger", value);
                    }}
                  />
                </div> */}
          </MaxWidthWrapper>
        </div>
      );



};

export default AllowanceDeduction


