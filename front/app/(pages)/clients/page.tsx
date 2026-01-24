"use client";

import { useEffect, useState, useCallback} from "react";
import Client from "../../../models/client";
import { ColumnProps }from "@/components/table/table";
import Table from "@/components/table/table";

export default function Clients() { 
  useEffect(() => {}, []);

  const columns: ColumnProps<Client>[] = [  
    { title: "ID", accessor: "id", style: {flexBasis: "100px"} },
    { title: "Nom", accessor: "name", style: {flexBasis: "400px"} },
    { title: "Email", accessor: "email", style: {flexGrow: 1} },
  ];

  const onRowSelected = (client: Client) => {
    console.log("Client sélectionné :", client);
  };

  return (    
    <Table<Client> fetch={Client.fetch} columns={columns} onRowSelected={onRowSelected} />   
  );
}