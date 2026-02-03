import { useEffect, useState } from "react";
import Model from "@/helpers/models/model";
import { Models } from "./models";

export default function useModel<M extends Model>(
  initialModel: M,
): [M, (model: M) => void] {
  const [model, setModel] = useState<M>(initialModel);

  /* function commit() {
     initialModel.copy(model);
   }*/

  useEffect(() => {

    console.log("useModel mounted", model);

    if (model.getId())
      Models.use(model.getKey());

    return () => {
      console.log("useModel unmounted", model);
      Models.release(model.getKey());
    };
  }, []);

  return [model, setModel];
}