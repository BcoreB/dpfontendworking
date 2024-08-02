"use client"
import React, { useCallback, useState } from 'react';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DPComboBox from '@/components/ui/dpcombobox';
import DPInput from '@/components/ui/dpinput';
import DPTextArea from '@/components/ui/dptextarea';
import { InitializeForm, formSchema, accoType } from './formSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import getLanguageByEnglish from '@/utils/languages';
import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/SideBar';
import FormHeader from '@/app/components/formHeader';
import Modal from '@/app/components/modal';

const AccomodationMaster: React.FC = () => {
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const docCd = 1; // Set default DocCd
  const docKey = 101; // Set default DocKey
  const router = useRouter();

  // Define your form.
  const form = InitializeForm();

  // Function to fill the form with predefined data
  const fillFormWithPredefinedData = () => {
    form.setValue("accocode", "PRE001");
    form.setValue("accname", "Predefined Accommodation");
    form.setValue("buildno", "42");
    form.setValue("roadno", "Main St");
    form.setValue("accotype", "a");
    form.setValue("blockno", "B1");
    form.setValue("flatno", "101");
    form.setValue("area", "Downtown");
    form.setValue("remarks", "This is predefined data.");
  };

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormValues(values);
    alert(JSON.stringify(values, null, 2)); // Show form values as alert
  };

  const addNew = useCallback(() => {
    const url = '/masters/accomodationmaster';
    router.push(url);
    alert("Added new");
    window.location.reload();
  }, [router]);

  const deleteData = useCallback(() => {
    const url = '/masters/accomodationmaster';
    router.push(url);
    alert("Saved Data");
    window.location.reload();
  }, [router]);

  const printData = useCallback(() => {
    const url = '/masters/accomodationmaster';
    router.push(url);
    alert("printed Data");
    window.location.reload();
  }, [router]);

  const onLogClick = useCallback(() => {
    setModalVisible(true);
  }, []);

  const draftData = useCallback(() => {
    const url = '/masters/accomodationmaster';
    router.push(url);
    window.location.reload();
  }, [router]);

  return (
    <div className='w-full h-full px-5 py-5 lg:px-20 lg:pb-14 lg:pt-8'>
      <div className='absolute top-0 right-0 z-5'>
        <Sidebar fillFormWithPredefinedData={fillFormWithPredefinedData} docCd={docCd} docKey={docKey} />
      </div>
      <MaxWidthWrapper>
        <div className='border-solid'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormHeader
                onNew={addNew}
                onSave={form.handleSubmit(onSubmit)}
                onDelete={deleteData}
                onPrint={printData}
                onLog={onLogClick}
                onDraft={draftData}
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
                    placeholder={getLanguageByEnglish("Manama")}
                    onValueChange={(field, value) => form.setValue("area", value)}
                  />
                </div>
                <div className="grid gap-1 py-1 lg:col-span-6">
                  <DPTextArea
                    formcontrol={form.control}
                    name="remarks"
                    disabled={false}
                    type="text"
                    labelText={getLanguageByEnglish("Remarks")}
                    placeholder={getLanguageByEnglish("Write down your notes here.")}
                    onValueChange={(field, value) => form.setValue("remarks", value)}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>

      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)} title="Log Data" docCd={docCd} />
    </div>
  );
};

export default AccomodationMaster;
