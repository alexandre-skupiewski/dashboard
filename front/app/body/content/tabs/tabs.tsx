import { useState, useEffect } from 'react';
import css from './tabs.module.css';
import { Page } from '@/helpers/pages'
import Item from './item/item'

interface Props {
  pages: Page[]
}

export default function Tabs({ pages }: Props) {
  return (
    pages.length > 0 ? (
      <div className={css.tabsContainer}>
        <nav className={css.tabs}>
          {pages.map(page => {
            return (
              <Item key={page.id} page={page} />
            );
          })}

        </nav>
      </div>
    ) : (<></>)
  );
}