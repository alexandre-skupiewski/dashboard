"use client";

import Column from "./column/column";

export interface ColumnProps<T> {
  title: string;
  accessor: keyof T;
  style: object
}

interface HeaderProps<T> {  
  columns: ColumnProps<T>[];
}

export default function Header<T>({ columns }: HeaderProps<T>) {
  return (    
    <div style={style}>  
      {columns.map((col) => (
        <Column<T> 
          title={col.title} 
          accessor={col.accessor} 
          style={col.style} 
          key={col.accessor as string} />       
      ))}
    </div>  
  );
}

const style: React.CSSProperties = {
  display: "flex",
  borderBottom: "2px solid #2b2b2b",
  padding: "3px 10px",
}

