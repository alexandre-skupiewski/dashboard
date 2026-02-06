"use client";

import { useEffect, useState } from "react";
import css from './order.module.css';
import CircleExclamationSvg from "@/components/svgs/circleExclamation"
import Loader from "@/components/loaders/loader2"
import { OrderModel } from "@/models/orders";
import { ClientModel } from "@/models/clients";
import ClientPage from "@/pages/client/client";
import { useModel } from "@/helpers/models/models";
import Checkbox from "@/components/inputs/checkbox";
import Text from "@/components/form/text"
import Panel from "@/components/form/panel";
import LinkButton from "@/components/inputs/linkButton";
import Footer from "./footer/footer"
import ErrorModal from "@/components/modals/error";
import ConfirmModal from "@/components/modals/confirm";
import UserSvg from "@/components/svgs/user"
import { Pages, Page } from '@/helpers/pages'
import OrderItems from "./items/items";

interface Props {
  order: OrderModel
}

export default function Order({ order }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  
  const [archived, setArchived] = useState<boolean>(order.archived);  
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [clientModel] = useModel<ClientModel>(order.client);
  const [name, setName] = useState<string>(order.name);

  const clientName = "";//clientModel?.name ?? clientModel?.description;
  
  function openClient() {    
    const page = new Page(() => <ClientPage client={order.client!} />, "client." + clientModel?.getId(), `Client | ${clientModel?.name}`, UserSvg, "clients");
    Pages.open(page)
  }

  function refrech() {
    setLoadingText("Rafraîchissement en cours...");
    order.fetch().then(() => {
      setLoadingText(null);
      setName(order.name);  
      setArchived(order.archived);
      setIsDirty(false);
    });
  }

  function reset() {
    setName(order.name);  
    setArchived(order.archived);
    setIsDirty(false);
  }

  async function save() {
    try {
      setLoadingText("Sauvegarde en cours...");

      const copy = new OrderModel().copy(order);
      copy.archived = archived;

      const id = copy.id;
      await copy.save();
      order.update(copy);

      if (id)
        Pages.updateTitle("order." + order.id, "Order | " + order.id);
      else {
        Pages.updateTitle("order.new", "Order | " + order.id);
        Pages.updateId("order.new", "order." + order.id);
      }

      setLoadingText(null);

      setError(null);
      setIsDirty(false);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Erreur lors de la sauvegarde");
      setLoadingText(null);
    }
  }

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

  useEffect(() => {
      const dirty =
        archived !== order.archived;
  
      setIsDirty(dirty);
    }, [archived, order]);

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
        <Panel hover={false}>
          <div className={css.infosItem}>
            <div className={css.infosItemLabel}>ID</div>
            <div className={css.infosItemValue}>{order.id}</div>
          </div>
          <div className={css.infosItem}>
            <div className={css.infosItemLabel}>Laboru ID</div>
            <div className={css.infosItemValue}>{order.laboruId}</div>
          </div>
          <div className={`${css.infosItem} ${css.flexColumn}`}>
            <div className={css.infosItemLabel}>Client</div>
            <div className={css.infosItemValue}>
              <LinkButton onClick={openClient}>{clientName}</LinkButton>
            </div>
          </div>
          <div className={`${css.infosItem} ${css.flexColumn}`}>
            <div className={css.infosItemLabel}>Date de création</div>
            <div className={css.infosItemValue}>{
              order.createdAt ? new Date(order.createdAt).toLocaleString('fr-FR', {
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
              order.updatedAt ? new Date(order.updatedAt).toLocaleString('fr-FR', {
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
            order.archivedAt ? (
              <div className={`${css.infosItem} ${css.flexColumn}`}>
                <div className={css.infosItemLabel}>Date d'archivage</div>
                <div className={css.infosItemValue}>{
                  new Date(order.archivedAt).toLocaleString('fr-FR', {
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
        </Panel>
        <div className={css.form}>
          <Panel>
            <Text
              key={"name"}
              title="Nom de la commande"
              label="Nom"
              value={name}
              onChange={(value) => {
                setName(value);
              }}
            />                        
            <Checkbox
              key={"archived"}
              title="Client archivé"
              value={archived}
              onChange={(value) => {
                setArchived(value);
              }}
            >Archivé</Checkbox>
          </Panel>         
        </div>
        <div className={css.orderItems}>
          <Panel style={{ padding: 0, flexGrow: 1 }}>  
            <OrderItems order={order}/>
          </Panel>
          <Panel style={{ flexBasis: "20%" }}>            
            <div className={css.orderItemsSummary}></div>
          </Panel>
        </div>
      </div>
      <Footer
        onSave={save}
        onReset={reset}
        onRefresh={refrech}
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
