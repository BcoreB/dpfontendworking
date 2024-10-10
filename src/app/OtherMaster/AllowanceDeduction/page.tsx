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
import DocumentHeader from '@/components/Menu/documentHeader';



const AllowanceDeduction = () => {
    const docCd = 7;
    const docKey = 101;
    const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>();
    const [allowanceDetails, setallowanceDetails] = useState<EmpAllowanceDeductionFormulaDet[]>([]);
    const router = useRouter();

    // Initialize the form
    const form = InitializeForm();
    return (
        <div className="w-full h-full px-5 py-5 lg:px-20 lg:pb-14 lg:pt-8">
          <MaxWidthWrapper className="px-5 py-5 lg:px-10 lg:pb-6 lg:pt-10">
            <div className="border-solid">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
                  <DocumentHeader
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
                          form.setValue("AllDedCode", value);
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
                          form.setValue("AlldedName", value);
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
                          form.setValue("AlldedShortName", value);
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
                          form.setValue("Type", value);
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
                          form.setValue("SubType", value);
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
                          form.setValue("InputType", value);
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
                          form.setValue("SeqNo", Number(value));
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

export default AllowanceDeduction


