"use client";

import css from './row.module.css';
import Column from "./column/column";
import { Model } from "@/models/models";

export interface ColumnProps<M extends Model> {
  title: string;
  accessor: keyof M;
  style: object
}

interface RowProps<M extends Model> {  
  columns: ColumnProps<M>[];
  model: Model;
  onRowSelected?: (model: M) => void;
}

export default function Row<M extends Model>({ columns, model, onRowSelected}: RowProps<M>) {
  return (    
    <div 
      className={css.row}
      onDoubleClick={() => onRowSelected?.(model)}
    >  
      {columns.map((col) => (
        <Column<M> 
          content={String(model.get(col.accessor as string))} 
          accessor={col.accessor} 
          style={col.style} 
          key={col.accessor as string} />       
      ))}
    </div>  
  );
}

