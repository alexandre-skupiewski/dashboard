"use client";

import css from './menu.module.css';
import Item from './item/item';
import HomeSvg from '@/components/svgs/home';
import ClientsIcon from '@/components/svgs/users';
import Home from '@/pages/home/home'
import Clients from '@/pages/clients/clients'

export const Items = [
  {
    id: "home",
    label: "Accueil",
    path: "/",
    icon: HomeSvg,
    page: Home
  }, 
  {
    id: "clients",
    label: "Clients",
    path: "/clients",
    icon: ClientsIcon,
    page: Clients
  } 
]

interface Props {  
}

export default function Menu({ }: Props) {
  return (
    <nav className={css.menu}>
      {Items.map((item) => (
        <Item key={item.id} item={item}/>
      ))}
    </nav>
  );
}