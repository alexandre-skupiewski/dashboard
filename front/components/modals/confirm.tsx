"use client";

import { ModalProps } from "./modal";
import modalCss from './modal.module.css';
import confirmCss from './confirm.module.css';
import CircleQuestionSvg from "@/components/svgs/circleQuestion"
import Button from "@/components/inputs/button"
import ThumbsUpSvg from "@/components/svgs/thumbsUp"
import BanSvg from "@/components/svgs/ban"

export interface Props extends ModalProps {
    message: string,
    onConfirm: () => void;
    onCancel: () => void;
}

export default function Modal({ message, onConfirm, onCancel }: Props) { 
    if (!message) {
      return <></>;
    }

    return (
        <div className={modalCss.background}>    
            <div className={`${modalCss.modal} ${confirmCss.modal}`}>
                <div className={confirmCss.top}>
                    <div className={confirmCss.icon}><CircleQuestionSvg /></div>
                    <div>{message}</div>
                </div>
                <div className={confirmCss.bottom}>
                    <Button 
                        key={"cancel"} 
                        title="Annuler l'action" 
                        svg={BanSvg} 
                        onClick={onCancel}
                        disabled={false}
                    >
                        Annuler
                    </Button> 
                    <Button 
                        key={"confirm"} 
                        title="Confirmer l'action" 
                        svg={ThumbsUpSvg} 
                        onClick={onConfirm}
                        color="danger"
                    >
                        OK
                    </Button> 
                </div>                
            </div>
        </div>
    );
}
