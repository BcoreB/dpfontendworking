import { Check, ChevronsUpDown, Divide } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";

interface DPComboBoxPickerProps {
    formcontrol:any ,
    name:string , 
    labelText: string
    data: { value: string; label: string }[];
    onValueChange: (field: string, value: string ) => void;
    disabled:boolean
  }
  
  const DPComboBox: React.FC<DPComboBoxPickerProps> =({formcontrol,name,labelText,data,onValueChange,disabled=false})=>
{

return (
 
      <FormField
          
        control={formcontrol}
        name={name}
        render={({ field }) => (
          <FormItem >
           
            <FormLabel>{labelText}</FormLabel>
            <Popover >
              <PopoverTrigger asChild>
                <FormControl >
                  <Button
                   disabled = {disabled}
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data.find(
                          (item) => item.value === field.value
                        )?.label
                      : `Select ${labelText}`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 " style={{ zIndex: 1100 }}>
                <Command>
                  <CommandInput placeholder={`Search ${labelText}  ..`} />
                  <CommandEmpty>`No ${labelText} found` .</CommandEmpty>
                  <CommandGroup>
                    {data.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.value}
                        onSelect={() => {
                          //form.setValue({name}, item.value)
                          onValueChange(name,item.value)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 z-auto",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
 
            <FormMessage />
          </FormItem>
        )}
      />
)      
}

export default DPComboBox