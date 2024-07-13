import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";

interface DPInputProps {
    formcontrol:any ,
    name:string , 
    labelText: string
    placeholder:string
    disabled:boolean
    // data: { value: string; label: string }[];
    type:string
    onValueChange: (field: string, value: string ) => void;
  }
  
  const DPInput: React.FC<DPInputProps> =({formcontrol,name,labelText,placeholder,disabled,type, onValueChange })=>
{

return (
 
    <FormField                      disabled={disabled}
                                    control={formcontrol}
                                    name={name}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>{labelText}</FormLabel>
                                        <FormControl>
                                            <Input   type={type}  disabled={disabled} placeholder={placeholder} {...field} onChange={e => onValueChange(name,e.target.value)}/>
                                            
                                        </FormControl>
                        
                                        </FormItem>
                                        
                                    )}
                                />)}
                                export default DPInput
