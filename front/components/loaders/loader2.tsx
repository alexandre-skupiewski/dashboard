"use client";

import css from './loader2.module.css';

export interface Props{
  width?: number;
  height?: number;
}

export default function Loader({ width, height }: Props) {
  const style: any = {};
  if (width !== undefined) {
    style.width = width;
  }
  if (height !== undefined) {
    style.height = height;
  }

  return (
    <span className={css.loader} style={style}></span>
  );
}
