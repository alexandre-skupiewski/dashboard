"use client";

import { useState, useEffect } from 'react';
import css from './menu.module.css';
import Item from './item/item';
import HomeSvg from '@/components/svgs/home';
import ClientsSvg from '@/components/svgs/users';
import FileInvoiceSvg from '@/components/svgs/fileInvoice';
import FileInvoiceDollarSvg from '@/components/svgs/fileInvoiceDollar';
import CubesSvg from '@/components/svgs/cubes';
import Home from '@/pages/home/home'
import Clients from '@/pages/clients/clients'
import { Pages, Page } from '@/pages/pages'

export const Items = [
  {
    id: "home",
    label: "Accueil",
    path: "/",
    icon: HomeSvg,
    page: Home
  }, {
    id: "clients",
    label: "Clients",
    path: "/clients",
    icon: ClientsSvg,
    page: Clients
  }, {
    id: "products",
    label: "Produits",
    path: "/products",
    icon: CubesSvg,
    page: Clients
  }, {
    id: "offers",
    label: "Offres",
    path: "/offers",
    icon: FileInvoiceSvg,
    page: Clients
  }, {
    id: "orders",
    label: "Commandes",
    path: "/orders",
    icon: FileInvoiceDollarSvg,
    page: Clients
  } 
]

interface Props {  
}

export default function Menu({ }: Props) {
  const [selectedId, setSelectedId] = useState<string | "">("");

  /*useEffect(() => {   
    const offOpen = Pages.onOpen((page: Page) => {  
      setSelectedId(page.id);     
    });

    return () => {
      offOpen();    
    };    
  }, []);*/

  return (
    <nav className={css.menu}>
      {Items.map((item) => (
        <Item key={item.id} item={item} selectedId={selectedId}/>
      ))}
    </nav>
  );
}