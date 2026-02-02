import { useEffect, useState } from "react";
import Model from "@/models/model";

export { default as Model } from "@/models/model";
export { default as Collection } from "@/models/collection";
export { default as useModel } from "@/models/useModel";
export { default as useCollection } from "@/models/useCollection";

type ModelEntry<T> = {
  model: T    
  refCount: number
}

export class Models {
  private static models = new Map<string, ModelEntry<any>>()

  static use(
    key: string
  ) {
    const existing = this.models.get(key)

    if (existing) {
      existing.refCount++
    }

    console.log(`Models count: ${this.models.size}`)
  }

  static get<M extends Model>(
    key: string,
    loader: () => M
  ): M {
    const existing = this.models.get(key)

    if (existing) {
      existing.refCount++
      console.log(`Models count: ${this.models.size}`)
      return existing.model
    }

    const model = loader()
    this.models.set(key, { model, refCount: 1 })
    console.log(`Models count: ${this.models.size}`)
    return model
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

    console.log(`Models count: ${this.models.size}`)
  }

  private static disposeModel(model: any) {
    // ex: model.dispose(), model.destroy(), etc.
  }
}