"use client";

import { useEffect } from "react";
import { OrderItemModel } from "@/models/orderItems";
import UseOrderItem from "@/models/useOrderItem";
import DecimalNumber from "@/components/inputs/decimalNumber";

import ColumnContent from "@/components/table/columns/column";

export default function AmountColumn({ model }: ColumnContent<OrderItemModel>) {  
  const [[, amount], [, setAmount]] = UseOrderItem(model);

  const change = (value: number) => {
    setAmount(value);     
    model.setAmount(value);        
  };

  return (
    <DecimalNumber 
      value={amount}
      min={0}
      style={{ width: "60px", padding: "2px 5px" }}
      onChange={change} 
    />
  );
}
