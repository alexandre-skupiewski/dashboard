"use client";

import css from './body.module.css';
import Row from "./row/row";

export interface ColumnProps<T> {
  title: string;
  accessor: keyof T;
  style: object;
}

interface BodyProps<T> {  
  columns: ColumnProps<T>[];
  data: T[];
  onRowSelected?: (model: T) => void;
}

export default function Body<T>({ columns, data, onRowSelected }: BodyProps<T>) {
  return (    
    <div className={css.body}>
      <div className={css.bodyContainer}>
        {data.map((row, i) => (
          <Row<T> columns={columns} model={row} onRowSelected={onRowSelected} key={String(i)}/>        
        ))}
      </div>  
    </div>  
  );
}

