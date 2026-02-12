"use client";

import { OrderModel } from "@/models/orders";
import UseModel from "@/helpers/models/useModel"
import ColumnContent from "@/components/table/columns/column";

export default function NameColumn({ model }: ColumnContent<OrderModel>) {  
  const [data] = UseModel(model);

  return (
    <>{data["name"]}</>
  );
}
