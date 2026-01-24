"use client";

import { useState, useEffect } from 'react';
import ViewsHelper from "@/helpers/views";
import View from "./view/view" 

export class Event {
  private static callback: (model?: any) => void;

  static on(callback: () => void) {
    this.callback = callback;
  }
  
  static open(title: string, model?: any) {
    this.callback(model);
  }
}

interface ViewsProps {
}

export default function Views({ }: ViewsProps) {

  useEffect(() => {
    const handleClientSelected = (model?: any) => {
      //const customEvent = e as CustomEvent;
      console.log("Client sélectionné :", model);
      //setViews(prev => [...prev, { type: "client", props: e.detail }]);
    };

    Event.on(handleClientSelected);
/*
    ViewsHelper.instance.on("open", handleClientSelected);

    return () => {
      ViewsHelper.instance.off("open", handleClientSelected);
    };*/
  }, []);

  /*const addView = (type: ViewMeta["type"], props?: any) => {
    const id = `${type}-${Date.now()}`; // id unique
    setViews(prev => [...prev, { id, type, props }]);
  };

  const removeView = (id: string) => {
    setViews(prev => prev.filter(v => v.id !== id));
  };*/

  return (
    <>  
      
    </>
  );
}
