"use client";

import { OrderItemModel } from "@/models/orderItems";
import UseModel from "@/helpers/models/useModel";
import ColumnContent from "@/components/table/columns/column";
import { formatPrice } from "@/helpers/price";

export default function TotalColumn({ model }: ColumnContent<OrderItemModel>) {  
  const [data, tmpData] = UseModel(model);

  return (
    <>{formatPrice(tmpData["totalPrice"])}</>
  );
}
