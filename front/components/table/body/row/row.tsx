"use client";

import css from './row.module.css';
import Column from "./column/column";

export interface ColumnProps<T> {
  title: string;
  accessor: keyof T;
  style: object
}

interface RowProps<T> {  
  columns: ColumnProps<T>[];
  model: T;
  onRowSelected?: (model: T) => void;
}

export default function Row<T>({ columns, model, onRowSelected}: RowProps<T>) {
  return (    
    <div 
      className={css.row}
      onClick={() => onRowSelected?.(model)}
    >  
      {columns.map((col) => (
        <Column<T> 
          content={String(model[col.accessor])} 
          accessor={col.accessor} 
          style={col.style} 
          key={col.accessor as string} />       
      ))}
    </div>  
  );
}

