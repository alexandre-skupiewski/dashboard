"use client";


import { ReactNode } from "react";
import css from './text.module.css';
import TextInput from "@/components/inputs/text"
import { TextProps } from "@/components/inputs/text"

export interface Props extends TextProps {
  children?: ReactNode;
}

export default function Text({ title, children, tabIndex, placeholder}: Props) {
  return (
    <div className={css.text} title={title}>
      {
        children ? (
          <div className={css.label}>{children}</div>
        ) : (<></>)
      }      
      
      <TextInput placeholder={placeholder} tabIndex={tabIndex}/>           
    </div>
  );
}
