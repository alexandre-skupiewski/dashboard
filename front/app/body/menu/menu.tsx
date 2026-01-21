"use client";

import css from './menu.module.css';
import Link from 'next/link';
import {Items} from './items';

export default function Menu() {
  return (
    <nav className={css.menu}>
      {Items.map((item) => (
        <Link key={item.href} href={item.href} className={css.menuItem}>          
          <div className={css.itemIcon}>{item.icon && <item.icon />}</div>
          <div className={css.itemLabel}>{item.label}</div>
        </Link>
      ))}
    </nav>
  );
}