"use client";

import Column from "./column/column";
import { Model } from "@/models/models";

export interface ColumnProps<M extends Model> {
  title: string;
  accessor: keyof M;
  style: object
}

interface HeaderProps<M extends Model> {  
  columns: ColumnProps<M>[];
}

export default function Header<M extends Model>({ columns }: HeaderProps<M>) {
  return (    
    <div style={style}>  
      {columns.map((col) => (
        <Column<M> 
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

