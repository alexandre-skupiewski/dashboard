"use client";

import { useEffect, useState } from "react";
import css from './order.module.css';
import OrderInfos from "./order/order"
import CircleExclamationSvg from "@/components/svgs/circleExclamation"
import Loader from "@/components/loaders/loader2"
import { OrderModel } from "@/models/orders";
import { useModel } from "@/helpers/models/models";

interface Props {
  order: OrderModel
}

export default function Client({ order }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useModel<OrderModel>(order);

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

  const selectedTab = new Tab(() => <OrderInfos order={order} />, "client", "Client", true);

  return (
    <div className={css.order}>
     
    </div>
  );
}
