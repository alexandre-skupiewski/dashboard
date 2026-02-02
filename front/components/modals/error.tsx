"use client";

import { ModalProps } from "./modal";
import modalCss from './modal.module.css';
import errorCss from './error.module.css';
import CircleExclamationSvg from "@/components/svgs/circleExclamation"
import Button from "@/components/inputs/button"
import ThumbsUpSvg from "@/components/svgs/thumbsUp"

export interface Props extends ModalProps {
  message: string,
  onConfirm: () => void;
}

export default function Modal({ message, onConfirm }: Props) { 
    if (!message) {
      return <></>;
    }

    return (
        <div className={modalCss.background}>    
            <div className={`${modalCss.modal} ${errorCss.modal}`}>
                <div className={errorCss.top}>
                    <div className={errorCss.icon}><CircleExclamationSvg /></div>
                    <div>{message}</div>
                </div>
                <div className={errorCss.bottom}>
                    <Button 
                        key={"confirm"} 
                        title="J'ai compris" 
                        svg={ThumbsUpSvg} 
                        onClick={onConfirm}
                        disabled={false}
                    >
                        OK
                    </Button> 
                </div>                
            </div>
        </div>
    );
}
