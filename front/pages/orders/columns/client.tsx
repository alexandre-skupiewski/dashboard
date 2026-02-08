"use client";

import { OrderModel } from "@/models/orders";
import UseClient from "@/models/useClient"
import LinkButton from "@/components/inputs/linkButton";
import { Pages, Page } from '@/helpers/pages'
import Client from "@/pages/client/client";
import UserSvg from "@/components/svgs/user"

import ColumnContent from "@/components/table/columns/column";

export default function ClientColumn({ model }: ColumnContent<OrderModel>) { 
  const [[,, name ]] = UseClient(model.client!);

  function click() {    
    const page = new Page(() => <Client client={model.client!} />, "client." + model.client?.getId(), `${name}`, UserSvg, "clients");
    Pages.open(page)
  }

  return (
    <LinkButton onClick={click}>{name}</LinkButton>
  );
}
