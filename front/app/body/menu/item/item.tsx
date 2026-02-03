"use client";

import css from './item.module.css';


interface Props {
  item: any,
  selected: boolean,
  onItemSelected: () => void;
}

export default function Item({ item, selected, onItemSelected }: Props) {  
  const className = `${css.item} ${selected? css.selected : ''}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {   
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); 
      onItemSelected();
    }
  };

  return (
    
    <div 
      className={className} 
      onClick={onItemSelected}
      onKeyDown={handleKeyDown}
      tabIndex={selected ? -1 : 0}
    >  
      <div className={css.itemIcon}>{item.icon && <item.icon />}</div>
      <div className={css.itemLabel}>{item.label}</div>
    </div>
  );
}