"use client";

import css from './row.module.css';
import Column from "./column/column";

export interface ColumnProps<T> {
  title: string;
  accessor: keyof T;
}

interface RowProps<T> {  
  columns: ColumnProps<T>[];
  model: T;
}

export default function Row<T>({ columns, model}: RowProps<T>) {
  return (    
    <div className={css.row}>  
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

