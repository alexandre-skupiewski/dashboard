"use client";

import { useEffect, useState } from "react";
import css from './table.module.css';
import Header from "./header/header";
import Body from "./body/body";
import Footer from "./footer/footer";
import Loader from "@/components/loaders/loader2"
import CircleExclamationSvg from "@/components/svgs/circleExclamation"
import { Model, Collection } from "@/models/models";

export interface ColumnProps<M extends Model> {
  title: string;
  accessor: keyof M;
  style: object
}

interface TableProps<M extends Model> { 
  columns: ColumnProps<M>[];
  onRowSelected?: (model: M) => void;
  collection?: Collection<M>;
}

export default function Table<M extends Model>({ columns, onRowSelected, collection}: TableProps<M>) {
  //const [data, setData] = useState<T[]>([]);
  //const [collection, setCollection] = useState<Collection | undefined>(initialCollection);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        await collection?.fetch(1, 100);       
        //setCollection(collection);
        //setData(data);
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
        <div className={css.errorIcon}><CircleExclamationSvg/></div>  
        <div className={css.errorText}>{error}</div>        
      </div>      
    );
  }

  return (
    <div className={css.table}>  
      <Header<M> columns={columns} />  
      <Body<M> columns={columns} collection={collection} onRowSelected={onRowSelected}/>
      <Footer<M> />
    </div>
  );
}

