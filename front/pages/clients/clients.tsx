"use client";

import Table from "@/components/table/table";
import { ColumnProps }from "@/components/table/table";
import UserSvg from "@/components/svgs/user"
import { Pages, Page } from '@/pages/pages'
import Client from "@/pages/client/client";
import { ClientModel, ClientCollection } from "@/models/clients";
import { useCollection } from "@/models/models";

export default function Clients() {
  const [collection, setModels] = useCollection<ClientCollection, ClientModel>(new ClientCollection());
  
  const columns: ColumnProps<ClientModel>[] = [  
    { title: "ID", accessor: "id", style: {flexBasis: "100px"} },
    { title: "Nom", accessor: "name", style: {flexBasis: "400px"} },
    { title: "Email", accessor: "email", style: {flexGrow: 1} },
  ];

  const onRowSelected = (model: ClientModel) => { 
    const page = new Page(<Client client={model}/>, "client." + model.getId(), <div>Client | {model.get("name")}</div>, UserSvg);    
    Pages.open(page)
  };

  return (
    <Table<ClientModel>       
      columns={columns} 
      onRowSelected={onRowSelected} 
      collection={collection}
    />  
  );
}
