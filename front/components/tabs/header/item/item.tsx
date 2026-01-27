import css from './item.module.css';
import { Tab } from "../../tabs"

interface Props {  
  tab: Tab
  onTabSelected: (tab: Tab) => void;
}

export default function Item({ tab, onTabSelected }: Props) {  
  return (
    <div 
      className={`${css.item} ${tab.selected ? css.selected : ''}`}
      onClick={() => onTabSelected(tab)}
    >
      {tab.title}
    </div>
  );
}