"use client";

import Table from "@/components/table/table";
import { Column } from "@/components/table/table";
import MoneyCheckDollarSvg from "@/components/svgs/moneyCheckDollar"
import MoneyCheckSvg from "@/components/svgs/moneyCheck"
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
    { title: "Echéance", accessor: "dueAt", style: { flexBasis: "100px" }, component: DateColumn },
    { title: "Création", accessor: "createdAt", style: { flexBasis: "100px" }, component: DateColumn },
    { title: "Modification", accessor: "updatedAt", style: { flexBasis: "100px" }, component: DateColumn }
  ];

  const onRowSelected = (model: OrderModel) => {
    const menuId = model.type === "order" 
              ? "orders" 
              : "offers"
    const icon = model.type === "order" 
              ? MoneyCheckDollarSvg
              : MoneyCheckSvg
    const page = new Page(() => <Order order={model} />, "order." + model.getId(), `${model.name} > ${model.client?.name}`, icon, menuId);
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
