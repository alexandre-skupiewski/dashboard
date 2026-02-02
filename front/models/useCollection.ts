import { useEffect, useState } from "react";
import { Models, Model, Collection } from "./models";

export default function useCollection<C extends Collection<M>, M extends Model>(
  initialCollection: C
): [C, (models: M[]) => void] {

  const [collection, setCollection] = useState<C>(initialCollection);

  const setModels = (models: M[] ) => {
    const newCollection = collection.constructor as { new(models: M[]): C };
    setCollection(new newCollection(models));
  }

  const addModel = (model: M) => {
    /*collection.add(model);
    setCollection(new Collection(collection.getModels()));*/
  }

  useEffect(() => {   

    console.log("useCollection mounted", collection);

  
    return () => {
      console.log("useCollection unmounted", collection);
      collection.getModels().forEach(m => Models.release(m.getKey()));
     
    };
  }, []);

  return [collection, setModels];
}