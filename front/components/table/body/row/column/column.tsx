"use client";

import css from './column.module.css';

export interface ColumnProps<T> {
  content: string;
  accessor: keyof T;
  style: object;
}

export default function Column<T>({ content, accessor, style }: ColumnProps<T>) { 
  return (
    <div className={css.column} style={style}>{content}</div>
  );
}