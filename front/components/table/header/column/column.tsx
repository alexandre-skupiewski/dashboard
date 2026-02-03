"use client";

import css from './column.module.css';
import { Model } from "@/helpers/models/models";

export interface ColumnProps<M extends Model> {
  title: string;
  accessor: keyof M;
  style: object;
}

export default function Column<M extends Model>({ title, accessor, style }: ColumnProps<M>) {
  return (
    <div className={css.column} style={style}>{title}</div>
  );
}