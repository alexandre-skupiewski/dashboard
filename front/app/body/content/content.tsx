import { useState, useEffect } from 'react';
import css from './content.module.css';
import Tabs from './tabs/tabs'
import { Pages, Page } from '@/helpers/pages'
import FireFlameCurvedSvg from '@/components/svgs/fireFlameCurved';

export default function Content() {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const offOpen = Pages.onOpen((page: Page) => {
      setPages(Pages.getPages());
    });

    const offClose = Pages.onClose(() => {
      setPages(Pages.getPages());
    });

    const offUpdate = Pages.onUpdate(() => {
      setPages(Pages.getPages());
    });

    return () => {
      offOpen();
      offClose();
      offUpdate();
    };
  }, []);

  return (
    <section className={css.content}>
      <Tabs pages={pages} />
      <div className={css.body}>
        <div className={css.container}>
          {
            pages.length > 0 ? (
              pages.map(page => {
                return (
                  <div className={`${css.page} ${page.selected ? css.selectedPage : ''}`} key={page.id}>
                    <page.component />
                  </div>
                );
              })
            ) : (
              <div className={css.empty}>
                <div className={css.emptyIcon}><FireFlameCurvedSvg /></div>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}