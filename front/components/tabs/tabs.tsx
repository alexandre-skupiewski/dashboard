import { useState, useEffect } from 'react';
import css from './tabs.module.css';
import Item from './item/item'

export class TabItem {
  public id: string;
  public title: string;
  public component: React.FC;
  public icon?: any;
  public selected: boolean

  constructor(component: React.FC, id: string, title: string, icon?: any, selected = false) {
    this.id = id;
    this.title = title;
    this.component = component;
    this.icon = icon;
    this.selected = selected;
  }
}

interface Props {    
}

export default function Tabs() { 
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>([]); 

  return (
    <div className={css.tabsContainer}>
      <nav className={css.tabs}>  
      </nav>
    </div>
  );
}