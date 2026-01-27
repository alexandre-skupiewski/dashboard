"use client";

import css from './client.module.css';
import ClientModel from "@/models/client";
import { Tabs, Tab } from "@/components/tabs/tabs"
import Orders from "./orders/orders"
import ClientInfos from "./client/client"

interface Props {
  client: ClientModel
}

export default function Client({ client }: Props) {

  const selectedTab = new Tab(() => <ClientInfos client={client} />, "client", "Client", true);

  const items: Tab[] = [
    selectedTab,
    new Tab(Orders, "offers", "Offres"),
    new Tab(Orders, "orders", "Commandes")
  ];

  return (
    <div className={css.client}>
      <Tabs items={items} selectedTab={selectedTab}/>
    </div>    
  );
}
