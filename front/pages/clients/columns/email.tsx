"use client";

import { ClientModel } from "@/models/clients";
import UseClient from "@/models/useClient"
import ColumnContent from "@/components/table/columns/column";

export default function EmailColumn({ model }: ColumnContent<ClientModel>) {  
  const [[,,, email ]] = UseClient(model);

  return (
    <>{email}</>
  );
}
