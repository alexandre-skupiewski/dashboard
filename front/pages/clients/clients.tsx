"use client";

import Table from "@/components/table/table";
import { ColumnProps }from "@/components/table/table";
import UserSvg from "@/components/svgs/user"
import ClientModel from "@/models/client";
import { Pages, Page } from '@/pages/pages'
import Client from "@/pages/client/client";

interface Props {
}

export default function Clients({ }: Props) {
  const columns: ColumnProps<ClientModel>[] = [  
    { title: "ID", accessor: "id", style: {flexBasis: "100px"} },
    { title: "Nom", accessor: "name", style: {flexBasis: "400px"} },
    { title: "Email", accessor: "email", style: {flexGrow: 1} },
  ];

  const onRowSelected = (client: ClientModel) => { 
    const page = new Page(() => <Client client={client} />, "client." + client.id, "Client | " + client.name, UserSvg);    
    Pages.open(page)
  };

  console.log("render client list");

  return (
    <Table<ClientModel> fetch={ClientModel.fetch} columns={columns} onRowSelected={onRowSelected} />  
  );
}
