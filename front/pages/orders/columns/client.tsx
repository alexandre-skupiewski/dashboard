"use client";

import { OrderModel } from "@/models/orders";
import LinkButton from "@/components/inputs/linkButton";
import { Pages, Page } from '@/pages/pages'
import Client from "@/pages/client/client";
import UserSvg from "@/components/svgs/user"

interface Props {
  model: OrderModel
}

export default function Clients({ model } : Props) { 
  const name = model.client?.name ?? model.client?.description  

  function click() {
    if(model.client?.id) {     
      const page = new Page(<Client client={model.client} />, "client." + model.client.getId(), <div>Client | {model.client.get("name")}</div>, UserSvg, "clients");
      Pages.open(page)
    }    
  }

  return (
     <LinkButton onClick={click}>{name}</LinkButton>
  );
}
