import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { Input } from "./input";
import { FaEllipsisH } from "react-icons/fa";

interface DPInputProps {
  formcontrol: any;
  name: string;
  labelText: string;
  placeholder: string;
  disabled: boolean;
  type: string;
  onValueChange: (field: string, value: string) => void;
  onIconClick?: () => void; // Optional prop for icon click handler
}

const DPInput: React.FC<DPInputProps> = ({
  formcontrol,
  name,
  labelText,
  placeholder,
  disabled,
  type,
  onValueChange,
  onIconClick,
}) => {
  return (
    <FormField
      control={formcontrol}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labelText}</FormLabel>
          <FormControl>
            {/* Wrap Input and Icon in a single div */}
            <div style={{ position: "relative", width: "100%" }}>
              <Input
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                {...field}
                onChange={(e) => onValueChange(name, e.target.value)}
                style={{ paddingRight: "2rem", width: "100%" }} // Ensure the input takes full width
              />
              <FaEllipsisH
                onClick={onIconClick}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#000", // Icon color (change as needed)
                }}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default DPInput;
