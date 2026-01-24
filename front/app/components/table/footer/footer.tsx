"use client";

export interface FooterProps<T> {
}

export default function Footer<T>({ }: FooterProps<T>) {
  return (    
    <div style={style}>  
      Footer
    </div>  
  );
}

const style: React.CSSProperties = {
  display: "flex",
  padding: "2px 10px",
  borderTop: "2px solid #2b2b2b", 
}