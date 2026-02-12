"use client";

import { OrderModel } from "@/models/orders";
import UseModel from "@/helpers/models/useModel"
import ColumnContent from "@/components/table/columns/column";
import { formatPrice } from "@/helpers/price";

export default function TotalColumn({ model }: ColumnContent<OrderModel>) {  
  const [data] = UseModel(model);

  return (
    <>{formatPrice(data["vatTotal"])}</>
  );
}
