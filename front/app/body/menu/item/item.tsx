"use client";

import css from './item.module.css';
import { Pages, Page } from '@/pages/pages'

interface Props {
  item: any,
  selectedId: string
}

export default function Item({ item, selectedId }: Props) {

  const page = new Page(item.page, item.id, item.label, item.icon); 
  const className = `${css.item} ${selectedId ? css.selected : ''}`;

  return (
    
    <div className={className} onClick={() => Pages.open(page)}>  
      <div className={css.itemIcon}>{item.icon && <item.icon />}</div>
      <div className={css.itemLabel}>{item.label}</div>
    </div>
  );
}