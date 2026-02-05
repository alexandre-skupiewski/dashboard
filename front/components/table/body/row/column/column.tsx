"use client";

import css from './column.module.css';
import { Model } from "@/helpers/models/models";

export interface Column<M extends Model> {
  children: React.ReactNode
  style: object;
}

export default function Column<M extends Model>({ children, style}: Column<M>) {  
  return (
    <div className={css.column} style={style}>{children}</div>
  );
}