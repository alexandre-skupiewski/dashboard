"use client";

import { ReactNode } from "react";
import inputCss from './input.module.css';
import buttonCss from './button.module.css';
import { InputProps } from "./input";

export interface Props extends InputProps { 
  svg?: React.FC | null;
  children?: ReactNode;
  onClick?:  () => void;
  color?: "primary" | "secondary" | "danger";
}

export default function Button({ children, title="", tabIndex=0, svg, onClick, disabled=false, color="primary" }: Props) { 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); 
      onClick?.();
    }
  };

  const Svg = svg;
  const colorClass = color ? buttonCss[color] : "";
  const className = `${inputCss.input} ${buttonCss.button} ${colorClass} ${disabled ? buttonCss.disabled : ""}`;

  return (
    <div      
      title={title} 
      tabIndex={disabled ? -1 : tabIndex}    
      className={className}
      role="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {
        Svg ? (
          <div className={buttonCss.icon}><Svg/></div>         
        ) : (<></>)
      }
      <div className={buttonCss.text}>{children}</div>
    </div>
  );
}

