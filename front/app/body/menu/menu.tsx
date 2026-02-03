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
import Orders from '@/pages/orders/orders'
import { Pages, Page } from '@/pages/pages'

export class Menu {
  private static selectEvents: Array<(id: string) => void> = [];

  static select(id: string) {
    this.selectEvents.forEach(cb => cb(id));
  }

  static onSelect(cb: (id: string) => void) {
    this.selectEvents.push(cb);
    return () => {
      this.selectEvents = this.selectEvents.filter(e => e !== cb);
    };
  }
}

export const Items = [
  {
    id: "home",
    label: "Accueil",
    path: "/",
    icon: HomeSvg,
    page: <Home/>
  }, {
    id: "clients",
    label: "Clients",
    path: "/clients",
    icon: ClientsSvg,
    page: <Clients/>
  }, {
    id: "products",
    label: "Produits",
    path: "/products",
    icon: CubesSvg,
    page: <Clients/>
  }, {
    id: "offers",
    label: "Offres",
    path: "/offers",
    icon: FileInvoiceSvg,
    page: <Orders type={"offer"}/>
  }, {
    id: "orders",
    label: "Commandes",
    path: "/orders",
    icon: FileInvoiceDollarSvg,
    page: <Orders type={"order"}/>
  } 
]

interface Props {  
}

export default function MenuView({ }: Props) {
  const [selectedId, setSelectedId] = useState<string | "">("");

  useEffect(() => {
    const offSelect = Menu.onSelect((id) => {
      setSelectedId(id);
    });

    return () => offSelect();
  }, []);

  return (
    <nav className={css.menu}>
      {Items.map((item) => (
        <Item 
          key={item.id} 
          item={item} 
          selected={selectedId == item.id}
          onItemSelected={() => {
            Menu.select(item.id)

            const page = new Page(item.page, item.id, item.label, item.icon, item.id); 
            Pages.open(page)
          }
        }/>
      ))}
    </nav>
  );
}