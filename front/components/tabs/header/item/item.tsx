import css from './item.module.css';
import { Tab } from "../../tabs"

interface Props {  
  tab: Tab
  onTabSelected: (tab: Tab) => void;
}

export default function Item({ tab, onTabSelected }: Props) { 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {   
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); 
      onTabSelected(tab);
    }
  };

  return (
    <div 
      className={`${css.item} ${tab.selected ? css.selected : ''}`}
      onClick={() => onTabSelected(tab)}
      onKeyDown={handleKeyDown}
      tabIndex={tab.selected ? -1 : 0}
    >
      {tab.title}
    </div>
  );
}