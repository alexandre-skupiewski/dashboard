"use client";

import css from './panel.module.css';

export interface Props {
  children?: React.ReactNode
  hover?: boolean
}

export default function Panel({children, hover = true} : Props) {
  return (
    <div className={`${css.panel} ${hover ? css.hover : null}`}>
      {children}
    </div>
  );
}
