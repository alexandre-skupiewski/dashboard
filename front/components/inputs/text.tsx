"use client";

import { use, useEffect, useState } from "react";
import inputCss from './input.module.css';
import textCss from './text.module.css';
import { InputProps } from "./input";

export interface TextProps extends InputProps{
  placeholder?: string,
  value?: string,
  onChange?: (value: string) => void;
}

export default function Text({ 
    title="", 
    tabIndex=0, 
    placeholder = "", 
    value: originalValue = "", 
    onChange,
    style
  }: TextProps) {
  const [value, setValue] = useState<string>(originalValue);
  
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  useEffect(() => {
    setValue(originalValue);
  }, [originalValue]);
  
  return (
    <input 
      type="text" 
      title={title} 
      tabIndex={tabIndex} 
      placeholder={placeholder}
      className={`${inputCss.input} ${textCss.text}`}
      value={value}
      onChange={change} 
      style={style}
    />
  );
}

