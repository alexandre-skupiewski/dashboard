"use client";

import css from './header.module.css';
import ColumnComp from "./column/column";
import { Model } from "@/helpers/models/models";
import { Column } from "../table";

interface HeaderProps<M extends Model> {
  columns: Column<M>[];
}

export default function Header<M extends Model>({ columns }: HeaderProps<M>) {
  return (
    <div className={css.header}>
      {columns.map((col) => (
        <ColumnComp<M>
          title={col.title}
          accessor={col.accessor}
          style={col.style}
          key={col.accessor as string} />
      ))}
    </div>
  );
}

