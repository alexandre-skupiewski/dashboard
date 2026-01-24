"use client";

import { useEffect, useState } from "react";
import { InputProps } from "../input";

export interface TextProps extends InputProps{
  placeholder?: string
}

export default function Search({ title = "", tabIndex = 0, placeholder = ""}: SearchProps) {
 
  useEffect(() => {
   
  }, [fetch]);

  return (
    <div style={style} tabIndex={tabIndex}>  
     
    </div>
  );
}

const style: React.CSSProperties = {
  display: "flex",  
};

