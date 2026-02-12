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
  step = 1,
  precision = 0,
  tabIndex = 0, 
  value: originalValue = 0,
  onChange,
  style
}: NumberProps) {

  const [raw, setRaw] = useState<string>(
    originalValue.toFixed(precision)
  );

  const clampAndFormat = (n: number) => {
    if (min !== undefined) n = Math.max(min, n);
    if (max !== undefined) n = Math.min(max, n);

    n = Math.round(n * 10 ** precision) / 10 ** precision;

    setRaw(n.toFixed(precision));
    onChange?.(n);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(',', '.');
    if (/^-?\d*\.?\d*$/.test(v)) {
      setRaw(v);
    }
  };

  const apply = () => {
    let n = Number(raw);
    if (Number.isNaN(n)) n = originalValue;
    clampAndFormat(n);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let n = Number(raw);
    if (Number.isNaN(n)) n = originalValue;

    /*if (e.key === "ArrowUp") {
      e.preventDefault();
      clampAndFormat(n + step);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      clampAndFormat(n - step);
    }*/

    if (e.key === "Enter" || e.key === " ") {
      apply();
    }
  };

  useEffect(() => {
    setRaw(originalValue.toFixed(precision));
  }, [originalValue, precision]);


  return (
    <input
      type="text"
      inputMode="decimal"
      title={title}
      tabIndex={tabIndex}
      className={`${inputCss.input} ${decimalNumberCss.decimalNumber}`}
      value={raw}
      onChange={handleChange}
      onBlur={apply}
      onKeyDown={handleKeyDown}
      style={style}
    />
  );
}
