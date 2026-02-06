"use client";

import css from './row.module.css';
import ColumnComp from "./column/column";
import { Model } from "@/helpers/models/models";
import { Column } from "../../table";
import { useModel } from "@/helpers/models/models";

interface RowProps<M extends Model> {
  columns: Column<M>[];
  model: M;
  onRowSelected?: (model: M) => void;
}

export default function Row<M extends Model>({ columns, model, onRowSelected }: RowProps<M>) {
  const [mod] = useModel<M>(model);

  return (
    <div
      className={css.row}
      onDoubleClick={() => onRowSelected?.(mod!)}
    >      
      {columns.map((col) => {
        const CellComponent = col.component;

        return (
          <ColumnComp<M>
            key={String(col.accessor)}
            style={col.style}            
          >
            {CellComponent ? (
              <CellComponent model={mod!} column={col} />
            ) : (
              String(mod?.get(col.accessor))
            )}
          </ColumnComp>
        );
      })}
    </div>
  );
}

