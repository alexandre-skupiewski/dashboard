import { useState, useEffect } from 'react';
import css from './tabs.module.css';
import { Pages, Page } from '@/pages/pages'
import Item from './item/item'

interface Props {    
}

export default function Tabs() { 
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>([]); // tableau des ids ouverts

  useEffect(() => {   
    const offOpen = Pages.onOpen((page: Page) => {  
      setSelectedId(page.id);
      setItems(Pages.getPages().map(p => p.id));
    });
    
    const offClose = Pages.onClose(() => {  
      setSelectedId(Pages.getSelectedPage()?.id ?? "");
      setItems(Pages.getPages().map(p => p.id))
    });

    return () => {
      offOpen();
      offClose();
    };    
  }, []);

  return (  
    Pages.getPages().length > 0 ? (
      <div className={css.tabsContainer}>
        <nav className={css.tabs}>        
          {Pages.getPages().map(page => {        
            return (
              <Item key={page.id} page={page}/>
            );
          })}
        
        </nav>        
      </div>
    ):(<></>)
  );
}