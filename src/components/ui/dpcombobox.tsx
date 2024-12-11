import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandInput } from "./command";

interface DPComboBoxPickerProps {
  formcontrol: any;
  name: string;
  labelText: string;
  data: { value: string; label: string }[];
  onValueChange: (field: string, value: string) => void;
  disabled: boolean;
}

const DPComboBox: React.FC<DPComboBoxPickerProps> = ({
  formcontrol,
  name,
  labelText,
  data,
  onValueChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // No item highlighted initially

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case "Enter":
        event.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          const selectedItem = data[highlightedIndex];
          if (selectedItem) {
            onValueChange(name, selectedItem.value);
            setHighlightedIndex(-1); // Reset highlight after selection
            setIsOpen(false);
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (value: string, index: number) => {
    onValueChange(name, value);
    
    setIsOpen(false);
  };

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  return (
    <FormField
      control={formcontrol}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labelText}</FormLabel>
          <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="outline"
                  role="combobox"
                  onKeyDown={handleKeyDown}
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? data.find((item) => item.value === field.value)?.label
                    : `Select ${labelText}`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" style={{ zIndex: 1100 }}>
              <Command>
                <CommandInput placeholder={`Search ${labelText}...`} />
                <CommandEmpty>No {labelText} found.</CommandEmpty>
                <CommandGroup>
                  {data.map((item, index) => (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onSelect={() => handleSelect(item.value, index)}
                      className={cn(
                        highlightedIndex === index ? "bg-gray-200" : "",
                        "cursor-pointer"
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          item.value === field.value ? "opacity-100" : "opacity-0"
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

export default DPComboBox;
