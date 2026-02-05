"use client";

import css from "./date.module.css";
import { Model } from "@/helpers/models/models";
import ColumnContent from "./column";

export default function DateColumn<M extends Model>({ model, column }: ColumnContent<M>) {  
  const value = String(model.get(column.accessor))
  const date = new Date(value).toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className={css.date}>{date}</div>
  );
}
