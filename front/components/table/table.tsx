"use client";

import { useEffect, useState } from "react";
import css from './table.module.css';
import Header from "./header/header";
import Body from "./body/body";
import Footer from "./footer/footer";
import Loader from "@/components/loaders/loader1"

export interface ColumnProps<T> {
  title: string;
  accessor: keyof T;
  style: object
}

interface TableProps<T> {
  fetch: ( page: number, pageSize: number ) => Promise<T[]>;
  columns: ColumnProps<T>[];
  onRowSelected?: (model: T) => void;
}

export default function Table<T>({ fetch, columns, onRowSelected }: TableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetch(1, 100);
        setData(data);
      } catch {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fetch]);

  if (loading) {
    return (
      <div className={css.loading}>
        <Loader/>
      </div>
    );
  }

  if (error) {
    return <div className={css.error}>{error}</div>;
  }

  console.log("render table");

  return (
    <div className={css.table}>  
      <Header<T> columns={columns} />  
      <Body<T> columns={columns} data={data} onRowSelected={onRowSelected}/>
      <Footer<T> />
    </div>
  );
}

