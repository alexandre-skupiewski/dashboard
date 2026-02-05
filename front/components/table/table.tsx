"use client";

import { ComponentType, CSSProperties } from "react";
import css from './table.module.css';
import Header from "./header/header";
import Body from "./body/body";
import Footer from "./footer/footer";
import { Model, Collection } from "@/helpers/models/models";

export interface Column<M extends Model> {
  title: string;
  accessor: string;
  style: CSSProperties,
  component?: ComponentType<{ model: M; column: Column<M> }>;
}

interface TableProps<M extends Model> {
  columns: Column<M>[];
  onRowSelected?: (model: M) => void;
  collection?: Collection<M>;
}

export default function Table<M extends Model>({ columns, onRowSelected, collection }: TableProps<M>) {  
  return (
    <div className={css.table}>
      <Header<M> columns={columns} />
      <Body<M> columns={columns} collection={collection} onRowSelected={onRowSelected} />
      <Footer<M> collection={collection}/>
    </div>
  );
}

