"use client";

import { useEffect, useState } from "react";
import inputCss from './input.module.css';
import datetimeCss from './datetime.module.css';
import { InputProps } from "./input";

export interface DatetimeProps extends InputProps{
  placeholder?: string,
  value?: string,
  onChange: (value: string) => void;
}

export default function Date({ title="", tabIndex=0, placeholder = "", value: originalValue = "", onChange}: DatetimeProps) {
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
      type="datetime-local" 
      title={title} 
      tabIndex={tabIndex} 
      placeholder={placeholder}
      className={`${inputCss.input} ${datetimeCss.datetime}`}
      value={value}
      onChange={change} 
    />
  );
}

