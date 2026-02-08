import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";

export default class Model {
    protected static url: string;
    protected static key: string = "";
    protected static attributeId: string = "";
    public uniqId: string = "";
    private updateEvents: Array<() => void> = [];

    constructor() {       
        this.uniqId = crypto.randomUUID();
    }  

    getKey(): string {
        const ctor = this.constructor as typeof Model;
        return ctor.key + "." + (this as any)[ctor.attributeId];
    }

    getId(): string {
        const ctor = this.constructor as typeof Model;
        return (this as any)[ctor.attributeId];
    }

    get(attr: string): any {
        return (this as any)[attr];
    }

    set(attr: string, value: any): any {
        (this as any)[attr] = value;
    }

    copy(model: this): this {
        Object.keys(model).forEach(key => {
            if (key in this) {
                (this as any)[key] = (model as any)[key];
            }
        });

        return this;
    } 

    update(model?: this): this {
        if(model)
            this.copy(model);

        if (this.updateEvents)
            this.updateEvents.forEach(cb => cb());
        
        return this;
    } 

    clone(): this {
        this.uniqId = crypto.randomUUID();
        return Object.assign(
            Object.create(Object.getPrototypeOf(this)),
            this
        );
    }

    async fetch(): Promise<void> {
        const ctor = this.constructor as typeof Model & { url: string };

        const id = (this as any)[ctor.attributeId];
        if (id == null) {
            throw new Error("Impossible de fetch : id manquant");
        }

        const data = await Api.GET(`${ctor.url}/${id}`); 
        this.fromJson(data);
    }
    
    fromJson(json: Record<string, any>): void {
        Object.keys(json).forEach(key => {
            if (key in this) {
                const currentValue = (this as any)[key];
                const incomingValue = json[key];

                // string: null -> ""
                if (
                    incomingValue === null &&
                    typeof currentValue === "string"
                ) {
                    (this as any)[key] = "";
                    return;
                }

                // boolean: null -> false
                if (
                    incomingValue === null &&
                    typeof currentValue === "boolean"
                ) {
                    (this as any)[key] = false;
                    return;
                }

                (this as any)[key] = incomingValue;
            }
        });
    }

    toJson(): Record<string, any> {
        const json: Record<string, any> = {};

        Object.keys(this).forEach(key => {
            const value = (this as any)[key];
            if (typeof value !== "function") {
                json[key] = value;
            }
        });

        return json;
    }

    hasChanged(other: this): boolean {
        let changed = false;

        Object.keys(this).forEach(key => {
            if (key in other) {
                const valueA = (this as any)[key];
                const valueB = (other as any)[key];

                if (valueA !== valueB) {
                    changed = true;
                }
            }
        });

        return changed;
    }

    async create(): Promise<void> {    
        const ctor = this.constructor as typeof Model & { url: string };

        const res = await fetch(ctor.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: this.toJson()
        });

        if (!res.ok) {
            throw new Error(`Erreur lors de l'appel à l'API ("${res.url}) : ${res.status} : ${res.statusText}`);
        }     
    }

    async save(): Promise<void> {    
        const ctor = this.constructor as typeof Model & { url: string };

        const id = (this as any)[ctor.attributeId];       
        
        if(id) {            
            const data = await Api.PATCH(`${ctor.url}/${id}`, this.toJson());
            this.fromJson(data);
        } else {
            const data = await Api.PUT(`${ctor.url}`, this.toJson());
            this.fromJson(data);
        } 
        
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