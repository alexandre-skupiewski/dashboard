import { useEffect, useState } from "react";
import { Models } from "@/helpers/models/models";
import Model from "@/helpers/models/model";

export default function useModel(
  model: Model,
): [
    Record<string, any>,     
    boolean, 
    (id: string, value: any) => void,        
    () => void,
    () => Promise<void>,
    () => Promise<void>
] {  
  const [data, setData] = useState<Record<string, any>>(model.toJson());
  const [tmpData, setTmp] = useState<Record<string, any>>(model.toJson());
  const [isDirty, setIsDirty] = useState<boolean>(model.isDirty());

  function set(id: string, value: any) {    
    model.setTmp(id, value);   
    setTmp(Object.fromEntries(model.getProperties().map(i => [i.getId(), i.getTmpValue()])));
    setIsDirty(model.isDirty());
  }

  async function refresh() {
    await model.refresh();    
    setTmp(Object.fromEntries(model.getProperties().map(i => [i.getId(), i.getTmpValue()])));
    setData(Object.fromEntries(model.getProperties().map(i => [i.getId(), i.getValue()])));
    setIsDirty(model.isDirty());
  }

  async function save() {
    model.commit();
    await model.save(); 
    setTmp(Object.fromEntries(model.getProperties().map(i => [i.getId(), i.getTmpValue()])));
    setData(Object.fromEntries(model.getProperties().map(i => [i.getId(), i.getValue()])));
    setIsDirty(model.isDirty());
  }

  function reset() {   
    model.reset();
    setTmp(Object.fromEntries(model.getProperties().map(i => [i.getId(), i.getTmpValue()])));
    setData(Object.fromEntries(model.getProperties().map(i => [i.getId(), i.getValue()])));
    setIsDirty(model.isDirty());
  }

  useEffect(() => {
    if (model?.getId()) {
      Models.get(model.getKey());
    }

    const unbindUpdate = model?.bindUpdate(() => {
      setTmp(Object.fromEntries(model.getProperties().map(i => [i.getId(), i.getTmpValue()])));
      setData(Object.fromEntries(model.getProperties().map(i => [i.getId(), i.getValue()])));
    });

    return () => {
      if (model) {
        Models.release(model.getKey());
        unbindUpdate?.();
      }
    };
  }, []);

  return [data, isDirty, set, reset, save, refresh];
}
