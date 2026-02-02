"use client";

import { useEffect, useState } from "react";

export interface InputProps {
  title?: string; 
  tabIndex?: number;
  disabled?: boolean;
}

export default function Input({ title, tabIndex=0, disabled = false}: InputProps) {

  return (
    <div style={style} tabIndex={tabIndex} title={title}>  
     
    </div>
  );
}

const style: React.CSSProperties = {
  display: "flex",  
};

