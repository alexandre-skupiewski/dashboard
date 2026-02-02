"use client";

import css from './column.module.css';
import { Model } from "@/models/models";

export interface ColumnProps<M extends Model> {
  content: string;
  accessor: keyof M;
  style: object;
}

export default function Column<M extends Model>({ content, accessor, style }: ColumnProps<M>) { 
  return (
    <div className={css.column} style={style}>{content}</div>
  );
}