"use client";

import { OrderModel } from "@/models/orders";
import { ClientModel } from "@/models/clients";
import { Model } from "@/helpers/models/models";
import LinkButton from "@/components/inputs/linkButton";
import { Pages, Page } from '@/helpers/pages'
import Client from "@/pages/client/client";
import UserSvg from "@/components/svgs/user"
import { useModel } from "@/helpers/models/models";
import ColumnContent from "@/components/table/columns/column";

interface Props {
  model: OrderModel
}

export default function ClientComp({ model }: ColumnContent<OrderModel>) {  
  const [clientModel] = useModel<ClientModel>(model.client);

  const name = clientModel?.name ?? clientModel?.description;

  function click() {    
    const page = new Page(() => <Client client={model.client!} />, "client." + model.client?.getId(), <div>Client | {model.client?.get("name")}</div>, UserSvg, "clients");
    Pages.open(page)
  }

  return (
    <LinkButton onClick={click}>{name} {clientModel.id}</LinkButton>
  );
}
