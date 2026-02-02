import { useState, useEffect } from 'react';
import css from './tabs.module.css';
import { Pages, Page } from '@/pages/pages'
import Item from './item/item'

interface Props {    
}

export default function Tabs() { 
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {   
    const offOpen = Pages.onOpen((page: Page) => { 
      setPages(Pages.getPages());
      setSelectedId(page.id);
    });
    
    const offClose = Pages.onClose(() => {   
      setPages(Pages.getPages())
      setSelectedId(Pages.getSelectedPage()?.id ?? "");
    });

    return () => {
      offOpen();
      offClose();
    };    
  }, []);

  return (  
    pages.length > 0 ? (
      <div className={css.tabsContainer}>
        <nav className={css.tabs}>        
          {pages.map(page => {        
            return (
              <Item key={page.id} page={page}/>
            );
          })}
        
        </nav>        
      </div>
    ):(<></>)
  );
}