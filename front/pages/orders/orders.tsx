"use client";

import Table from "@/components/table/table";
import { Column } from "@/components/table/table";
import MoneyCheckDollarSvg from "@/components/svgs/moneyCheckDollar"
import MoneyCheckSvg from "@/components/svgs/moneyCheck"
import { Pages, Page } from '@/helpers/pages'
import Order from "@/pages/order/order";
import { OrderModel, OrderCollection } from "@/models/orders";
import ClientColumn from "@/pages/orders/columns/client";
import NameColumn from "@/pages/orders/columns/name";
import TotalColumn from "@/pages/orders/columns/total";
import DateColumn from "@/components/table/columns/date";

interface Props {
  type: "order" | "offer";
}

export default function Clients({ type }: Props) { 
  const columns: Column<OrderModel>[] = [    
    { title: "Numéro", accessor: "number", style: { flexBasis: "100px" } },   
    { title: "Client", accessor: "client", style: { flexBasis: "300px" }, component: ClientColumn },
    { title: "Nom", accessor: "name", style: { flexGrow: "1" }, component: NameColumn },   
    { title: "Total TVA Inc.", accessor: "total", style: { flexBasis: "100px" }, component: TotalColumn }, 
    { title: "Echéance", accessor: "dueAt", style: { flexBasis: "100px", justifyContent: "end", textAlign: "end" }, component: DateColumn },
    { title: "Création", accessor: "createdAt", style: { flexBasis: "100px", justifyContent: "end", textAlign: "end" }, component: DateColumn },
    { title: "Modification", accessor: "updatedAt", style: { flexBasis: "100px", justifyContent: "end", textAlign: "end" }, component: DateColumn }
  ];

  const onRowSelected = (model: OrderModel) => {
    const menuId = model.get("type") === "order" 
              ? "orders" 
              : "offers"
    const icon = model.get("type") === "order" 
              ? MoneyCheckDollarSvg
              : MoneyCheckSvg
    const page = new Page(() => <Order order={model} />, "order." + model.getId(), `${model.get("name")} > ${model.client?.get("name")}`, icon, menuId);
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
