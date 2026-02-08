"use client";

import { useEffect, useState } from "react";
import css from "./infos.module.css";
import ClientPage from "@/pages/client/client";
import Panel from "@/components/form/panel";
import LinkButton from "@/components/inputs/linkButton";
import UserSvg from "@/components/svgs/user";
import { Pages, Page } from "@/helpers/pages";
import { OrderModel } from "@/models/orders";
import UseClient from "@/models/useClient";
import UseOrder from "@/models/useOrder";

interface Props {
  order: OrderModel
}

export default function Order({ order }: Props) {    
    const [
        [ clientId,, clientName, , , , clientVatType, clientVatRate, , , , , , , , ,  ]        
    ] = UseClient(order.client!);

    const [
        [ laboruId,,,, vatType, vatRate,, dueAt,, archivedAt, createdAt, updatedAt]       
    ] = UseOrder(order);    
    
    function openClient() {    
        const page = new Page(() => <ClientPage client={order.client!} />, "client." + clientId, `${clientName}`, UserSvg, "clients");
        Pages.open(page)
    }

    let vat = "";
    if(!vatType || vatType == "")
        vat = `${vatRate}%`;

    if(vatType === "N")
        vat = "(N) Non assujetti";

    if(vatType === "X")
        vat = "(X) Exonéré";

    return (
        <Panel hover={false}>          
            <div className={css.infos}>
                <div className={css.infosItem}>
                    <div className={css.infosItemLabel}>ID</div>
                    <div className={css.infosItemValue}>{order.id}</div>
                </div>
                <div className={css.infosItem}>
                    <div className={css.infosItemLabel}>Laboru ID</div>
                    <div className={css.infosItemValue}>{laboruId}</div>
                </div>
                <div className={`${css.infosItem} ${css.flexColumn}`}>
                    <div className={css.infosItemLabel}>Client</div>
                    <div className={css.infosItemValue}>
                        <LinkButton onClick={openClient}>{clientName}</LinkButton>
                    </div>
                </div>
                <div className={`${css.infosItem}`}>
                    <div className={css.infosItemLabel}>TVA</div>
                    <div className={css.infosItemValue}>{vat}</div>
                </div>
                <div className={`${css.infosItem} ${css.flexColumn}`}>
                    <div className={css.infosItemLabel}>Date de création</div>
                    <div className={css.infosItemValue}>{
                        createdAt ? new Date(createdAt).toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        })
                        : "Inconnue"
                    }
                    </div>
                </div>
                <div className={`${css.infosItem} ${css.flexColumn}`}>
                    <div className={css.infosItemLabel}>Date de modification</div>
                    <div className={css.infosItemValue}>{
                        updatedAt ? new Date(updatedAt).toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        })
                        : "Inconnue"
                    }
                    </div>
                </div>
                <div className={`${css.infosItem} ${css.flexColumn}`}>
                    <div className={css.infosItemLabel}>Date d'échéance'</div>
                    <div className={css.infosItemValue}>{
                        dueAt ? new Date(dueAt).toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        })
                        : "Inconnue"
                    }
                    </div>
                </div>
                {
                    archivedAt ? (
                        <div className={`${css.infosItem} ${css.flexColumn}`}>
                        <div className={css.infosItemLabel}>Date d'archivage</div>
                        <div className={css.infosItemValue}>{
                            new Date(archivedAt).toLocaleString('fr-FR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            })
                        }</div>
                        </div>
                    ) : null
                }   
            </div>       
        </Panel>
    );
}
