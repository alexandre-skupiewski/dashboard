import css from './item.module.css';
import { Pages, Page } from '@/helpers/pages'
import XmarkIcon from '@/components/svgs/xmark';

interface Props {
  page: Page
}

export default function Item({ page }: Props) {
  const className = `${css.item} ${page.selected ? css.selected : ''}`;

  function open(page: Page) {
    Pages.open(page);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open(page);
    }
  };

  return (
    <div
      className={className}
      onClick={() => open(page)}
      onKeyDown={handleKeyDown}
      tabIndex={page.selected ? -1 : 0}
      title={page.title}>
      <div className={css.itemIcon}>{page.icon && <page.icon />}</div>
      <div className={css.itemLabel}>{page.title}</div>
      <div className={css.itemClose} onClick={(e) => {
        e.stopPropagation();
        Pages.close(page);
      }}
      >
        <div className={css.itemCloseIcon}><XmarkIcon /></div>
      </div>
    </div>
  );
}