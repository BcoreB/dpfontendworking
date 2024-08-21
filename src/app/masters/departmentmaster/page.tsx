"use client"
import React, { useEffect, useState } from 'react';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DPInput from '@/components/ui/dpinput';
import DpRadioGroup from '@/components/ui/dpradiogroup';
import { InitializeForm, formSchema, DisplayForm, saveData, company, radioOptions, sublevels } from './formSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import getLanguageByEnglish from '@/utils/languages';
import FormHeader from '@/components/Menu/formHeader';
import Sidebar from '@/components/Menu/SideBar';
import Modal from '@/components/Menu/modal';
import DPInputBrowse from '@/components/ui/dpinputbrowse';
import DPComboBox from '@/components/ui/dpcombobox';

const DepartmentMaster = () => {
  const searchParams = useSearchParams();
  const docCd = 3;
  const docKey = 101;
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();
  
  const [selectedDepartmentType, setSelectedDepartmentType] = useState(''); // Initially no selection
  const [isComboBoxDisabled, setComboBoxDisabled] = useState(true); // Initially disabled

  const router = useRouter();
  const form = InitializeForm();

  // Handle changes in the radio group
  const handleDepartmentTypeChange = (field: string, value: string) => {
    setSelectedDepartmentType(value);
    form.setValue(field, value);

    if (value === 'toplevel') {
      // Disable ComboBox if Top Level is selected
      setComboBoxDisabled(true);
      form.setValue('sublevelType', null); // Reset sublevelType if Top Level is selected
    } else if (value === 'sublevel') {
      // Enable ComboBox if Sub Level is selected
      setComboBoxDisabled(false);
    }
  };

  const handleAlertFormData = () => {
    const data = form.getValues(); // Get current form values
    alert(JSON.stringify(data, null, 2)); // Convert the data to a JSON string and show it in an alert
  };

  return (
    <div className='w-full h-full px-5 py-5 lg:px-20 lg:pb-14 lg:pt-8'>
      <div className='absolute top-0 right-0 z-5'>
        <Sidebar
          docCd={docCd}
          docKey={docKey}
          form={form}
        />
      </div>
      <Button type="button" onClick={handleAlertFormData}>
        Show Form Data
      </Button>
      <MaxWidthWrapper className='px-5 py-5 lg:px-20 lg:pb-6 lg:pt-20'>
        <div className='border-solid'>
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
                    name="depcode"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Department code")}
                    placeholder={getLanguageByEnglish("00000")}
                    onValueChange={(field, value) => {
                      form.setValue("depcode", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-3">
                  <DPInput
                    formcontrol={form.control}
                    name="depname"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Department Name")}
                    placeholder={getLanguageByEnglish("Al Arab")}
                    onValueChange={(field, value) => {
                      form.setValue("depname", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPComboBox
                    disabled={false}
                    name="company"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Company")}
                    data={company}
                    onValueChange={(field, value) => {
                      form.setValue("company", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-1">
                <DPInputBrowse
                  formcontrol={form.control}
                  name="deptHeadCode"
                  disabled={false}
                  type="text"
                  labelText={getLanguageByEnglish("Dept head code")}
                  placeholder={getLanguageByEnglish("00000")}
                  onValueChange={(field, value) => {
                    form.setValue("deptHeadCode", value);
                  }}
                  getValues={form.getValues} // Pass getValues here
                  setValue={form.setValue} // Pass setValue here
                  docCd={docCd} // Pass docCd
                  fieldMapping={[ // Pass fieldMapping
                    { column: 'deptHeadCode', formField: 'deptHeadCode' },
                    { column: 'deptHeadName', formField: 'deptHeadName' },
                  ]}
                />

                </div>
                <div className="grid gap-1 py-1 lg:col-span-3">
                  <DPInput
                    formcontrol={form.control}
                    name="deptHeadName"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Department Head Name")}
                    placeholder={getLanguageByEnglish("Smith")}
                    onValueChange={(field, value) => {
                      form.setValue("deptHeadName", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
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
                      form.setValue("sublevelType", value);
                    }}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>
      
    </div>
  );
};

export default DepartmentMaster;
