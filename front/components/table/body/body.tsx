"use client";

import { useEffect, useState } from "react";
import css from './body.module.css';
import Row from "./row/row";
import { Model, Collection } from "@/helpers/models/models";
import Loader from "@/components/loaders/loader2"
import CircleExclamationSvg from "@/components/svgs/circleExclamation"
import { Column } from "../table";
import { useCollection } from "@/helpers/models/models";

interface Props<M extends Model> {
  columns: Column<M>[];
  collection?: Collection<M>;
  onRowSelected?: (model: M) => void;
}

export default function Body<M extends Model>({ columns, collection, onRowSelected }: Props<M>) {
  const [models] = useCollection<Collection<M>, M>(collection || new Collection());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        await collection?.fetch(1, 100);        
      } catch {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className={css.loading}>
        <Loader width={100} height={100} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.error}>
        <div className={css.errorIcon}><CircleExclamationSvg /></div>
        <div className={css.errorText}>{error}</div>
      </div>
    );
  }

  return (
    <div className={css.body}>
      {models.map((model, i) => (
        <Row<M> columns={columns} model={model} onRowSelected={onRowSelected} key={String(i)} />
      ))}
    </div>
  );
}

