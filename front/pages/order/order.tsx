"use client";

import { useEffect, useState } from "react";
import css from './order.module.css';
import { CircleExclamation as CircleExclamationSvg, User as UserSvg } from "@/components/svgs"
import Loader from "@/components/loaders/loader2"
import { Text, Panel, Datetime} from "@/components/form";
import ErrorModal from "@/components/modals/error";
import ConfirmModal from "@/components/modals/confirm";
import { OrderModel } from "@/models/orders";
import UseModel from "@/helpers/models/useModel"
import { Pages, Page } from '@/helpers/pages'
import Infos from "./infos/infos"
import Footer from "./footer/footer"
import OrderItems from "./items/items";

interface Props {
  order: OrderModel
}

export default function Order({ order }: Props) {
  const [data, tmpData, isDirty, set, reset, save, refresh] = UseModel(order);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);   
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null);  

  async function add() {
    const newOrder = new OrderModel();
    const page = new Page(<Order order={newOrder} />, "order.new", "Nouvelle commande", UserSvg);
    Pages.open(page)
  }   

  useEffect(() => {
    const load = async () => {
      try {
        await order.fetch();  
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

  /*useEffect(() => {    
    order.items.getModels().forEach((model) => {
      if(order.client?.vatType === "") {
        if(order.client?.vatRate === "0%")
          model.vat = 0;
        if(order.client?.vatRate === "6%")
          model.vat = 6;
        if(order.client?.vatRate === "21%")
          model.vat = 21;
        if(order.client?.vatRate === "C")
          model.vat = 0;
      } else {
        model.vat = 0;
      }
      model.calc();
      model.update();     

      order.total += model.price;
      order.vat += model.vatValue;
      order.vatTotal += model.vatPrice;
    });

     order.calc();
     order.update();    
  }, [vatRate, vatType]);*/

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

  return (
    <div className={css.order}>
      <div className={css.body}>
        <Infos order={order}/>
        <div className={css.center}>
          <div className={css.form}>
            <Panel>
              <Text
                key={"name"}
                title="Nom de la commande"
                label="Nom"
                value={tmpData["name"]}
                onChange={(value) => {
                  set("name", value);
                }}
              />  
              <Datetime
                key={"dueAt"}
                title="Date d'échéance"
                label="Date d'échéance"
                value={tmpData["dueAt"]}
                onChange={(value) => {
                  set("dueAt", value);
                }}
              />      
            </Panel>         
          </div>          
          <OrderItems order={order}/>          
        </div>
      </div>
      <Footer
        type={tmpData["type"]}
        onSave={() => {
          try {
            setLoadingText("Sauvegarde en cours...");
            save().then(() => {
              setLoadingText(null);
              setError(null);

              //if (id)
                Pages.updateTitle("order." + order.getId(), `${tmpData["name"]} > ${order.client?.get("name")}`);
              //else {
                //Pages.updateTitle("product.new", product.name);
                //Pages.updateId("product.new", "product." + product.id);
              //}
            }); 
          } catch (err: any) {          
            setError(err?.message ?? "Erreur lors de la sauvegarde");
            setLoadingText(null);
          }
        }}
        onReset={reset}
        onRefresh={() => {
          setLoadingText("Rafraîchissement en cours...");
          try {
            refresh().then(() => {
              setLoadingText(null);
            });
          } catch (err: any) {          
            setError(err?.message ?? "Erreur lors de la recharge");
            setLoadingText(null);
          }
        }}
        onAdd={add}
        loadingText={loadingText}
        canSave={isDirty}
      />
      <ErrorModal message={error ?? ""} onConfirm={() => setError(null)} />
      <ConfirmModal
        message={confirmation ?? ""}
        onConfirm={() => {
          setConfirmation(null);
          //archive();
        }}
        onCancel={() => setConfirmation(null)}
      />
    </div>
  );
}
