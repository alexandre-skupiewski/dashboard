"use client";

import css from './column.module.css';

export interface ColumnProps<T> {
  title: string;
  accessor: keyof T;
  style: object;
}

export default function Column<T>({ title, accessor, style }: ColumnProps<T>) { 
  return (
    <div className={css.column} style={style}>{title}</div>
  );
}