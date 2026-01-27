"use client";

import { useEffect, useState } from "react";

export interface InputProps {
  title?: string | ""; 
  tabIndex?: number | 0;
}

export default function Input({ title, tabIndex}: InputProps) {
 
  useEffect(() => {
   
  }, [fetch]);

  return (
    <div style={style} tabIndex={tabIndex} title={title}>  
     
    </div>
  );
}

const style: React.CSSProperties = {
  display: "flex",  
};

