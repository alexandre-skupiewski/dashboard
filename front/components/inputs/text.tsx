"use client";

import { useEffect, useState } from "react";
import inputCss from './input.module.css';
import textCss from './text.module.css';
import { InputProps } from "./input";

export interface TextProps extends InputProps{
  placeholder?: string | ""
}

export default function Text({ title, tabIndex, placeholder}: Props) {
 
  return (
    <input 
      type="text" 
      title={title} 
      tabIndex={tabIndex} 
      placeholder={placeholder}
      className={`${inputCss.input} ${textCss.text}`}
    />
  );
}

