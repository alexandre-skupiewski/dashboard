"use client";

import Table from "@/components/table/table";
import { Column } from "@/components/table/table";
import FileInvoiceDollarSvg from "@/components/svgs/fileInvoiceDollar"
import { Pages, Page } from '@/helpers/pages'
import Order from "@/pages/order/order";
import { OrderModel, OrderCollection } from "@/models/orders";
import ClientColumn from "@/pages/orders/columns/client";
import DateColumn from "@/components/table/columns/date";

interface Props {
  type: "order" | "offer";
}

export default function Clients({ type }: Props) { 
  const columns: Column<OrderModel>[] = [    
    { title: "Numéro", accessor: "number", style: { flexBasis: "100px" } },   
    { title: "Client", accessor: "client", style: { flexBasis: "300px" }, component: ClientColumn },
    { title: "Nom", accessor: "name", style: { flexGrow: "1" } },   
    { title: "Création", accessor: "createdAt", style: { flexBasis: "100px" }, component: DateColumn },
    { title: "Modification", accessor: "updatedAt", style: { flexBasis: "100px" }, component: DateColumn }
  ];

  const onRowSelected = (model: OrderModel) => {
    const menuId = type == "order" ? "orders" : "offers";
    const page = new Page(() => <Order order={model} />, "order." + model.getId(), `Commande | ${model.client.name} | ${model.name}`, FileInvoiceDollarSvg, menuId);
    Pages.open(page)
  };

  return (
    <Table<OrderModel>
      columns={columns}
      onRowSelected={onRowSelected}
      collection={new OrderCollection(type)}
    />
  );
}
