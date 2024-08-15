import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Adjust the path as needed
 
interface MyRadioGroupProps {
  formcontrol: any;
  name: string;
  labelText: string;
  options: { value: string; label: string }[];
  onValueChange: (field: string, value: string) => void;
}

const DpRadioGroup: React.FC<MyRadioGroupProps> = ({ formcontrol, name, labelText, options, onValueChange }) => {
  return (
    <FormField
      control={formcontrol}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labelText}</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange(name, value);
              }}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                  <label htmlFor={`${name}-${option.value}`} className="text-sm font-medium">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DpRadioGroup;
