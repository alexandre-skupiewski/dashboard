"use client";

import Table from "@/components/table/table";
import { Column } from "@/components/table/table";
import CubeSvg from "@/components/svgs/cube"
import { Pages, Page } from '@/helpers/pages'
import Product from "@/pages/product/product";
import { ProductModel, ProductCollection } from "@/models/products";
import DateColumn from "@/components/table/columns/date";
import NameColumn from "./columns/name";

export default function Products() {  
  const columns: Column<ProductModel>[] = [     
    { title: "Nom", accessor: "name", style: { flexGrow: 1 }, component: NameColumn },
    { title: "Création", accessor: "createdAt", style: { flexBasis: "100px" }, component: DateColumn },
    { title: "Modification", accessor: "updatedAt", style: { flexBasis: "100px" }, component: DateColumn }
  ];

  const onRowSelected = (model: ProductModel) => {
    const page = new Page(() => <Product product={model} />, "client." + model.getId(), `${model.name}`, CubeSvg, "products");
    Pages.open(page)
  };

  return (
    <Table<ProductModel>
      columns={columns}
      onRowSelected={onRowSelected}
      collection={new ProductCollection()}
    />
  );
}
