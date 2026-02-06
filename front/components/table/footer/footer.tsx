"use client";

import { useEffect, useState } from "react";
import css from './footer.module.css';
import Search from "@/components/inputs/search";
import { Model, Collection } from "@/helpers/models/models";
import { useCollection } from "@/helpers/models/models";
import Pages from "./pages/pages";

export interface Props<M extends Model> {
  collection?: Collection<M>;
}

export default function Footer<M extends Model>({ collection }: Props<M>) {
  const [models, page, pageSize, total, pageCount] = useCollection<Collection<M>, M>(collection || new Collection());

  function change(value: string) {
    collection?.fetch(null, null, value);
  }

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  
  return (    
    <div className={css.footer}> 
      <div className={css.search}>
        <Search title="Recherche" placeholder="Recherche" onChange={change}/>
      </div>
      <div className={css.pages}>
        <Pages current={page} pageCount={pageCount} onPageSelected={(value: number) => {collection?.fetch(value)}}/>
      </div>      
      <div className={css.infos}>
        {start}-{end} / {total} 
      </div> 
    </div>  
  );
}