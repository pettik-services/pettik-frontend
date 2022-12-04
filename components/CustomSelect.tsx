import React from "react";
import Select from "react-select";

export interface OptionProps {
  label: string;
  value: string;
}

interface Props {
  handleChange: (selectOption: any) => void;
  options: OptionProps[];
  noOptionsMessage?: string;
  placeholderText?: string;
  value?: OptionProps | null;
}

const CustomSelect: React.FC<Props> = ({
  handleChange,
  options,
  noOptionsMessage,
  placeholderText = "Enter value",
  value = null,
}) => {
  return (
    <Select
      value={value}
      noOptionsMessage={({ inputValue }) =>
        !inputValue ? noOptionsMessage || "No data" : "No results found"
      }
      placeholder={placeholderText}
      onChange={handleChange}
      isSearchable
      options={options}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          border: 0,
          boxShadow: "none",
          paddingTop: "2px",
          paddingBottom: "2px",
          fontFamily: "sans-light",
          fontSize: "14px",
          fontWeight: 300,
          paddingLeft: 4,
          paddingRight: 4,
        }),
        option: (base) => ({
          ...base,
          fontFamily: "sans-light",
          fontSize: "15px",
          fontWeight: 500,
        }),
        placeholder: (base) => ({
          ...base,
          color: "#9ca3af",
        }),
      }}
    />
  );
};

export default CustomSelect;
