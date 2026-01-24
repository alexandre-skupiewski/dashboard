"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Header from "./header/header";
import Footer from "./footer/footer";
import Menu from "./menu/menu";
import Content from "./content/content";
import View from "../components/view/view";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import css from './menu.module.css';

interface ViewMeta {
  id: string;         // identifiant unique
  type: "user" | "dashboard"; // type de composant
  props?: any;        // props à passer au composant
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Body({ children}: { children: React.ReactNode }) {
  const [views, setViews] = useState<ViewMeta[]>([]);
  const pathname = usePathname();

  const addView = (type: ViewMeta["type"], props?: any) => {
    const id = `${type}-${Date.now()}`; // id unique
    setViews(prev => [...prev, { id, type, props }]);
  };

  const removeView = (id: string) => {
    setViews(prev => prev.filter(v => v.id !== id));
  };
  
  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header/>
      <main>
        <Menu/>        
        <Content>{children}</Content>
      </main>
      <Footer/>   
    </body>
  );
}