"use client";

import { memo } from "react";
import css from './select.module.css';
import SelectInput, {SelectItem} from "@/components/inputs/select"
import { SelectProps } from "@/components/inputs/select"

export interface Props extends SelectProps {
  label?: string,
}

function Select({ title="", tabIndex=0, items = [], value = "", onChange, label}: Props) {
  return (
    <div className={css.select} title={title}>
      {
        label ? (
          <div className={css.label}>{label}</div>
        ) : (<></>)
      }      
      
      <SelectInput 
        key={"vatType"} 
        title={title}
        value={value}
        items={items}
        onChange={onChange}
      />             
    </div>
  );
}

export default memo(Select, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});