"use client";

import css from './item.module.css';
import { Pages, Page } from '@/pages/pages'

interface Props {
  item: any,
}

export default function Item({ item }: Props) {

  const page = new Page(item.page, item.id, item.label, item.icon);  
  return (
    
    <div className={css.item} onClick={() => Pages.open(page)}>  
      <div className={css.itemIcon}>{item.icon && <item.icon />}</div>
      <div className={css.itemLabel}>{item.label}</div>
    </div>
  );
}