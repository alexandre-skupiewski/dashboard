import { Geist, Geist_Mono } from "next/font/google";
import Header from "./header/header";
import Footer from "./footer/footer";
import Menu from "./menu/menu";
import Content from "./content/content";
import View from "../components/view/view";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Body({ children, views }: { children: React.ReactNode, views: React.ReactNode }) {
  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header/>
      <main>
        <Menu/>        
        <Content>{children}</Content>
      </main>
      <Footer/>
      <View>{views}</View>    
    </body>
  );
}