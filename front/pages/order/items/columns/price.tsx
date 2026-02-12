"use client";

import { OrderItemModel } from "@/models/orderItems";
import UseModel from "@/helpers/models/useModel";
import DecimalNumber from "@/components/inputs/decimalNumber";

import ColumnContent from "@/components/table/columns/column";

export default function PriceColumn({ model }: ColumnContent<OrderItemModel>) {  
  const [data, tmpData,, set] = UseModel(model);

  const change = (value: number) => {
    set("price", value);     
    model.setPrice(value);    
  };
 
  return (
    <DecimalNumber 
      value={tmpData["price"]} 
      precision={2}       
      style={{ width: "100px", padding: "2px 5px" }}
      onChange={change} 
    />
  );
}
