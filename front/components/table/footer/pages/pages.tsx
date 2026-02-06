"use client";

import css from './pages.module.css';
import { Model, Collection } from "@/helpers/models/models";
import BackwardFast from '@/components/svgs/backwardFast';
import BackwardStep from '@/components/svgs/backwardStep';
import ForwardFast from '@/components/svgs/forwardFast';
import ForwardStep from '@/components/svgs/forwardStep';

export interface Props<M extends Model> {
  current: number,
  pageCount: number
  onPageSelected: (value: number) => void;
}

class Page {
  public number: number;
  
  constructor(number: number) {
    this.number = number;
  }
}

export default function Pages<M extends Model>({ current, pageCount, onPageSelected }: Props<M>) { 
  function buildPages(
    current: number,
    total: number,
    delta = 2
  ): Page[] {
    const pages: Page[] = [];

    const start = Math.max(1, current - delta);
    const end = Math.min(total, current + delta);

    for (let i = start; i <= end; i++) {
      pages.push(new Page(i));
    }

    return pages;
  }

  const pages = buildPages(current, pageCount);
  
  return (    
    <div className={css.pages} tabIndex={0}>
      <div className={css.item} onClick={() => onPageSelected(1)}>
        <div className={css.icon}><BackwardFast/></div>        
      </div> 
      <div className={css.item} onClick={() => onPageSelected(Math.max(1, current - 1))}>
        <div className={css.icon}><BackwardStep/></div>        
      </div> 
      {pages.map((p) => (
        <div
          key={p.number}
          className={`${css.item} ${
            p.number === current ? css.active : ""
          }`}
          onClick={() => onPageSelected(p.number)}
        >
          {p.number}
        </div>
      ))}     
      <div className={css.item} onClick={() => onPageSelected(Math.min(pageCount, current + 1))}>
        <div className={css.icon}><ForwardStep/></div>        
      </div> 
      <div className={css.item} onClick={() => onPageSelected(pageCount)}>
        <div className={css.icon}><ForwardFast/></div>        
      </div> 
    </div> 
  );
}