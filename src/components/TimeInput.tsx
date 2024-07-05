'use client'
import { useState } from "react";
import { Input } from "./ui/input";

interface TimeInputProps {
  value: any;
  onChange: (val: any) => void;
}
const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  
    const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: any) => {
    let val: any = e.target.value.replace(/[^0-9]/g, "");

    if (val.length >= 2) val = val.slice(0, 2) + ":" + val.slice(2);
    if (val.length >= 5) val = val.slice(0, 5) + ":" + val.slice(5, 7);
    console.log({ val });

    setInputValue(val);
    onChange(val);
  };
    return (
        <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="HH:mm:ss"
      />
    )
};
export default TimeInput;
