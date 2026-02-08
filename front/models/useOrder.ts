import { useEffect, useState } from "react";
import { Models } from "@/helpers/models/models";
import { OrderModel } from "./orders"; 

export default function useOrder(
  order: OrderModel,
): 
[
  [ string, string, number, number, string, number, number, string, boolean, string, string, string, boolean ],    
  [   
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<boolean>>,
    () => void,
    () => Promise<void>,
    () => Promise<void>,
    () => void
  ]
]
{
  const [name, setName] = useState<string>(order.name); 
  const [total, setTotal] = useState<number>(order.total);  
  const [vat, setVat] = useState<number>(order.vat); 
  const [vatType, setVatType] = useState<string>(order.vatType); 
  const [vatRate, setVatRate] = useState<number>(order.vatRate);  
  const [vatTotal, setVatTotal] = useState<number>(order.vatTotal);    
  const [archived, setArchived] = useState<boolean>(order.archived);
  const [dueAt, setDueAt] = useState<string>(order.dueAt);
  const [isDirty, setIsDirty] = useState(false);

  function update() {    
    setName(order.name);
    setTotal(order.total);
    setVat(order.vat);
    setVatType(order.vatType);
    setVatRate(order.vatRate);
    setVatTotal(order.vatTotal);
    setDueAt(order.dueAt);   
    setArchived(order.archived);
  }

  async function refresh() {    
    await order.fetch()     
    reset();
    order.update();
  }

  async function save() {   
    commit(); 
    await order.save();     
    reset();   
  }

  function reset() {
    setName(order.name);
    setTotal(order.total);
    setVat(order.vat);
    setVatType(order.vatType);
    setVatRate(order.vatRate);
    setVatTotal(order.vatTotal);
    setDueAt(order.dueAt);    
    setArchived(order.archived);
    setIsDirty(false);
  }

  function commit() {    
    order.name = name; 
    order.total = total; 
    order.vat = vat; 
    order.vatType = vatType;
    order.vatRate = vatRate;
    order.vatTotal = vatTotal;  
    order.dueAt = dueAt;  
    order.archived = archived;
  }

  useEffect(() => {   
    if (order && order.getId())
      Models.get(order.getKey());

    const unbindUpdate = order?.bindUpdate(update);

    return () => {   
      if(order) {
        Models.release(order.getKey());
        unbindUpdate?.();
      } 
    };
  }, []);

  useEffect(() => {
    const dirty =
      name !== order.name ||  
      total !== order.total ||  
      vat !== order.vat || 
      vatType !== order.vatType || 
      vatRate !== order.vatRate ||  
      vatTotal !== order.vatTotal ||  
      dueAt !== order.dueAt ||     
      archived !== order.archived;

    setIsDirty(dirty);
  }, [name, total, vat, vatType, vatRate, vatTotal, dueAt, archived]);

  return [
    [ order.laboruId, name, total, vat, vatType, vatRate, vatTotal, dueAt, archived, order.archivedAt, order.createdAt, order.updatedAt, isDirty],
    [
      setName, 
      setDueAt,    
      setArchived,
      reset,
      save,
      refresh,
      commit
    ]
  ];
}