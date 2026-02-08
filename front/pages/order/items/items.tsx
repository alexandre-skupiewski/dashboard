"use client";

import { useEffect } from "react";
import Table from "@/components/table/table";
import { Column } from "@/components/table/table";
import { OrderItemModel, OrderItemCollection } from "@/models/orderItems";
import NameColumn from "./columns/name";
import AmountColumn from "./columns/amount";
import PriceColumn from "./columns/price";
import TotalColumn from "./columns/total";
import VatColumn from "./columns/vat";
import VatPriceColumn from "./columns/vatPrice";
import { OrderModel } from "@/models/orders";
import Panel from "@/components/form/panel";

interface Props {
  order: OrderModel
}

export default function Items({ order } : Props) {   
  const columns: Column<OrderItemModel>[] = [     
    { title: "Nom", accessor: "name", style: { flexGrow: 1 }, component: NameColumn },   
    { title: "Prix (€)", accessor: "price", style: { flexBasis: "100px" }, component: PriceColumn },    
    { title: "Quantité", accessor: "amount", style: { flexBasis: "60px" }, component: AmountColumn},
    { title: "Total", accessor: "total", style: { flexBasis: "100px", justifyContent: 'end' }, component: TotalColumn },    
    { title: "TVA", accessor: "vat", style: { flexBasis: "100px", justifyContent: 'end' }, component: VatColumn},
    { title: "Prix TVA Inc.", accessor: "vatPrice", style: { flexBasis: "100px", justifyContent: 'end' }, component: VatPriceColumn }, 
    //{ title: "", accessor: "delete", style: { flexBasis: "100px" }, component: VatPriceColumn },  
  ];  

  function onAdd() {
    const newOrderItem = new OrderItemModel();
    order.items.add(newOrderItem);
  }

  return (
    <Panel style={{ padding: 0, flexGrow: 1 }}>  
      <Table<OrderItemModel>
        columns={columns}      
        collection={order.items}
        onAdd={onAdd}
      />
    </Panel>
  );
}
