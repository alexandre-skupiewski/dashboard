"use client";

import css from './footer.module.css';
import Button from "@/components/inputs/button"
import FloppyDiskSvg from "@/components/svgs/floppyDisk"
import RotateSvg from "@/components/svgs/rotate"
import BanSvg from "@/components/svgs/ban"
import PlusSvg from "@/components/svgs/plus"
import Loader from '@/components/loaders/loader2';

interface Props {
  type: "order" | "offer";
  onSave?: () => void;
  onReset?: () => void;
  onRefresh?: () => void;
  onAdd?: () => void;
  loadingText?: string | null;
  canSave?: boolean;
}
export default function Footer({type, onSave, onReset, onRefresh, onAdd, loadingText, canSave }: Props) {  
  return (
    <div className={css.footer}>
      {
        loadingText && (
          <div className={css.left}>
            <div className={css.loadingIcon}><Loader width={22} height={22} /></div>            
            <div className={css.loadingText}>{loadingText}</div>
          </div>
        )
      }   
      <div className={css.right}> 
        <Button 
          key={"new"} 
          title={
            type === "order" 
              ? "Ajouter une nouvelle commande" 
              : "Ajouter une nouvelle offre"
            } 
          svg={PlusSvg} 
          onClick={onAdd}
        >
          {
            type === "order" 
              ? "Nouvelle commande" 
              : "Nouvelle offre"
          }
        </Button>       
        <Button 
          key={"refresh"} 
          title={
            type === "order" 
              ? "Recharger la commande" 
              : "Recharger l'offre"
            }
          svg={RotateSvg} 
          onClick={onRefresh}
        >
            Recharger
        </Button>
        <Button 
          key={"reset"} 
          title="Annuler les modifications" 
          svg={BanSvg} 
          onClick={onReset}
          disabled={!canSave}
        >
            Annuler
        </Button>
        <Button 
          key={"save"} 
          title="Enregistrer les modificatons" 
          svg={FloppyDiskSvg} 
          onClick={onSave}
          disabled={!canSave}
          color='danger'
        >
            Enregistrer
        </Button> 
      </div>
    </div>
        
  );
}
