"use client";

import css from './column.module.css';
import { Model } from "@/helpers/models/models";

export interface ColumnProps<M extends Model> {
  children: React.ReactNode
  style: object;
  content: string;
}

export default function Column<M extends Model>({ children, style, content}: ColumnProps<M>) {  
  return (
    <div className={css.column} style={style}>{String(content)}</div>
  );
}