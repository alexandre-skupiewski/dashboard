"use client";

import { ClientModel } from "@/models/clients";
import UseClient from "@/models/useClient"
import ColumnContent from "@/components/table/columns/column";

export default function NameColumn({ model }: ColumnContent<ClientModel>) {  
  const [[,, name ]] = UseClient(model);

  return (
    <>{name}</>
  );
}
