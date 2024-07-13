"use client"
 import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
  id: string;
  defdate: Date | null;
  onValueChange: (field: string, value: string | Date) => void;
}

const MyDatePicker: React.FC<DatePickerProps> = ({ id, defdate, onValueChange }) => {
  const { control } = useForm();
  const [date, setDate] = React.useState<Date>(defdate as Date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'dd-MMM-yyyy') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Controller
          name={id}
          control={control}
          defaultValue={defdate}
          render={({ field }) => (
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(date: Date | undefined) => {
                onValueChange(id, date as Date);
                setDate(date as Date);
              }}
              initialFocus
            />
          )}
        />
      </PopoverContent>
    </Popover>
  );
};

export default MyDatePicker;
