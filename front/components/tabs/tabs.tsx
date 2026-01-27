import { useState, useEffect } from 'react';
import css from './tabs.module.css';
import Header from "./header/header"
import Body from "./body/body"

export class Tab {
  public id: string;
  public title: string;
  public component: React.FC;
  public selected: boolean;
  public initialized: boolean

  constructor(component: React.FC, id: string, title: string, selected: boolean = false) {
    this.id = id;
    this.title = title;
    this.component = component;   
    this.selected = selected;
    this.initialized = selected;
  }
}

interface Props { 
  items: Tab[],
  selectedTab: Tab
}

export function Tabs({ items: initialItems, selectedTab: initialSelectedTab } : Props) {   
  const [items, setItems] = useState<Tab[]>(initialItems); 
  
  const tabSelected = (tab: Tab) => {    
    setItems(items =>
      items.map(t => ({
        ...t,
        selected: t.id === tab.id,
        initialized: t.initialized || t.id === tab.id
      }))
    );
  }

  return (
    <div className={css.tabs}>  
      <Header items={items} onTabSelected={tabSelected}/>
      <Body items={items}/>
    </div>
  );
}