"use client";

import { useEffect, useState } from "react";
import inputCss from './input.module.css';
import dateCss from './date.module.css';
import { InputProps } from "./input";

export interface DateProps extends InputProps{
  placeholder?: string,
  value?: string,
  onChange: (value: string) => void;
}

export default function Date({ title="", tabIndex=0, placeholder = "", value: originalValue = "", onChange}: DateProps) {
  const [value, setValue] = useState<string>(originalValue);
  
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setValue(originalValue);
  }, [originalValue]);
  
  return (
    <input 
      type="date" 
      title={title} 
      tabIndex={tabIndex} 
      placeholder={placeholder}
      className={`${inputCss.input} ${dateCss.date}`}
      value={value}
      onChange={change} 
    />
  );
}

