"use client";

import Table from "@/components/table/table";
import { Column } from "@/components/table/table";
import UserSvg from "@/components/svgs/user"
import { Pages, Page } from '@/helpers/pages'
import Client from "@/pages/client/client";
import { ClientModel, ClientCollection } from "@/models/clients";
import DateColumn from "@/components/table/columns/date";
import NameColumn from "./columns/name";
import EmailColumn from "./columns/email";

export default function Clients() {  
  const columns: Column<ClientModel>[] = [     
    { title: "Nom", accessor: "name", style: { flexGrow: 1 }, component: NameColumn },
    { title: "Email", accessor: "email", style: { flexBasis: "300px" }, component: EmailColumn },
    { title: "Création", accessor: "createdAt", style: { flexBasis: "100px", justifyContent: "end", textAlign: "end" }, component: DateColumn },
    { title: "Modification", accessor: "updatedAt", style: { flexBasis: "100px", justifyContent: "end", textAlign: "end" }, component: DateColumn }
  ];

  const onRowSelected = (model: ClientModel) => {
    const page = new Page(() => <Client client={model} />, "client." + model.getId(), `${model.get("name")}`, UserSvg, "clients");
    Pages.open(page)
  };

  return (
    <Table<ClientModel>
      columns={columns}
      onRowSelected={onRowSelected}
      collection={new ClientCollection()}
    />
  );
}
