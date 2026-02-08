import Api from "@/helpers/api"
import Model from "@/helpers/models/model";

export default class Collection<M extends Model> {
    protected static url: string;
    protected models: M[] = [];
    public page: number;
    public pageSize: number;
    public pageCount: number;
    public total: number;
    protected searchQuery: string
    protected updateEvents: Array<() => void> = [];

    constructor(models: M[] = []) {
        this.models = models;
        this.page = 1;
        this.pageSize = 100;
        this.pageCount = 0;
        this.total = 0;
        this.searchQuery = "";
    }

    async fetch(page?: number | null, pageSize?: number | null, searchQuery?: string | null): Promise<void> { 
        this.page = page ?? this.page;
        this.pageSize = pageSize ?? this.pageSize;
        this.searchQuery = searchQuery ?? this.searchQuery;

        if (this.updateEvents)
            this.updateEvents.forEach(cb => cb());
    }

    getModels(): M[] {
        return this.models;
    }

    setModels(models: M[]): void {
        this.models = models;
    }

    add(model: M): void {
        this.models.push(model);
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