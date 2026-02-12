"use client";

import { useState } from "react";
import css from './client.module.css';
import Text from "@/components/form/text"
import Select from "@/components/form/select"
import Panel from "@/components/form/panel";
import { SelectItem } from "@/components/inputs/select";
import Footer from "../footer/footer"
import ErrorModal from "@/components/modals/error";
import ConfirmModal from "@/components/modals/confirm";
import { ClientModel } from "@/models/clients"
import UseModel from "@/helpers/models/useModel"
import UserSvg from "@/components/svgs/user"
import { Pages, Page } from '@/helpers/pages'

interface Props {
  client: ClientModel
}

export default function Client({ client }: Props) {
  const [data, isDirty, set, reset, save, refresh] = UseModel(client.clone());

  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null);

  async function add() {
    const newClient = new ClientModel();
    const page = new Page(() => <Client client={newClient} />, "client.new", "Nouveau client", UserSvg, "clients");
    Pages.open(page)
  }

  return (
    <div className={css.client}>
      <div className={css.body}>
        <Panel hover={false}>
          <div className={css.infosItem}>
            <div className={css.infosItemLabel}>ID</div>
            <div className={css.infosItemValue}>{client.getId()}</div>
          </div>
          <div className={css.infosItem}>
            <div className={css.infosItemLabel}>Laboru ID</div>
            <div className={css.infosItemValue}>{data["laboruId"]}</div>
          </div>
          <div className={`${css.infosItem} ${css.flexColumn}`}>
            <div className={css.infosItemLabel}>Date de création</div>
            <div className={css.infosItemValue}>{
              data["createdAt"] ? new Date(data["createdAt"]).toLocaleString('fr-FR', {
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
              data["updatedAt"] ? new Date(data["updatedAt"]).toLocaleString('fr-FR', {
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
            data["archivedAt"] ? (
              <div className={`${css.infosItem} ${css.flexColumn}`}>
                <div className={css.infosItemLabel}>Date d'archivage</div>
                <div className={css.infosItemValue}>{
                  new Date(data["archivedAt"]).toLocaleString('fr-FR', {
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
              value={data["name"]}
              onChange={(value) => {
                set("name", value);
              }}
            />

            <Text
              key={"description"}
              title="Description du client"
              label="Description"
              value={data["description"]}
              onChange={(value) => {
                set("description", value);
              }}
            />

            <Text
              key={"email"}
              title="Email du client"
              label="Email"
              value={data["email"]}
              onChange={(value) => {
                set("email", value);
              }}
            />
          </Panel>
          <Panel>
            <Text
              key={"phone1"}
              title="Téléphone 1"
              label="Téléphone 1"
              value={data["phone1"]}
              onChange={(value) => {
                set("phone1", value);
              }}
            />

            <Text
              key={"phone2"}
              title="Téléphone 2"
              label="Téléphone 2"
              value={data["phone2"]}
              onChange={(value) => {
                set("phone2", value);
              }}
            />

            <Text
              key={"phone3"}
              title="Téléphone 3"
              label="Téléphone 3"
              value={data["phone3"]}
              onChange={(value) => {
                set("phone3", value);
              }}
            />

            <Text
              key={"phone4"}
              title="Téléphone 4"
              label="Téléphone 4"
              value={data["phone4"]}
              onChange={(value) => {
                set("phone4", value);
              }}
            />
          </Panel>

          <Panel>
            <Text
              key={"vatNumber"}
              title="Numéro de TVA du client"
              label="Numéro de TVA"
              value={data["atNumber"]}
              onChange={(value) => {
                set("vat", value);
              }}
            />

            <Select
              key={"vatType"}
              title="Type de TVA"
              value={data["vatType"]}
              label="Type de TVA"
              items={[
                new SelectItem("", "Assujetti"),
                new SelectItem("N", "(N) Non assujetti"),
                new SelectItem("X", "(X) Exonéré")
              ]}
              onChange={(value) => {
                set("vatType", value);
              }}
            />

            <Select
              key={"vatRate"}
              title="Taux de TVA"
              value={data["vatRate"]}
              label="Taux de TVA"
              items={[
                new SelectItem("0%", "0%"),
                new SelectItem("6%", "6%"),
                new SelectItem("21%", "21%"),
                new SelectItem("C", "C")
              ]}
              onChange={(value) => {
                set("vatRate", value);
              }}
            />
          </Panel>
        </div>
      </div>
      <Footer
        onSave={() => {
          try {
            setLoadingText("Sauvegarde en cours...");
            save().then(() => {
              setLoadingText(null);
              setError(null);

              //if (id)
              Pages.updateTitle("product." + client.getId(), data["name"]);
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
