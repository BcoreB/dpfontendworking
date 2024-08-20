"use client"
import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import DPInput from '@/components/ui/dpinput'
import DpRadioGroup from '@/components/ui/dpradiogroup'
import { InitializeForm, formSchema, DisplayForm, saveData, company, radioOptions, sublevels } from './formSchema'
import { useRouter, useSearchParams } from 'next/navigation'
import getLanguageByEnglish from '@/utils/languages'
import FormHeader from '@/components/Menu/formHeader';
import Sidebar from '@/components/Menu/SideBar';
import Modal from '@/components/Menu/modal';
import FormModal from '../formModel'
import DPInputBrowse from '@/components/ui/dpinputbrowse'
import DPComboBox from '@/components/ui/dpcombobox'

const DepartmentMaster = () => {
  const searchParams = useSearchParams()
  const docCd = 3;
  const docKey = 101;
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>()
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFormModalVisible, setFormModalVisible] = useState(false);
  const [selectedDepartmentType, setSelectedDepartmentType] = useState(''); // Initially no selection
  const [isComboBoxDisabled, setComboBoxDisabled] = useState(true); // Initially disabled

  const router = useRouter();

  const form = InitializeForm()

  const handleModalClose = (mappedData: any) => {
    if (mappedData) {
      Object.keys(mappedData).forEach((key) => {
        if (form.getValues()[key] !== undefined) {
          form.setValue(key, mappedData[key]);
        }
      });
    }
    setFormModalVisible(false);
  };

  const handleOpenModal = () => {
    setFormModalVisible(true);
  };

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
    <div className='w-full h-full  px-5 py-5  lg:px-20 lg:pb-14 lg:pt-8'>
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
      <MaxWidthWrapper className='px-5 py-5  lg:px-20 lg:pb-6 lg:pt-20'>
        <div className='border-solid'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
              <FormHeader
                setFormValues={setFormValues}
                docCd={docCd}
                docKey={docKey}
                setModalVisible={setModalVisible}
                router={router}
                getValues={form.getValues}
              />
              <div className="grid grid-cols-1 lg:grid-cols-6   gap-4 py-1">
                <div className="grid gap-1 py-1 lg:col-span-1">
                  <DPInput
                    formcontrol={form.control}
                    name="depcode"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Department code")}
                    placeholder={getLanguageByEnglish("00000")}
                    onValueChange={(field, value) => {
                      form.setValue("depcode", value)
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
                      form.setValue("depname", value)
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
                      form.setValue("company", value)
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
                      form.setValue("deptHeadCode", value)
                    }}
                    onIconClick={handleOpenModal} // Pass the modal open function here
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-3">
                  <DPInput
                    formcontrol={form.control}
                    name="deptHeadName"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Dept head name")}
                    placeholder={getLanguageByEnglish("Enter the name")}
                    onValueChange={(field, value) => {
                      form.setValue("deptHeadName", value);
                    }}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DpRadioGroup
                    formcontrol={form.control}
                    name="departmentType"
                    labelText={getLanguageByEnglish("Department Type")}
                    options={radioOptions}
                    onValueChange={handleDepartmentTypeChange} // Attach the change handler
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-3">
                  <DPComboBox
                    disabled={isComboBoxDisabled} // Disable or enable based on state
                    name="sublevelType"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Type")}
                    data={sublevels}
                    onValueChange={(field, value) => {
                      if (selectedDepartmentType === 'sublevel') {
                        form.setValue(field, value);
                      }
                    }}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>
      <FormModal
        isVisible={isFormModalVisible}
        onClose={handleModalClose}
        title="Modal Data"
        docCd={docCd}
        fieldMapping={[
          { column: 'deptHeadCode', formField: 'deptHeadCode' },
          { column: 'deptHeadName', formField: 'deptHeadName' },
        ]}
      />
      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)} title="Log Data" docCd={docCd} />
    </div>
  )
}

export default DepartmentMaster
