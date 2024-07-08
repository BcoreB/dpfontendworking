import React, { useState } from "react";
import {
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";

interface DPComboBoxPickerProps {
  formcontrol: any;
  name: string;
  labelText: string;
  data: { value: string; label: string }[];
  onValueChange: (field: string, value: string[]) => void; // Updated to pass an array of selected values
  disabled: boolean;
}

const DPComboBoxMulti: React.FC<DPComboBoxPickerProps> = ({
  formcontrol,
  name,
  labelText,
  data,
  onValueChange,
  disabled = false,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelect = (item: { value: string; label: string }) => {
    const index = selectedValues.indexOf(item.value);
    if (index === -1) {
      // Item is not selected, add it to the selected values
      setSelectedValues([...selectedValues, item.value]);
    } else {
      // Item is already selected, remove it from the selected values
      const updatedValues = [...selectedValues];
      updatedValues.splice(index, 1);
      setSelectedValues(updatedValues);
    }
  };

  return (
    <FormField
      control={formcontrol}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labelText}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    selectedValues.length === 0 && "text-muted-foreground"
                  )}
                >
                  {selectedValues.length > 0
                    ? selectedValues.map((value) =>
                        data.find((item) => item.value === value)?.label
                      )
                    : `Select ${labelText}`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={`Search ${labelText}  ..`} />
                <CommandEmpty>`No ${labelText} found`.</CommandEmpty>
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => {
                        handleSelect(item);
                        onValueChange(name, selectedValues);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.includes(item.value)
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
  );
};

export default DPComboBoxMulti;
