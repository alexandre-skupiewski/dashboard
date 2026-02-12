"use client";

import { ClientModel } from "@/models/clients";
import UseModel from "@/helpers/models/useModel"
import ColumnContent from "@/components/table/columns/column";

export default function NameColumn({ model }: ColumnContent<ClientModel>) {
  const [data] = UseModel(model);

  return (
    <>{data["name"]}</>
  );
}
