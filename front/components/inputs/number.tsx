"use client";

import { use, useEffect, useState } from "react";
import inputCss from './input.module.css';
import numberCss from './number.module.css';
import { InputProps } from "./input";

export interface NumberProps extends InputProps{
  value?: number,
  min?: number,
  max?: number,
  step?: number,
  precision?: number,
  onChange?: (value: number) => void;
}

export default function NumberInput({ 
    title="", 
    min,
    max,
    step,
    precision=0,
    tabIndex=0, 
    value: originalValue = 0, onChange,
    style
  }: NumberProps) {
  const [value, setValue] = useState<number>(originalValue);
  
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: number = e.target.value === "" ? 0 : Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValue(originalValue);
  }, [originalValue]);
  
  return (
    <input 
      type="number" 
      title={title} 
      tabIndex={tabIndex} 
      className={`${inputCss.input} ${numberCss.number}`}
      value={value.toFixed(precision)}
      onChange={change} 
      style={style}
      min={min} 
      max={max} 
      step={step}
    />
  );
}

