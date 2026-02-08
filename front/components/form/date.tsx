"use client";

import { memo } from "react";
import css from './date.module.css';
import DateInput from "@/components/inputs/date"
import { DateProps } from "@/components/inputs/date"

export interface Props extends DateProps {
  label?: string
}

function Date({ title="", tabIndex=0, placeholder, value, onChange, label}: Props) {
  return (
    <div className={css.date} title={title}>
      {
        label ? (
          <div className={css.label}>{label}</div>
        ) : (<></>)
      }      
      
      <DateInput placeholder={placeholder} tabIndex={tabIndex} value={value} onChange={onChange} title={title}/>           
    </div>
  );
}

export default memo(Date, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});