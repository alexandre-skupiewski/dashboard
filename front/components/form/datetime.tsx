"use client";

import { memo } from "react";
import css from './date.module.css';
import DatetimeInput from "@/components/inputs/datetime"
import { DatetimeProps } from "@/components/inputs/datetime"

export interface Props extends DatetimeProps {
  label?: string
}

function Datetime({ title="", tabIndex=0, placeholder, value, onChange, label}: Props) {
  return (
    <div className={css.date} title={title}>
      {
        label ? (
          <div className={css.label}>{label}</div>
        ) : (<></>)
      }      
      
      <DatetimeInput placeholder={placeholder} tabIndex={tabIndex} value={value} onChange={onChange} title={title}/>           
    </div>
  );
}

export default memo(Datetime, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});