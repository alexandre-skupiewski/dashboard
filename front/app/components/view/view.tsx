"use client";

import css from './table.module.css';

interface TableProps {
  id?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Table({ id, children, onClose }: TableProps) {
  return (
    <div className={css.table}>  
      
    </div>
  );
}
