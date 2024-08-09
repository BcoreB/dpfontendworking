"use client"
import React, { useState } from 'react';
import { z } from "zod";
import { Form } from "@/components/ui/form";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DPComboBox from '@/components/ui/dpcombobox';
import DPInput from '@/components/ui/dpinput';
import DPTextArea from '@/components/ui/dptextarea';
import { InitializeForm, formSchema, accoType } from './formSchema';
import { useRouter } from 'next/navigation';
import getLanguageByEnglish from '@/utils/languages';
import Sidebar from '@/components/Menu/SideBar';
import FormHeader from '@/components/Menu/formHeader';
import Modal from '@/components/Menu/modal';
import { getPredefinedData } from '@/components/Menu/data/prefillData';

const AccomodationMaster: React.FC = () => {
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [docCd, setDocCd] = useState<number>(1); // Default DocCd
  const [docKey, setDocKey] = useState<number>(101); // Default DocKey
  const router = useRouter();

  // Define your form with potential default values.
  const form = InitializeForm();

  // Function to fill the form with predefined data
  const fillFormWithPredefinedData = (docCd: number, docKey: number) => {
    const data = getPredefinedData(docCd, docKey);
    if (data) {
      form.setValue("accocode", data.accocode);
      form.setValue("accname", data.accname);
      form.setValue("buildno", data.buildno);
      form.setValue("roadno", data.roadno);
      form.setValue("accotype", data.accotype);
      form.setValue("blockno", data.blockno);
      form.setValue("flatno", data.flatno);
      form.setValue("area", data.area);
      form.setValue("remarks", data.remarks);
    }
  };

  const setDraftData = (data: any) => {
    // Assuming form is defined as per your earlier code
      form.setValue("accocode", data.accocode);
      form.setValue("accname", data.accname);
      form.setValue("buildno", data.buildno);
      form.setValue("roadno", data.roadno);
      form.setValue("accotype", data.accotype);
      form.setValue("blockno", data.blockno);
      form.setValue("flatno", data.flatno);
      form.setValue("area", data.area);
      form.setValue("remarks", data.remarks);
  };
  
  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setFormValues(values);
      alert(JSON.stringify(values, null, 2)); // Show form values as alert
    } catch (error) {
      console.error("Form submission error: ", error);
    }
  };

  return (
    <div className='w-full h-full px-5 py-5 lg:px-20 lg:pb-14 lg:pt-8'>
      <div className='absolute top-0 right-0 z-5'>
        <Sidebar
          fillFormWithPredefinedData={() => fillFormWithPredefinedData(docCd, docKey)}
          docCd={docCd}
          docKey={docKey}
          form={form}
          setDraftData={setDraftData} // Pass the function as a prop
      />
      </div>
      <MaxWidthWrapper>
        <div className='border-solid'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormHeader
                onSave={form.handleSubmit(onSubmit)}
                formValues={formValues}
                docCd={docCd}
                docKey={docKey}
                setModalVisible={setModalVisible}
                router={router}
                getValues={form.getValues}
              />
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 py-1">
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPInput
                    formcontrol={form.control}
                    name="accocode"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Accomodation code")}
                    placeholder={getLanguageByEnglish("00000")}
                    onValueChange={(field, value) => form.setValue("accocode", value)}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-4">
                  <DPInput
                    formcontrol={form.control}
                    name="accname"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Accomodation Name")}
                    placeholder={getLanguageByEnglish("Al Arab")}
                    onValueChange={(field, value) => form.setValue("accname", value)}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPComboBox
                    disabled={false}
                    name="accotype"
                    formcontrol={form.control}
                    labelText={getLanguageByEnglish("Type")}
                    data={accoType}
                    onValueChange={(field, value) => form.setValue("accotype", value)}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPInput
                    formcontrol={form.control}
                    name="buildno"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Building No")}
                    placeholder={getLanguageByEnglish("000000")}
                    onValueChange={(field, value) => form.setValue("buildno", value)}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPInput
                    formcontrol={form.control}
                    name="roadno"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Road No")}
                    placeholder={getLanguageByEnglish("000000")}
                    onValueChange={(field, value) => form.setValue("roadno", value)}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPInput
                    formcontrol={form.control}
                    name="blockno"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Block No")}
                    placeholder={getLanguageByEnglish("000000")}
                    onValueChange={(field, value) => form.setValue("blockno", value)}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPInput
                    formcontrol={form.control}
                    name="flatno"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Flat No")}
                    placeholder={getLanguageByEnglish("000000")}
                    onValueChange={(field, value) => form.setValue("flatno", value)}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-2">
                  <DPInput
                    formcontrol={form.control}
                    name="area"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Area")}
                    placeholder={getLanguageByEnglish("000000")}
                    onValueChange={(field, value) => form.setValue("area", value)}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-6">
                  <DPTextArea
                    formcontrol={form.control}
                    name="remarks"
                    disabled={false}
                    labelText={getLanguageByEnglish("Remarks")}
                    placeholder={getLanguageByEnglish("000000")}
                    onValueChange={(field, value) => form.setValue("remarks", value)}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>
      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)} docCd={docCd} />
    </div>
  );
};

export default AccomodationMaster;
