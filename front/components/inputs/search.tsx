"use client";

import { use, useEffect, useState, useRef } from "react";
import inputCss from './input.module.css';
import searchCss from './search.module.css';
import { InputProps } from "./input";
import MagnifyingGlassSvg from "@/components/svgs/magnifyingGlass";

export interface TextProps extends InputProps{
  placeholder?: string,
  value?: string,
  onChange: (value: string) => void;
}

export default function Text({ title="", tabIndex=0, placeholder = "", onChange}: TextProps) { 
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const submit = () => {
    onChange(value);
  };
  
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {    
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, 1000);
  }; 

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.select();
  };

  const handleBlur = () => {
    setIsFocused(false);   
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();              // empêche le focus suivant
      setIsFocused(false);
      
      inputRef.current?.blur();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      submit();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return (
    <div    
      className={`${inputCss.input} ${searchCss.search} ${isFocused ? searchCss.focused : ""}`}
      tabIndex={tabIndex}
      onFocus={handleFocus} 
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <input 
        ref={inputRef}
        type="text" 
        title={title} 
        placeholder={placeholder}             
        onChange={change} 
        tabIndex={-1}
        onKeyDown={handleInputKeyDown}
      />
      <div className={searchCss.button} onClick={submit}>
        <div className={searchCss.icon}><MagnifyingGlassSvg/></div>
      </div>
    </div>
  );
}

