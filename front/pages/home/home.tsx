"use client";

import css from './home.module.css';
import HomeSvg from '@/components/svgs/home';

interface Props {
}

export default function Views({ }: Props) {

  return (
    <>  
      <div className={css.home}>
        <div className={css.icon}>
          <HomeSvg/>
        </div>
      </div>
    </>
  );
}
