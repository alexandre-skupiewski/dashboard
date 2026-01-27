"use client";

import { ReactNode } from "react";
import inputCss from './input.module.css';
import buttonCss from './button.module.css';
import { InputProps } from "./input";

export interface Props extends InputProps{ 
  svg?: React.FC | null;
  children?: ReactNode;
}

export default function Button({ children, title, tabIndex, svg }: Props) {
 
  const Svg = svg;

  return (
    <div      
      title={title} 
      tabIndex={tabIndex}      
      className={`${inputCss.input} ${buttonCss.button}`}
    >
      {
        svg ? (
          <div className={buttonCss.svg}><Svg/></div>         
        ) : (<></>)
      }
      <div>{children}</div>
    </div>
  );
}

