"use client";

import { useEffect, useState, useCallback} from "react";
import Client from "../../../models/client";
import { ColumnProps }from "@/app/components/table/table";
import Table from "@/app/components/table/table";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {}, []);

  const columns: ColumnProps<Client>[] = [  
    { title: "ID", accessor: "id", style: {flexBasis: "100px"} },
    { title: "Nom", accessor: "name", style: {flexBasis: "400px"} },
    { title: "Email", accessor: "email", style: {flexGrow: 1} },
  ];

  return (    
    <Table<Client> fetch={Client.fetch} columns={columns} />   
  );
}