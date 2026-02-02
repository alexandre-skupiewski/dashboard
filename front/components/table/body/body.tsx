"use client";

import css from './body.module.css';
import Row from "./row/row";
import { Model, Collection } from "@/models/models";

export interface ColumnProps<M extends Model> {
  title: string;
  accessor: keyof M;
  style: object;
}

interface BodyProps<M extends Model> {  
  columns: ColumnProps<M>[];
  collection: Collection | undefined;
  onRowSelected?: (model: M) => void;
}

export default function Body<M extends Model>({ columns, collection, onRowSelected }: BodyProps<M>) {
  return (    
    <div className={css.body}>      
      {collection?.getModels().map((model, i) => (
        <Row<M> columns={columns} model={model} onRowSelected={onRowSelected} key={String(i)}/>        
      ))}     
    </div>  
  );
}

