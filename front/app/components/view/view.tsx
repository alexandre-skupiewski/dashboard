"use client";

import css from './view.module.css';

export default function View({children}: {children: React.ReactNode}) {
  return (
    <div className={css.view}>  
    sdfsdf
          <div>{children}</div>
    </div>
  );
}
