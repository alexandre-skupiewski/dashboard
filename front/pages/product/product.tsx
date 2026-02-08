"use client";

import { useEffect, useState } from "react";
import css from './product.module.css';
import CircleExclamationSvg from "@/components/svgs/circleExclamation"
import Loader from "@/components/loaders/loader2"
import Text from "@/components/form/text"
import Checkbox from "@/components/inputs/checkbox";
import Panel from "@/components/form/panel";
import Footer from "./footer/footer"
import ErrorModal from "@/components/modals/error";
import ConfirmModal from "@/components/modals/confirm";
import { ProductModel } from "@/models/products"
import UseProduct from "@/models/useProduct"
import { Pages, Page } from '@/helpers/pages'
import CubeSvg from "@/components/svgs/cube"

interface Props {
  product: ProductModel
}

export default function Product({ product }: Props) {
  const [
    [ id, laboruId, name, archived, archivedAt, createdAt, updatedAt, isDirty],
    [
      setName,     
      setArchived,
      setIsDirty,
      reset,
      save,
      refresh,
      commit
    ]
  ] = UseProduct(product);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null); 

  async function add() {
    const newProduct = new ProductModel();
    const page = new Page(() => <Product product={newProduct} />, "product.new", "Nouveau produit", CubeSvg, "products");
    Pages.open(page)
  }
 
  useEffect(() => {
    const load = async () => {
      try {
        await product.fetch();
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

  return (
    <div className={css.product}>
      <div className={css.body}>
        <Panel hover={false}>
          <div className={css.infosItem}>
            <div className={css.infosItemLabel}>ID</div>
            <div className={css.infosItemValue}>{id}</div>
          </div>
          <div className={css.infosItem}>
            <div className={css.infosItemLabel}>Laboru ID</div>
            <div className={css.infosItemValue}>{laboruId}</div>
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
        </Panel>
        <div className={css.form}>
          <Panel>
            <Text
              key={"name"}
              title="Nom du produit"
              label="Nom"
              value={name}
              onChange={(value) => {
                setName(value);
              }}
            />
            <Checkbox
              key={"archived"}
              title="Produit archivé"
              value={archived}
              onChange={(value) => {
                setArchived(value);
              }}
            >Archivé</Checkbox>
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
                Pages.updateTitle("product." + id, name);
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
