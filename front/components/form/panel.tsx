"use client";

import css from './panel.module.css';

export interface Props {
  children?: React.ReactNode;
  hover?: boolean;
  style?: React.CSSProperties;
}

export default function Panel({children, hover = true, style} : Props) {
  return (
    <div className={`${css.panel} ${hover ? css.hover : ""}`} style={style}>
      {children}
    </div>
  );
}
