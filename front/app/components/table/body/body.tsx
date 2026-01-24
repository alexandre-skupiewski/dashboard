"use client";

import css from './body.module.css';
import Row from "./row/row";

export interface ColumnProps<T> {
  title: string;
  accessor: keyof T;
}

interface BodyProps<T> {  
  columns: ColumnProps<T>[];
  data: T[];
}

export default function Body<T>({ columns, data }: BodyProps<T>) {
  return (    
    <div className={css.body}>
      <div className={css.bodyContainer}>
        {data.map((row, i) => (
          <Row<T> columns={columns} model={row} key={String(i)}/>        
        ))}
      </div>  
    </div>  
  );
}

