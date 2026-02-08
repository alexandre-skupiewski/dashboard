"use client";

import { useEffect, useState } from "react";

export interface InputProps {
  title?: string; 
  tabIndex?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function Input({ title, tabIndex=0, disabled = false, style}: InputProps) {

  return (
    <div style={style} tabIndex={tabIndex} title={title}>  
     
    </div>
  );
}

const style: React.CSSProperties = {
  display: "flex",  
};

