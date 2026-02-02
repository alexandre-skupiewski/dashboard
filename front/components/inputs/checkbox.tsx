"use client";

import { useEffect, useState } from "react";
import inputCss from './input.module.css';
import checkboxCss from './checkbox.module.css';
import { InputProps } from "./input";
import CheckSvg from "@/components/svgs/check";

export interface Props extends InputProps{
  children?: React.ReactNode,
  value?: boolean,
  onChange: (value: boolean) => void;
}

export default function Checkbox({ title="", tabIndex=0, children, value: originalValue = false, onChange}: Props) {
  const [value, setValue] = useState<boolean>(originalValue);
  
  const click = (e: React.MouseEvent<HTMLDivElement>) => {
    const newValue = !value;
    setValue(newValue);
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {   
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); 
      const newValue = !value;
      setValue(newValue);
      onChange(newValue);
    }
  };

  useEffect(() => {
    setValue(originalValue);
  }, [originalValue]);
  
  return (
    <div 
      className={`${inputCss.input} ${checkboxCss.checkbox}`}
      title={title}
      tabIndex={tabIndex}
      onClick={click}
      onKeyDown={handleKeyDown}
    >      
      <div className={checkboxCss.icon}>{value ? (<CheckSvg />) : (<></>)}</div>
      <div className={checkboxCss.label}>{children}</div>
    </div>
    
  );
}

