"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  formcontrol: any;
  name: string;
  labelText: string;
}

const DPDatePicker: React.FC<DatePickerProps> = ({
  formcontrol,
  name,
  labelText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={formcontrol}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labelText}</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      setIsOpen(true); // Open the Popover
                    }
                    if (e.key === "Enter" && isOpen) {
                      setIsOpen(false); // Close the Popover
                    }
                  }}
                >
                  {field.value ? (
                    format(field.value, "dd-MMM-yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
              style={{ zIndex: 1100 }}
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setIsOpen(false); // Close the Popover after selection
                }}
                disabled={(date) =>
                  date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DPDatePicker;
