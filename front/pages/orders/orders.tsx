"use client";

import Table from "@/components/table/table";
import { ColumnProps } from "@/components/table/table";
import UserSvg from "@/components/svgs/user"
import { Pages, Page } from '@/pages/pages'
import Order from "@/pages/order/order";
import { OrderModel, OrderCollection } from "@/models/orders";
import { useCollection } from "@/helpers/models/models";
import ClientColumn from "@/pages/orders/columns/client";

interface Props {
  type: "order" | "offer";
}

export default function Clients({ type } : Props) {
  const orderCollection = new OrderCollection(type);
  const [collection, setModels] = useCollection<OrderCollection, OrderModel>(orderCollection);

  const columns: ColumnProps<OrderModel>[] = [
    { title: "ID", accessor: "id", style: { flexBasis: "100px" } },
    { title: "Numéro", accessor: "number", style: { flexBasis: "100px" } },
    { title: "Client", accessor: "client", style: { flexBasis: "200px" }, component:  ClientColumn},
    { title: "Création", accessor: "createdAt", style: { flexBasis: "100px" } },
    { title: "Modification", accessor: "updatedAt", style: { flexBasis: "100px" } }
  ];

  const onRowSelected = (model: OrderModel) => {
    const page = new Page(<Order order={model} />, "client." + model.getId(), <div>Client | {model.get("name")}</div>, UserSvg);
    Pages.open(page)
  };

  return (
    <Table<OrderModel>
      columns={columns}
      onRowSelected={onRowSelected}
      collection={collection}
    />
  );
}
