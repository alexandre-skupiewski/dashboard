import { useEffect, useState } from "react";
import Model from "@/helpers/models/model";
import { Models } from "./models";

export default function useModel<M extends Model>(
  initialModel: M | null,
): [M | null] {
  const [model, setModel] = useState<M | null>(initialModel);

  function update() {    
    setModel(model ? model.clone() : null);
  }

  useEffect(() => {   
    if (model && model.getId())
      Models.use(model.getKey());

    const unbindUpdate = model?.bindUpdate(update);

    return () => {   
      if(model) {
        Models.release(model.getKey());
        unbindUpdate?.();
      } 
    };
  }, []);

  return [model];
}