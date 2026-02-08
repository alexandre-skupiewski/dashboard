"use client";

import { ProductModel } from "@/models/products";
import UseProduct from "@/models/useProduct"
import ColumnContent from "@/components/table/columns/column";

export default function NameColumn({ model }: ColumnContent<ProductModel>) {  
  const [[,, name ]] = UseProduct(model);

  return (
    <>{name}</>
  );
}
