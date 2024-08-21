import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { Input } from "./input";
import { FaEllipsisH } from "react-icons/fa";
import FormModal from "@/app/masters/formModel"; // Import FormModal

interface DPInputBrowseProps {
  formcontrol: any;
  name: string;
  labelText: string;
  placeholder: string;
  disabled: boolean;
  type: string;
  onValueChange: (field: string, value: string) => void;
  getValues: () => any; // Add getValues prop
  setValue: (field: string, value: any) => void; // Add setValue prop
  docCd: number; // Pass docCd prop
  fieldMapping: { column: string; formField: string }[]; // Pass fieldMapping prop
}

const DPInputBrowse: React.FC<DPInputBrowseProps> = ({
  formcontrol,
  name,
  labelText,
  placeholder,
  disabled,
  type,
  onValueChange,
  getValues, // Destructure getValues prop
  setValue, // Destructure setValue prop
  docCd,
  fieldMapping,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleModalClose = (mappedData: any) => {
    if (mappedData) {
      Object.keys(mappedData).forEach((key) => {
        if (getValues()[key] !== undefined) { // Use getValues prop
          setValue(key, mappedData[key]); // Use setValue prop
        }
      });
    }
    setModalVisible(false);
  };

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
                onClick={handleOpenModal} // Open modal on icon click
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "#000", // Icon color (change as needed)
                }}
              />
            </div>
          </FormControl>
          {/* Render FormModal */}
          <FormModal
            isVisible={isModalVisible}
            onClose={handleModalClose}
            title="Select Data"
            docCd={docCd}
            fieldMapping={fieldMapping}
          />
        </FormItem>
      )}
    />
  );
};

export default DPInputBrowse;
