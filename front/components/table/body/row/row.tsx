"use client";

import css from './row.module.css';
import Column from "./column/column";
import { Model } from "@/helpers/models/models";
import { ColumnProps } from "../../table";

interface RowProps<M extends Model> {
  columns: ColumnProps<M>[];
  model: M;
  onRowSelected?: (model: M) => void;
}

export default function Row<M extends Model>({ columns, model, onRowSelected }: RowProps<M>) {
  return (
    <div
      className={css.row}
      onDoubleClick={() => onRowSelected?.(model)}
    >      
      {columns.map((col) => {
        const CellComponent = col.component;

        return (
          <Column<M>
            key={String(col.accessor)}
            style={col.style}
            content={String(model.get(col.accessor))}
          >
            {CellComponent ? (
              <CellComponent model={model} />
            ) : (
              String(model.get(col.accessor))
            )}
          </Column>
        );
      })}
    </div>
  );
}

