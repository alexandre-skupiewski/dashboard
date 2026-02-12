"use client";

import { OrderItemModel } from "@/models/orderItems";
import ColumnContent from "@/components/table/columns/column";
import css from "./delete.module.css";
import TrashSvg from "@/components/svgs/trash";

export default function DeleteColumn({ model }: ColumnContent<OrderItemModel>) {  
  
  function onClick() {
    model.delete().then(() => {
      model.order?.items.remove(model);
      model.order?.calc();
      model.order?.update();
    });    
  }
   
  return (
    <div 
      className={css.delete} 
      title="Supprimer l'élement de la commande"
      onClick={onClick}
    >
      <TrashSvg/>
    </div>
  );
}
