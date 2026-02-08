"use client";

import { useEffect, useState } from "react";
import inputCss from './input.module.css';
import decimalNumberCss from './decimalNumber.module.css';
import { InputProps } from "./input";

export interface NumberProps extends InputProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  onChange?: (value: number) => void;
}

export default function DecimalNumberInput({ 
  title = "", 
  min,
  max,
  precision = 0,
  tabIndex = 0, 
  value: originalValue = 0,
  onChange,
  style
}: NumberProps) {
  const [raw, setRaw] = useState<string>(originalValue.toFixed(precision));
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(',', '.');
    if (/^-?\d*\.?\d*$/.test(v))
      setRaw(v);
  };

  const handleBlur = () => {
    let n = Number(raw);

    if (Number.isNaN(n))
      n = originalValue;

    if (min !== undefined) n = Math.max(min, n);
    if (max !== undefined) n = Math.min(max, n);

    n = Math.round(n * 10 ** precision) / 10 ** precision;

    setRaw(n.toFixed(precision));
    onChange?.(n);
  };
  
  return (
    <input
      type="text"
      inputMode="decimal"
      title={title}
      tabIndex={tabIndex}
      className={`${inputCss.input} ${decimalNumberCss.decimalNumber}`}
      value={raw}
      onChange={handleChange}
      onBlur={handleBlur}
      style={style}
    />
  );
}
