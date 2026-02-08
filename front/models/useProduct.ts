import { useEffect, useState } from "react";
import { Models } from "@/helpers/models/models";
import { ProductModel } from "./products"; 

export default function useProduct(
  product: ProductModel,
): 
[
  [ number | null, string, string, boolean, string, string, string, boolean ],    
  [   
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
  const [name, setName] = useState<string>(product.name);   
  const [archived, setArchived] = useState<boolean>(product.archived);
  const [isDirty, setIsDirty] = useState(false);

  function update() {    
    setName(product.name);   
    setArchived(product.archived);
  }

  async function refresh() {    
    await product.fetch()     
    reset();
  }

  async function save() {   
    commit(); 
    await product.save();     
    reset();   
  }

  function reset() {
    setName(product.name);  
    setArchived(product.archived);
    setIsDirty(false);
  }

  function commit() {    
    product.name = name;  
    product.archived = archived;
  }

  useEffect(() => {   
    if (product && product.getId())
      Models.get(product.getKey());

    const unbindUpdate = product?.bindUpdate(update);

    return () => {   
      if(product) {
        Models.release(product.getKey());
        unbindUpdate?.();
      } 
    };
  }, []);

  useEffect(() => {
    const dirty =
      name !== product.name ||     
      archived !== product.archived;

    setIsDirty(dirty);
  }, [name, archived]);

  return [
    [ product.id, product.laboruId, name, archived, product.archivedAt, product.createdAt, product.updatedAt, isDirty],
    [
      setName,     
      setArchived,
      setIsDirty,
      reset,
      save,
      refresh,
      commit
    ]
  ];
}