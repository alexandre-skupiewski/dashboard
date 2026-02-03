"use client";

import { ReactNode } from "react";
import inputCss from './input.module.css';
import linkButtonCss from './linkButton.module.css';
import { InputProps } from "./input";

export interface Props extends InputProps { 
  svg?: React.FC | null;
  children?: ReactNode;
  onClick?:  () => void;
}

export default function LinkButton({ children, title="", tabIndex=0, onClick, disabled=false}: Props) { 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); 
      onClick?.();
    }
  };

  const className = `${inputCss.input} ${linkButtonCss.linkButton} ${disabled ? linkButtonCss.disabled : ""}`;

  return (
    <div      
      title={title} 
      tabIndex={disabled ? -1 : tabIndex}    
      className={className}
      role="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >     
      {children}
    </div>
  );
}

