import { FormControl, FormField, FormItem, FormLabel} from "./form";
import { Textarea } from "@/components/ui/textarea"

interface DPInputProps {
    formcontrol:any ,
    name:string , 
    labelText: string
    placeholder:string
    disabled:boolean
    // data: { value: string; label: string }[];
    onValueChange: (field: string, value: string ) => void;
  }
  
  const DPTextArea: React.FC<DPInputProps> =({formcontrol,name,labelText,placeholder,disabled,onValueChange })=>
{

return (
 
    <FormField                      disabled={disabled}
                                    control={formcontrol}
                                    name={name}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>{labelText}</FormLabel>
                                        <FormControl>
                                            {/* <Input  disabled={disabled} placeholder={placeholder} {...field} onChange={e => onValueChange(name,e.target.value)}/> */}
                                            <Textarea id="message-2"  disabled={disabled} placeholder={placeholder} {...field} onChange={e => onValueChange(name,e.target.value)}/>
                                            
                                        </FormControl>
                        
                                        </FormItem>
                                        
                                    )}
                                />)}
                                export default DPTextArea
