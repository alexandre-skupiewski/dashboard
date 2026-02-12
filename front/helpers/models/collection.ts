import Api from "@/helpers/api"
import Model from "@/helpers/models/model";
import { Models } from "@/helpers/models/models";

export default class Collection<M extends Model> {
    protected static url: string;    
    protected models: M[] = [];
    public page: number;
    public pageSize: number;
    public pageCount: number;
    public total: number;
    protected searchQuery: string
    protected updateEvents: Array<() => void> = [];

    constructor() {
        this.models = [];
        this.page = 1;
        this.pageSize = 100;
        this.pageCount = 0;
        this.total = 0;
        this.searchQuery = "";       
    }

    loadModel(id: any): M | null {
        return null;
    }

    fetchParams(): Record<string, any>  {
        return {
            page: this.page ? this.page.toString() : "1",
            pageSize: this.pageSize ? this.pageSize.toString() : "100",
            searchQuery: this.searchQuery
        };
    }

    async fetch(page?: number | null, pageSize?: number | null, searchQuery?: string | null): Promise<void> {   
        const ctor = this.constructor as typeof Collection;

        this.page = page ?? this.page;
        this.pageSize = pageSize ?? this.pageSize;
        this.searchQuery = searchQuery ?? this.searchQuery;
        
        const params = new URLSearchParams(this.fetchParams());
        
        const data = await Api.GET(ctor.url + "?" + params);
        
        this.pageCount = data.pageCount;
        this.total = data.total;
    
        const items = data.items.map(
            (c: any) => {                
                const newModel = this.loadModel(c.id);
                const key = newModel?.getKey() || "";
                if(key !== "") {
                    const item = Models.get<M>(key, () => newModel);
                    item!.fromJson(c);
                    return item;
                }                
            }
        );
    
        this.models.forEach(m => Models.release(m.getKey()));
        this.setModels(items);

        if (this.updateEvents)
            this.updateEvents.forEach(cb => cb());
        
        this.models.forEach(m => m.update());
    }

    getModels(): M[] {
        return this.models;
    }

    setModels(models: M[]): void {
        this.models = models;
    }

    add(model: M): void {
        if(model) {
            this.models.push(model);
            this.total = this.models.length
            if (this.updateEvents)
                this.updateEvents.forEach(cb => cb());
        }
       
    }

    remove(model: M): void {
        this.models = this.models.filter(m => m !== model);
        this.total = this.models.length
        if (this.updateEvents)
            this.updateEvents.forEach(cb => cb());
    }

    bindUpdate(callback: () => void) {
        if (!this.updateEvents.includes(callback)) 
            this.updateEvents.push(callback);

        return () => this.unbindUpdate(callback);
    }

    unbindUpdate(callback: () => void) {
        this.updateEvents = this.updateEvents.filter(cb => cb !== callback);
    }
}