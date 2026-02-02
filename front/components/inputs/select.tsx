"use client";

import { useEffect, useState } from "react";
import inputCss from './input.module.css';
import selectCss from './select.module.css';
import { InputProps } from "./input";

export class SelectItem {
  public id: string;
  public value: string;
  public title?: string;  

  constructor(id: string, value: string, title: string = "" ) {
    this.id = id;
    this.value = value;
    this.title = title;
  }
}

export interface SelectProps extends InputProps{
  items: SelectItem[],
  value?: string,
  onChange: (value: string) => void;
}

export default function Select({ title="", tabIndex=0, items = [], value: originalValue = "", onChange}: SelectProps) {
  const [value, setValue] = useState<string>(originalValue);
  
  useEffect(() => {
    setValue(originalValue);
  }, [originalValue]);
  
  return (
    <select 
      value={value} 
      className={`${inputCss.input} ${selectCss.select}`}
      title={title}
      tabIndex={tabIndex}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);
      }}
    >      
      {items.map((item) => (
        <option
          key={item.id}
          value={item.id}
          title={item.title}
          className={selectCss.option}
        >
          {item.value}
        </option>
      ))}
      
    </select>    
  );
}

