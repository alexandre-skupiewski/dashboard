import Api from "@/helpers/api"
import Model from "@/models/model";

export default class Collection<M extends Model> {
    protected static url: string; 
    protected models: M[] = [];
    
    constructor(models: M[] = []) {
        this.models = models;
    }

    async fetch(page?: number, pageSize?: number): Promise<void> {}

    getModels(): M[] {
        return this.models;
    }

    setModels(models: M[]): void {
        this.models = models;
    }

    add(model: M): void {
        this.models.push(model);
    }
}