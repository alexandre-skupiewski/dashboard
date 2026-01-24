"use client";

import { useEffect, useState } from "react";
import Header from "./header/header";
import Body from "./body/body";
import Footer from "./footer/footer";

export interface ColumnProps<T> {
  title: string;
  accessor: keyof T;
  style: object
}

interface TableProps<T> {
  fetch: ( page: number, pageSize: number ) => Promise<T[]>;
  columns: ColumnProps<T>[];
}

export default function Table<T>({ fetch, columns }: TableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetch(1, 100);
        setData(result);
      } catch {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fetch]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={style}>  
      <Header<T> columns={columns} />  
      <Body<T> columns={columns} data={data} />
      <Footer<T> />
    </div>
  );
}

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,  
};

