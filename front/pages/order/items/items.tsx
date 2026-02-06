"use client";

import Table from "@/components/table/table";
import { Column } from "@/components/table/table";
import { OrderItemModel, OrderItemCollection } from "@/models/orderItems";
import DateColumn from "@/components/table/columns/date";
import { OrderModel } from "@/models/orders";

interface Props {
  order: OrderModel
}

export default function Items({ order } : Props) {  
  const columns: Column<OrderItemModel>[] = [     
    { title: "Nom", accessor: "name", style: { flexGrow: 1 } },   
    { title: "Création", accessor: "createdAt", style: { flexBasis: "100px" }, component: DateColumn },
    { title: "Modification", accessor: "updatedAt", style: { flexBasis: "100px" }, component: DateColumn }
  ];

  /*const onRowSelected = (model: OrderItemModel) => {
    const page = new Page(() => <Product product={model} />, "client." + model.getId(), `Product | ${model.name}`, CubeSvg, "products");
    Pages.open(page)
  };*/

  return (
    <Table<OrderItemModel>
      columns={columns}      
      collection={new OrderItemCollection(order.id!)}
    />
  );
}
