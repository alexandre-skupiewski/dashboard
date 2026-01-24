"use client";

import { useEffect, useState } from "react";

export interface InputProps {
  title: string; 
  tabIndex: number;
}

export default function Input({ title = "", tabIndex = 0}: InputProps) {
 
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

