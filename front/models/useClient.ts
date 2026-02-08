import { useEffect, useState } from "react";
import { Models } from "@/helpers/models/models";
import { ClientModel } from "./clients"; 

export default function useClient(
  client: ClientModel,
): 
[
  [ number | null, string, string, string, string, string, string, string, string, string, string, string, boolean, string, string, string, boolean ],    
  [
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<boolean>>,
    React.Dispatch<React.SetStateAction<boolean>>,
    () => void,
    () => Promise<void>,
    () => Promise<void>,
    () => void
  ]
]
{
  const [laboruId] = useState<string>(client.laboruId);
  const [name, setName] = useState<string>(client.name);
  const [email, setEmail] = useState<string>(client.email);
  const [description, setDescription] = useState<string>(client.description);  
  const [vat, setVat] = useState<string>(client.vat);
  const [vatType, setVatType] = useState<string>(client.vatType);
  const [vatRate, setVatRate] = useState<string>(client.vatRate);
  const [phone1, setPhone1] = useState<string>(client.phone1);
  const [phone2, setPhone2] = useState<string>(client.phone2);
  const [phone3, setPhone3] = useState<string>(client.phone3);
  const [phone4, setPhone4] = useState<string>(client.phone4);
  const [archived, setArchived] = useState<boolean>(client.archived);
  const [archivedAt, setArchivedAt] = useState<string>(client.archivedAt);
  const [createdAt, setCreatedAt] = useState<string>(client.createdAt);
  const [updatedAt, setUpdatedAt] = useState<string>(client.updatedAt);
  const [isDirty, setIsDirty] = useState(false);

  function update() {    
    setName(client.name);
    setEmail(client.email);
    setDescription(client.description);
    setVat(client.vat);
    setVatType(client.vatType);
    setVatRate(client.vatRate);
    setPhone1(client.phone1);
    setPhone2(client.phone2);
    setPhone3(client.phone3);
    setPhone4(client.phone4);
    setArchived(client.archived);
    setArchivedAt(client.archivedAt);
    setCreatedAt(client.createdAt);
    setUpdatedAt(client.updatedAt);
  }

  async function refresh() {    
    await client.fetch()     
    reset();
  }

  async function save() {   
    commit(); 
    await client.save();     
    reset();   
  }

  function reset() {
    setName(client.name);
    setDescription(client.description);
    setEmail(client.email);
    setVat(client.vat);
    setVatType(client.vatType);
    setVatRate(client.vatRate);
    setPhone1(client.phone1);
    setPhone2(client.phone2);
    setPhone3(client.phone3);
    setPhone4(client.phone4);
    setArchived(client.archived);
    setArchivedAt(client.archivedAt);
    setCreatedAt(client.createdAt);
    setUpdatedAt(client.updatedAt);
    setIsDirty(false);
  }

  function commit() {    
    client.name = name;
    client.email = email;
    client.description = description;
    client.vat = vat;
    client.vatType = vatType;
    client.vatRate = vatRate;
    client.phone1 = phone1;
    client.phone2 = phone2;
    client.phone3 = phone3;
    client.phone4 = phone4;
    client.archived = archived;
    client.archivedAt = archivedAt;
    client.createdAt = createdAt;
    client.updatedAt = updatedAt;
  }

  useEffect(() => {   
    if (client && client.getId())
      Models.get(client.getKey());

    const unbindUpdate = client?.bindUpdate(update);

    return () => {   
      if(client) {
        Models.release(client.getKey());
        unbindUpdate?.();
      } 
    };
  }, []);

  useEffect(() => {
    const dirty =
      name !== client.name ||
      description !== client.description ||
      email !== client.email ||
      vat !== client.vat ||
      vatType !== client.vatType ||
      vatRate !== client.vatRate ||
      phone1 !== client.phone1 ||
      phone2 !== client.phone2 ||
      phone3 !== client.phone3 ||
      phone4 !== client.phone4 ||
      archived !== client.archived;

    setIsDirty(dirty);
  }, [name, email, description, vat, vatType, vatRate, archived, phone1, phone2, phone3, phone4]);

  return [
    [ client.id, laboruId, name, email, description, vat, vatType, vatRate, 
      phone1, phone2, phone3, phone4, archived, archivedAt, createdAt, updatedAt, isDirty],
    [
      setName,
      setEmail,
      setDescription,
      setVat,
      setVatType,
      setVatRate,
      setPhone1,
      setPhone2,
      setPhone3,
      setPhone4,
      setArchived,
      setIsDirty,
      reset,
      save,
      refresh,
      commit
    ]
  ];
}