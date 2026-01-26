"use client";

import ClientModel from "@/models/client";
import Tabs from "@/components/tabs/tabs"

interface Props {
  client: ClientModel
}

export default function Client({ client }: Props) {

  return (
    <>  
      Client {client.id}

      <Tabs/>
    </>
  );
}
