import css from './header.module.css';
import { Tab } from "../tabs"
import Item from "./item/item"

interface Props { 
  items: Tab[],
  onTabSelected: (tab: Tab) => void;
}

export default function Header({ items, onTabSelected } : Props) {    
  const tabSelected = (tab: Tab) => {
    onTabSelected(tab);
  }

  return (    
    <nav className={css.header}>        
      {items.map(tab => {        
        return (
          <Item key={tab.id} tab={tab} onTabSelected={tabSelected}/>
        );
      })}
    
    </nav>
  );
}