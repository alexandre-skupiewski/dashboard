"use client";

import { memo } from "react";
import css from './text.module.css';
import TextInput from "@/components/inputs/text"
import { TextProps } from "@/components/inputs/text"

export interface Props extends TextProps {
  label?: string
}

function Text({ title="", tabIndex=0, placeholder, value, onChange, label}: Props) {
  return (
    <div className={css.text} title={title}>
      {
        label ? (
          <div className={css.label}>{label}</div>
        ) : (<></>)
      }      
      
      <TextInput placeholder={placeholder} tabIndex={tabIndex} value={value} onChange={onChange} />           
    </div>
  );
}

export default memo(Text, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});