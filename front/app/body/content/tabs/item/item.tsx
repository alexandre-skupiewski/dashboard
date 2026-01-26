import css from './item.module.css';
import { Pages, Page } from '@/pages/pages'
import XmarkIcon from '@/components/svgs/xmark';

interface Props {  
  page: Page
}

export default function Item({ page}: Props) {
  const className = `${css.item} ${page.selected ? css.selected : ''}`;
 
  return (
    <div className={className} onClick={() => Pages.open(page)}>
      <div className={css.itemIcon}>{page.icon && <page.icon />}</div>
      <div className={css.itemLabel}>{page.title}</div>
      <div className={css.itemClose} onClick={(e) => {
          e.stopPropagation();
          Pages.close(page);
        }}
      >
        <div className={css.itemCloseIcon}><XmarkIcon/></div>          
      </div>
    </div>
  );
}