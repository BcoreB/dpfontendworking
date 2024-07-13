import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import DPInput from "@/components/ui/dpinput"
import getLanguageByEnglish from "@/utils/languages"
import { useFormContext } from "react-hook-form";

const EmployeeSalary: React.FC<{name:string}> = ({name}) => {
    const { control,setValue  } = useFormContext();
    return         <MaxWidthWrapper>
        <div className="border-solid ">
            <div className="grid grid-cols-1 lg:grid-cols-6   gap-1 py-1">
            <div className="grid gap-1 py-1">
                                <DPInput
                                    formcontrol={control}
                                    name={`basicsalary`}
                                    disabled={false}
                                    type="text"
                                    labelText ={getLanguageByEnglish("Basic Salary")}
                                    placeholder={getLanguageByEnglish("0.000")}
                                    onValueChange={(field,value)=>{
                                        console.log('basicsalary',value,control)
                                        setValue("basicsalary",value)
                                        onerror=()=>{
                                            console.log(Error)
                                        }
                                 
                                      
                                      }}
                            
                                    
                                />
                            </div>
                
            </div>
        </div>
    </MaxWidthWrapper>
            
}
export default EmployeeSalary