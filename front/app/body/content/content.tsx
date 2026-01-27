import { useState, useEffect } from 'react';
import css from './content.module.css';
import Tabs from './tabs/tabs'
import { Pages, Page } from '@/pages/pages'
import CirclePlay from '@/components/svgs/circlePlay';

export default function Content() {  
  const [selectedId, setSelectedId] = useState<string | null>(null);
 
  useEffect(() => {   
     const offOpen = Pages.onOpen((page: Page) => {  
      setSelectedId(page.id);
    });
    
    const offClose = Pages.onClose(() => {  
      setSelectedId(Pages.getSelectedPage()?.id ?? "");
    });

    return () => {
      offOpen();
      offClose();
    };   
  }, []);

  console.log("render content");

  return (    
    <section className={css.content}>
      <Tabs/>
      <div className={css.body}>
        <div className={css.container}>
          {
            Pages.getPages().length > 0 ? (
              Pages.getPages().map(page => {                
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