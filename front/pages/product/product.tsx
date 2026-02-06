"use client";

import { useEffect, useState } from "react";
import css from './product.module.css';
import CircleExclamationSvg from "@/components/svgs/circleExclamation"
import Loader from "@/components/loaders/loader2"
import Text from "@/components/form/text"
import Panel from "@/components/form/panel";
import Footer from "./footer/footer"
import ErrorModal from "@/components/modals/error";
import ConfirmModal from "@/components/modals/confirm";
import { ProductModel } from "@/models/products"
import { Pages, Page } from '@/helpers/pages'
import CubeSvg from "@/components/svgs/cube"

interface Props {
  product: ProductModel
}

export default function Product({ product }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>(product.name); 
  const [archived, setArchived] = useState<boolean>(product.archived); 
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  function refrech() {
    setLoadingText("Rafraîchissement en cours...");
    product.fetch().then(() => {
      setLoadingText(null);
      setName(product.name);     
      setArchived(product.archived);
      setIsDirty(false);
    });
  }

  function reset() {
    setName(product.name);  
    setArchived(product.archived);
    setIsDirty(false);
  }

  async function save() {
    try {
      setLoadingText("Sauvegarde en cours...");

      const copy = new ProductModel().copy(product);
      copy.name = name;    

      const id = copy.id;
      await copy.save();        
      product.update(copy);

      if (id)
        Pages.updateTitle("product." + product.id, "Product | " + product.name);
      else {
        Pages.updateTitle("product.new", "Product | " + product.name);
        Pages.updateId("product.new", "product." + product.id);
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

  useEffect(() => {
    const dirty =
      name !== product.name ||
      archived !== product.archived;

    setIsDirty(dirty);
  }, [name, archived, product]);

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
            <div className={css.infosItemValue}>{product.id}</div>
          </div>
          <div className={css.infosItem}>
            <div className={css.infosItemLabel}>Laboru ID</div>
            <div className={css.infosItemValue}>{product.laboruId}</div>
          </div>
          <div className={`${css.infosItem} ${css.flexColumn}`}>
            <div className={css.infosItemLabel}>Date de création</div>
            <div className={css.infosItemValue}>{
              product.createdAt ? new Date(product.createdAt).toLocaleString('fr-FR', {
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
              product.updatedAt ? new Date(product.updatedAt).toLocaleString('fr-FR', {
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
            product.archivedAt ? (
              <div className={`${css.infosItem} ${css.flexColumn}`}>
                <div className={css.infosItemLabel}>Date d'archivage</div>
                <div className={css.infosItemValue}>{
                  new Date(product.archivedAt).toLocaleString('fr-FR', {
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
