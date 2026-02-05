"use client";

import Table from "@/components/table/table";
import { Column } from "@/components/table/table";
import UserSvg from "@/components/svgs/user"
import { Pages, Page } from '@/helpers/pages'
import Order from "@/pages/order/order";
import { OrderModel, OrderCollection } from "@/models/orders";
import { ClientModel } from "@/models/clients";
import css from './orders.module.css';
import DateColumn from "@/components/table/columns/date";

interface Props {
  type: "order" | "offer";
  client: ClientModel;
}

export default function Orders({ type, client  }: Props) { 
  const columns: Column<OrderModel>[] = [   
    { title: "Numéro", accessor: "number", style: { flexBasis: "100px" } },     
    { title: "Nom", accessor: "name", style: { flexGrow: "1" } },  
    { title: "Création", accessor: "createdAt", style: { flexBasis: "100px" }, component: DateColumn },
    { title: "Modification", accessor: "updatedAt", style: { flexBasis: "100px" }, component: DateColumn }
  ];

  const onRowSelected = (model: OrderModel) => {
    const page = new Page(() => <Order order={model} />, "client." + model.getId(), <div>Client | {model.get("name")}</div>, UserSvg);
    Pages.open(page)
  };

  return (
    <Table<OrderModel>
      columns={columns}
      onRowSelected={onRowSelected}
      collection={new OrderCollection(type, client.id)}
    />
  );
}
