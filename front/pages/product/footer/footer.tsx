"use client";

import css from './footer.module.css';
import Button from "@/components/inputs/button"
import FloppyDiskSvg from "@/components/svgs/floppyDisk"
import RotateSvg from "@/components/svgs/rotate"
import BanSvg from "@/components/svgs/ban"
import PlusSvg from "@/components/svgs/plus"
import Loader from '@/components/loaders/loader2';

interface Props {
  onSave?: () => void;
  onReset?: () => void;
  onRefresh?: () => void;
  onAdd?: () => void;
  loadingText?: string | null;
  canSave?: boolean;
}
export default function Footer({ onSave, onReset, onRefresh, onAdd, loadingText, canSave }: Props) {  
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
          title="Ajouter un nouveau client" 
          svg={PlusSvg} 
          onClick={onAdd}
        >
            Nouveau client
        </Button>       
        <Button 
          key={"refresh"} 
          title="Recharger le client" 
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
