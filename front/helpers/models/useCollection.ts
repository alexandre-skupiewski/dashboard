import { useEffect, useState } from "react";
import { Models, Model, Collection } from "@/helpers/models/models";

export default function useCollection<C extends Collection<M>, M extends Model>(
  initialCollection: C
): [ Collection<M>, M[], number, number, number, number] {

  const [collection, setCollection] = useState<Collection<M>>(initialCollection);
  const [models, setModels] = useState<M[]>(initialCollection.getModels());
  const [page, setPage] = useState<number>(initialCollection?.page || 0);
  const [pageSize, setPageSize] = useState<number>(initialCollection?.pageSize || 0);
  const [total, setTotal] = useState<number>(initialCollection?.total || 0);
  const [pageCount, setPageCount] = useState<number>(initialCollection?.pageCount || 0);
  
  function update() {        
    setModels([...initialCollection.getModels()]);
    setTotal(initialCollection.total);
    setPageCount(initialCollection.pageCount);
    setPage(initialCollection.page);
    setPageSize(initialCollection.pageSize);   
  }

  useEffect(() => {
    const unbindUpdate = initialCollection.bindUpdate(update);

    return () => {     
      models.forEach(m => Models.release(m.getKey()));
      unbindUpdate();
    };
  }, []);

  return [collection, models, page, pageSize, total, pageCount];
}