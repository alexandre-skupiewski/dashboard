"use client";

import { useEffect, useState } from "react";
import css from './client.module.css';
import Text from "@/components/form/text"
import Select from "@/components/form/select"
import Checkbox from "@/components/inputs/checkbox";
import Panel from "@/components/form/panel";
import { SelectItem } from "@/components/inputs/select";
import Footer from "../footer/footer"
import ErrorModal from "@/components/modals/error";
import ConfirmModal from "@/components/modals/confirm";
import { ClientModel } from "@/models/clients"
import UserSvg from "@/components/svgs/user"
import { Pages, Page } from '@/helpers/pages'

interface Props {
  client: ClientModel
}

export default function Client({ client }: Props) {  
  const [name, setName] = useState<string>(client.name);
  const [description, setDescription] = useState<string>(client.description);
  const [email, setEmail] = useState<string>(client.email);
  const [vatNumber, setVatNumber] = useState<string>(client.vat);
  const [vatType, setVatType] = useState<string>(client.vatType);
  const [vatRate, setVatRate] = useState<string>(client.vatRate);
  const [phone1, setPhone1] = useState<string>(client.phone1);
  const [phone2, setPhone2] = useState<string>(client.phone2);
  const [phone3, setPhone3] = useState<string>(client.phone3);
  const [phone4, setPhone4] = useState<string>(client.phone4);
  const [archived, setArchived] = useState<boolean>(client.archived);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  function refrech() {
    setLoadingText("Rafraîchissement en cours...");
    client.fetch().then(() => {
      setLoadingText(null);
      setName(client.name);
      setDescription(client.description);
      setEmail(client.email);
      setVatNumber(client.vat);
      setVatType(client.vatType);
      setVatRate(client.vatRate);
      setPhone1(client.phone1);
      setPhone2(client.phone2);
      setPhone3(client.phone3);
      setPhone4(client.phone4);
      setArchived(client.archived);
      setIsDirty(false);
    });
  }

  function reset() {
    setName(client.name);
    setDescription(client.description);
    setEmail(client.email);
    setVatNumber(client.vat);
    setVatType(client.vatType);
    setVatRate(client.vatRate);
    setPhone1(client.phone1);
    setPhone2(client.phone2);
    setPhone3(client.phone3);
    setPhone4(client.phone4);
    setArchived(client.archived);
    setIsDirty(false);
  }

  async function save() {
    try {
      setLoadingText("Sauvegarde en cours...");

      const clientToSave = new ClientModel().copy(client);
      clientToSave.name = name;
      clientToSave.description = description;
      clientToSave.email = email;
      clientToSave.archived = archived;
      clientToSave.vat = vatNumber;
      clientToSave.vatType = vatType;
      clientToSave.vatRate = vatRate;
      clientToSave.phone1 = phone1;
      clientToSave.phone2 = phone2;
      clientToSave.phone3 = phone3;
      clientToSave.phone4 = phone4;

      const id = clientToSave.id;

      await clientToSave.save();
       
      client.copy(clientToSave);

      if (id)
        Pages.updateTitle("client." + client.id, "Client | " + client.name);
      else {
        Pages.updateTitle("client.new", "Client | " + client.name);
        Pages.updateId("client.new", "client." + client.id);
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
    const newClient = new ClientModel();
    const page = new Page(() => <Client client={newClient} />, "client.new", "Nouveau client", UserSvg);
    Pages.open(page)
  }

  useEffect(() => {
    const dirty =
      name !== client.name ||
      description !== client.description ||
      email !== client.email ||
      vatNumber !== client.vat ||
      vatType !== client.vatType ||
      vatRate !== client.vatRate ||
      phone1 !== client.phone1 ||
      phone2 !== client.phone2 ||
      phone3 !== client.phone3 ||
      phone4 !== client.phone4 ||
      archived !== client.archived;

    setIsDirty(dirty);
  }, [name, description, vatNumber, vatType, vatRate, archived, phone1, phone2, phone3, phone4, client]);

  return (
    <div className={css.client}>
      <div className={css.body}>
        <Panel hover={false}>
          <div className={css.infosItem}>
            <div className={css.infosItemLabel}>ID</div>
            <div className={css.infosItemValue}>{client.id}</div>
          </div>
          <div className={css.infosItem}>
            <div className={css.infosItemLabel}>Laboru ID</div>
            <div className={css.infosItemValue}>{client.laboruId}</div>
          </div>
          <div className={`${css.infosItem} ${css.flexColumn}`}>
            <div className={css.infosItemLabel}>Date de création</div>
            <div className={css.infosItemValue}>{
              client.createdAt ? new Date(client.createdAt).toLocaleString('fr-FR', {
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
              client.updatedAt ? new Date(client.updatedAt).toLocaleString('fr-FR', {
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
            client.archivedAt ? (
              <div className={`${css.infosItem} ${css.flexColumn}`}>
                <div className={css.infosItemLabel}>Date d'archivage</div>
                <div className={css.infosItemValue}>{
                  new Date(client.archivedAt).toLocaleString('fr-FR', {
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
              title="Nom du client"
              label="Nom"
              value={name}
              onChange={(value) => {
                setName(value);
              }}
            />

            <Text
              key={"description"}
              title="Description du client"
              label="Description"
              value={description}
              onChange={(value) => {
                setDescription(value);
              }}
            />

            <Text
              key={"email"}
              title="Email du client"
              label="Email"
              value={email}
              onChange={(value) => {
                setEmail(value);
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
          <Panel>
            <Text
              key={"phone1"}
              title="Téléphone 1"
              label="Téléphone 1"
              value={phone1}
              onChange={(value) => {
                setPhone1(value);
              }}
            />

            <Text
              key={"phone2"}
              title="Téléphone 2"
              label="Téléphone 2"
              value={phone2}
              onChange={(value) => {
                setPhone2(value);
              }}
            />

            <Text
              key={"phone3"}
              title="Téléphone 3"
              label="Téléphone 3"
              value={phone3}
              onChange={(value) => {
                setPhone3(value);
              }}
            />

            <Text
              key={"phone4"}
              title="Téléphone 4"
              label="Téléphone 4"
              value={phone4}
              onChange={(value) => {
                setPhone4(value);
              }}
            />
          </Panel>

          <Panel>
            <Text
              key={"vatNumber"}
              title="Numéro de TVA du client"
              label="Numéro de TVA"
              value={vatNumber}
              onChange={(value) => {
                setVatNumber(value);
              }}
            />

            <Select
              key={"vatType"}
              title="Type de TVA"
              value={vatType}
              label="Type de TVA"
              items={[
                new SelectItem("", "Assujetti"),
                new SelectItem("N", "(N) Non assujetti"),
                new SelectItem("X", "(X) Exonéré")
              ]}
              onChange={(value) => {
                setVatType(value);
              }}
            />

            <Select
              key={"vatRate"}
              title="Taux de TVA"
              value={vatRate}
              label="Taux de TVA"
              items={[
                new SelectItem("", "0%"),
                new SelectItem("6%", "6%"),
                new SelectItem("21%", "21%"),
                new SelectItem("C", "C")
              ]}
              onChange={(value) => {
                setVatRate(value);
              }}
            />
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
