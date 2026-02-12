"use client";

import css from "./infos.module.css";
import ClientPage from "@/pages/client/client";
import Panel from "@/components/form/panel";
import LinkButton from "@/components/inputs/linkButton";
import UserSvg from "@/components/svgs/user";
import { Pages, Page } from "@/helpers/pages";
import { OrderModel } from "@/models/orders";
import UseModel from "@/helpers/models/useModel";
import { formatPrice } from "@/helpers/price";

interface Props {
  order: OrderModel
}

export default function Order({ order }: Props) {  
    const [clientData] = UseModel(order.client!);
    const [orderData, orderTmpData] = UseModel(order);   
    
    function openClient() {    
        const page = new Page(() => <ClientPage client={order.client!} />, "client." + order.client!.getId(), `${clientData["name"]}`, UserSvg, "clients");
        Pages.open(page)
    }

    let vatT = "";
  
    if(orderData["vatType"] === "")
        vatT = "Assujetti";

    if(orderData["vatType"] === "N")
        vatT = "(N) Non assujetti";

    if(orderData["vatType"] === "X")
        vatT = "(X) Exonéré";

    return (
        <Panel hover={false}>          
            <div className={css.infos}>                
                <div className={css.client}>                                        
                    <div className={css.infosItemValue}>
                        <LinkButton onClick={openClient}>{clientData["name"]}</LinkButton>
                    </div>                   
                    <div className={`${css.infosItem}`}>
                        <div className={css.infosItemLabel}>Taux de TVA</div>
                        <div className={css.rightValue}>{`${orderData["vatRate"]}%`}</div>
                    </div>
                    <div className={`${css.infosItem}`}>
                        <div className={css.infosItemLabel}>Régime TVA</div>
                        <div className={css.rightValue}>{vatT}</div>
                    </div>
                </div>
                <div className={css.summary}>
                    <div className={css.infosItem}>
                        <div className={css.infosItemLabel}>Total</div>
                        <div className={css.rightValue}>{formatPrice(orderTmpData["total"])}</div>
                    </div>
                    <div className={css.infosItem}>
                        <div className={css.infosItemLabel}>Montant TVA</div>
                        <div className={css.rightValue}>{formatPrice(orderTmpData["vat"])}</div>
                    </div>
                    <div className={css.infosItem}>
                        <div className={css.infosItemLabel}>Total TVA Inc.</div>
                        <div className={css.rightValue}>{formatPrice(orderTmpData["vatTotal"])}</div>
                    </div>
                </div>
                <div className={css.infosItem}>
                    <div className={css.infosItemLabel}>ID</div>
                    <div className={css.rightValue}>{order.getId()}</div>
                </div>
                <div className={css.infosItem}>
                    <div className={css.infosItemLabel}>Laboru ID</div>
                    <div className={css.rightValue}>{orderData["laboruId"]}</div>
                </div>
                <div className={`${css.infosItem} ${css.flexColumn}`}>
                    <div className={css.infosItemLabel}>Date de création</div>
                    <div className={css.infosItemValue}>{
                        orderData["createdAt"] ? new Date(orderData["createdAt"]).toLocaleString('fr-FR', {
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
                        orderData["updatedAt"] ? new Date(orderData["updatedAt"]).toLocaleString('fr-FR', {
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
                        orderTmpData["dueAt"] ? new Date(orderTmpData["dueAt"]).toLocaleString('fr-FR', {
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
                    orderTmpData["archivedAt"] ? (
                        <div className={`${css.infosItem} ${css.flexColumn}`}>
                        <div className={css.infosItemLabel}>Date d'archivage</div>
                        <div className={css.infosItemValue}>{
                            new Date(orderTmpData["archivedAt"]).toLocaleString('fr-FR', {
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
