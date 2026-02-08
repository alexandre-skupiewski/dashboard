import { useEffect, useState } from "react";
import Model from "@/helpers/models/model";

export { default as Model } from "@/helpers/models/model";
export { default as Collection } from "@/helpers/models/collection";
export { default as useCollection } from "@/helpers/models/useCollection";

type ModelEntry<T> = {
  model: T
  refCount: number
}

export class Models {
  private static models = new Map<string, ModelEntry<any>>()

  /*static use(
    key: string
  ) {
    const existing = this.models.get(key)

    if (existing) {
      existing.refCount++
    }

    //console.log(`Models count: ${this.models.size}`)
  }*/

  static get<M extends Model>(
    key: string,
    loader?: () => M
  ): M | null {
    const existing = this.models.get(key)

    if (existing) {
      existing.refCount++
      //console.log(`Models count: ${this.models.size}`)
      //console.log("[MODELS] Return existing model: " + existing.model.uniqId);
      return existing.model;
    }
     
    if(loader && key && key != "") {
      const model = loader();    
      this.models.set(key, { model, refCount: 1 })
      return model;
    }   
    
    return null;
  }

  static release(key: string) {
    const entry = this.models.get(key)
    if (!entry) return

    entry.refCount--

    if (entry.refCount <= 0) {
      // cleanup ici
      this.disposeModel(entry.model)
      this.models.delete(key)
    }

    //console.log(`Models count: ${this.models.size}`)
  }

  private static disposeModel(model: any) {
    // ex: model.dispose(), model.destroy(), etc.
  }
}