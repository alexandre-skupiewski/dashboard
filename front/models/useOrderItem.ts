import { useEffect, useState } from "react";
import { Models } from "@/helpers/models/models";
import { OrderItemModel } from "./orderItems"; 

export default function useOrderItem(
  orderItem: OrderItemModel,
): 
[
  [ string, number, number, number, number, number, number, string, string, boolean ],    
  [   
    React.Dispatch<React.SetStateAction<string>>, 
    React.Dispatch<React.SetStateAction<number>>,
    React.Dispatch<React.SetStateAction<number>>,
    () => void,
    () => Promise<void>,
    () => Promise<void>,
    () => void
  ]
]
{  
  const [name, setName] = useState<string>(orderItem.name); 
  const [amount, setAmount] = useState<number>(orderItem.amount); 
  const [price, setPrice] = useState<number>(orderItem.price);
  const [totalPrice, setTotalPrice] = useState<number>(orderItem.totalPrice);
  const [vat, setVat] = useState<number>(orderItem.vat); 
  const [vatValue, setVatValue] = useState<number>(orderItem.vatValue); 
  const [vatPrice, setVatPrice] = useState<number>(orderItem.vatPrice);  
  const [isDirty, setIsDirty] = useState(false);

  function update() {    
    setName(orderItem.name);
    setAmount(orderItem.amount);
    setPrice(orderItem.price);
    setTotalPrice(orderItem.totalPrice);
    setVat(orderItem.vat);
    setVatValue(orderItem.vatValue);
    setVatPrice(orderItem.vatPrice);    
  }

  async function refresh() {    
    await orderItem.fetch()     
    reset();
  }

  async function save() {   
    commit(); 
    await orderItem.save();     
    reset();   
  }

  function reset() {
    setName(orderItem.name);
    setAmount(orderItem.amount);
    setPrice(orderItem.price);
    setTotalPrice(orderItem.totalPrice);
    setVat(orderItem.vat);
    setVatValue(orderItem.vatValue);
    setVatPrice(orderItem.vatPrice);  
    setIsDirty(false);
  }

  function commit() {    
    orderItem.name = name; 
    orderItem.amount = amount; 
    orderItem.price = price; 
    orderItem.totalPrice = totalPrice; 
    orderItem.vat = vat; 
    orderItem.vatValue = vatValue; 
    orderItem.vatPrice = vatPrice;  
  }

  useEffect(() => {   
    if (orderItem && orderItem.getId())
      Models.get(orderItem.getKey());

    const unbindUpdate = orderItem?.bindUpdate(update);

    return () => {   
      if(orderItem) {
        Models.release(orderItem.getKey());
        unbindUpdate?.();
      } 
    };
  }, []);

  useEffect(() => {
    const dirty =
      name !== orderItem.name ||
      amount !== orderItem.amount ||
      price !== orderItem.price ||
      totalPrice !== orderItem.totalPrice ||
      vat !== orderItem.vat ||
      vatValue !== orderItem.vatValue ||
      vatPrice !== orderItem.vatPrice;      

    setIsDirty(dirty);
  }, [name, amount, price, totalPrice, vat, vatValue, vatPrice]);
 
  return [
    [ name, amount, price, totalPrice, vat, vatValue, vatPrice, orderItem.createdAt, orderItem.updatedAt, isDirty],
    [
      setName,  
      setAmount,
      setPrice,   
      reset,
      save,
      refresh,
      commit
    ]
  ];
}