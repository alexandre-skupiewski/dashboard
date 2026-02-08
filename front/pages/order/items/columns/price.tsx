"use client";

import { OrderItemModel } from "@/models/orderItems";
import UseOrderItem from "@/models/useOrderItem";
import DecimalNumber from "@/components/inputs/decimalNumber";

import ColumnContent from "@/components/table/columns/column";

export default function PriceColumn({ model }: ColumnContent<OrderItemModel>) {  
  const [[,, price], [, setPrice]] = UseOrderItem(model);

  const change = (value: number) => {
    setPrice(value);     
    model.setPrice(value);    
  };
 
  return (
    <DecimalNumber 
      value={price} 
      precision={2}       
      style={{ width: "100px", padding: "2px 5px" }}
      onChange={change} 
    />
  );
}
