"use client";

import { OrderItemModel } from "@/models/orderItems";
import UseOrderItem from "@/models/useOrderItem";
import Text from "@/components/inputs/text";
import ColumnContent from "@/components/table/columns/column";

export default function NameColumn({ model }: ColumnContent<OrderItemModel>) {  
  const [[name], [setName]] = UseOrderItem(model);
 
  return (
    <Text
      value={name} 
      style={{ flexGrow: 1, padding: "2px 5px" }}
    />
  );
}
