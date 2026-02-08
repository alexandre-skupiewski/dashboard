"use client";

import { OrderItemModel } from "@/models/orderItems";
import UseOrderItem from "@/models/useOrderItem";
import ColumnContent from "@/components/table/columns/column";
import { formatPrice } from "@/helpers/price";

export default function TotalColumn({ model }: ColumnContent<OrderItemModel>) {  
  const [[,,, totalPrice]] = UseOrderItem(model); 
  return (
    <>{formatPrice(totalPrice)}</>
  );
}
