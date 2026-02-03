"use client";

import { useEffect, useState } from "react";
import css from './order.module.css';
import Text from "@/components/form/text"
import Select from "@/components/form/select"
import Checkbox from "@/components/inputs/checkbox";
import Panel from "@/components/form/panel";
import {SelectItem} from "@/components/inputs/select";
import Footer from "../footer/footer"
import ErrorModal from "@/components/modals/error";
import ConfirmModal from "@/components/modals/confirm";
import { OrderModel } from "@/models/orders"
import UserSvg from "@/components/svgs/user"
import { Pages, Page } from '@/pages/pages'

interface Props {
  order: OrderModel
}

export default function Client({ order } : Props) {   
   
  const [archived, setArchived] = useState<boolean>(order.archived);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  
  function refrech() {    
    setLoadingText("Rafraîchissement en cours..." );
    order.fetch().then(() => {
      setLoadingText(null);    
      setArchived(order.archived);
      setIsDirty(false);
    });
  }

  function reset() {     
    setArchived(order.archived);
    setIsDirty(false);
  }

  async function save() {
    try {
      setLoadingText("Sauvegarde en cours...");   
      
      const orderToSave = new OrderModel().copy(order);     
      orderToSave.archived = archived;      

      const id = orderToSave.id;

      await orderToSave.save(); 

      order.copy(orderToSave);

      if(id) 
        Pages.updateTitle("client." + order.id, "Client | " + order.id);
      else {
        Pages.updateTitle("client.new", "Client | " + order.id);
        Pages.updateId("client.new", "client." + order.id);
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
    const newClient = new OrderModel();
    const page = new Page(<Client client={newClient} />, "client.new", "Nouveau client", UserSvg);    
    Pages.open(page)
  }

  useEffect(() => {
    const dirty =       
      archived !== order.archived;
    
    setIsDirty(dirty);
  }, [archived, order]);

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
            <Checkbox
              key={"archived"} 
              title="Client archivé" 
              value={archived}
              onChange={(value) => {
                setArchived(value);
              }}
            >Archivé</Checkbox>  
          </Panel> 
          <Panel>
           
          </Panel>
          
          <Panel>
         
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
      <ErrorModal message={error ?? ""} onConfirm={() => setError(null)}/>
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
