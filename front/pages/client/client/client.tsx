"use client";

import { useEffect, useState } from "react";
import css from './client.module.css';
import ClientModel from "@/models/client"
import Text from "@/components/form/text"
import Button from "@/components/inputs/button"
import FloppyDiskSvg from "@/components/svgs/floppyDisk"

interface Props {
  client: ClientModel
}

export default function Client({ client: initialClient }: Props) {
  /*const [client, setClient] = useState<ClientModel>(initialClient);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);*/

  useEffect(() => {
    const load = async () => {
     /* try {
        const data = await client.fetch();
        
        setClient(data);
      } catch {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }*/
    };

    load();
  }, [fetch]);

  console.log("render client client");
  return (   
    <div className={css.client}>  
      <Text key={"name"} title="Nom du client">Nom</Text>
      <Text key={"description"} title="Description du client">Description</Text>
      <Button key={"save"} title="title" svg={FloppyDiskSvg}>dfsdfsdf</Button>
    </div>
  );
}
