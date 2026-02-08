"use client";

import css from './summary.module.css';
import Panel from "@/components/form/panel";
import { OrderModel } from "@/models/orders";
import UseOrder from "@/models/useOrder"
import { formatPrice } from "@/helpers/price";

interface Props {
  order: OrderModel
}

export default function Order({ order }: Props) {   
    const [[,, total, vat,,, vatTotal]] = UseOrder(order);

    return (
        <Panel hover={false}>          
            <div className={css.summary}>
                <div className={css.item}>
                    <div className={css.itemLabel}>Total</div>
                    <div className={css.itemValue}>{formatPrice(total)}</div>
                </div>
                <div className={css.item}>
                    <div className={css.itemLabel}>TVA</div>
                    <div className={css.itemValue}>{formatPrice(vat)}</div>
                </div>
                <div className={css.item}>
                    <div className={css.itemLabel}>Total TVA Inc.</div>
                    <div className={css.itemValue}>{formatPrice(vatTotal)}</div>
                </div>
            </div>       
        </Panel>
    );
}
