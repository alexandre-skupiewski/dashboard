"use client";

import { useEffect, useState } from "react";
import css from './client.module.css';
import { Tabs, Tab } from "@/components/tabs/tabs"
import Orders from "./orders/orders"
import ClientInfos from "./client/client"
import CircleExclamationSvg from "@/components/svgs/circleExclamation"
import Loader from "@/components/loaders/loader2"
import { ClientModel } from "@/models/clients";
import { useModel } from "@/helpers/models/models";

interface Props {
  client: ClientModel
}

export default function Client({ client }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useModel<ClientModel>(client);

  useEffect(() => {
    const load = async () => {
      try {
        await model.fetch();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className={css.loading}>
        <Loader width={100} height={100} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.error}>
        <div className={css.errorIcon}><CircleExclamationSvg /></div>
        <div className={css.errorText}>{error}</div>
      </div>
    );
  }

  const selectedTab = new Tab(() => <ClientInfos client={client} />, "client", "Client", true);

  const items: Tab[] = [
    selectedTab,
    new Tab(Orders, "offers", "Offres"),
    new Tab(Orders, "orders", "Commandes")
  ];

  return (
    <div className={css.client}>
      <Tabs items={items} selectedTab={selectedTab} />
    </div>
  );
}
