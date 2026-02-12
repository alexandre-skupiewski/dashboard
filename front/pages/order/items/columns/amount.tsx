"use client";

import { OrderItemModel } from "@/models/orderItems";
import UseModel from "@/helpers/models/useModel";
import DecimalNumber from "@/components/inputs/decimalNumber";

import ColumnContent from "@/components/table/columns/column";

export default function AmountColumn({ model }: ColumnContent<OrderItemModel>) {  
  const [data, tmpData,, set] = UseModel(model);

  const change = (value: number) => {
    set("amount", value);     
    model.setAmount(value);        
  };

  return (
    <DecimalNumber 
      value={tmpData["amount"]}
      min={0}
      style={{ width: "60px", padding: "2px 5px" }}
      onChange={change} 
    />
  );
}
