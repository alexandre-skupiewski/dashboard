import { useState, useEffect } from 'react';
import css from './content.module.css';
import Tabs from './tabs/tabs'
import { Pages, Page } from '@/pages/pages'
import CirclePlay from '@/components/svgs/circlePlay';

export default function Content() {  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pages, setPages] = useState<any[]>([]);
 
  useEffect(() => {   
     const offOpen = Pages.onOpen((page: Page) => {  
      setPages(Pages.getPages());
      setSelectedId(page.id);
    });
    
    const offClose = Pages.onClose(() => {  
      setPages(Pages.getPages());
      setSelectedId(Pages.getSelectedPage()?.id ?? "");
    });

    return () => {
      offOpen();
      offClose();
    };   
  }, []);

  return (    
    <section className={css.content}>
      <Tabs/>
      <div className={css.body}>
        <div className={css.container}>
          {
            pages.length > 0 ? (
              pages.map(page => {                
                return (
                  <div className={`${css.page} ${page.selected ? css.selectedPage : ''}`} key={page.id}>
                    <page.component/>
                  </div>               
                );    
              })
            ) : (
              <div className={css.empty}>
                <div className={css.emptyIcon}><CirclePlay/></div>              
              </div>
            )
          }        
        </div>      
      </div>     
    </section>
  );
}