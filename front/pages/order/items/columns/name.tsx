"use client";

import { OrderItemModel } from "@/models/orderItems";
import UseModel from "@/helpers/models/useModel";
import Text from "@/components/inputs/text";
import ColumnContent from "@/components/table/columns/column";

export default function NameColumn({ model }: ColumnContent<OrderItemModel>) {  
  const [data, tmpData] = UseModel(model);
 
  return (
    <Text
      value={tmpData["name"]} 
      style={{ flexGrow: 1, padding: "2px 5px" }}
    />
  );
}
