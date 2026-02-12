import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";

export class ModelProperty<Type> {
    private id: string = "";
    private originalValue: Type;
    private value: Type;

    constructor(id: string, value: Type) {       
        this.id = id;
        this.originalValue = value;
        this.value = this.originalValue;
    }  

    getId(): string {
        return this.id;
    }

    isDirty(): boolean {
        return this.originalValue !== this.value;
    }

    setValue(value: Type) {
        this.value = value;
    }

    setTmpValue(value: Type) {
        this.originalValue = value;
    }

    getValue(): Type {
        return this.value;
    }

    getTmpValue(): Type {
        return this.originalValue;
    }
}

export default class Model {
    protected static url: string;
    protected static key: string = "";
    protected static attributeId: string = "";
    protected properties: ModelProperty<any>[] = [];
    public uniqId: string = "";
    private updateEvents: Array<() => void> = [];

    constructor() {       
        this.uniqId = crypto.randomUUID();
    }  

    getKey(): string {
        const ctor = this.constructor as typeof Model;
        return ctor.key + "." + this.get(ctor.attributeId);
    }

    getId(): any {
        const ctor = this.constructor as typeof Model;
        return this.get(ctor.attributeId);
    }

    getProperties(): ModelProperty<any>[] {
        return this.properties;
    }

    addProperty(property: ModelProperty<any>) {
        this.properties.push(property);
    }

    get(propertyId: string): any {
        let value = null;
        this.properties.forEach(p => {
            if(p.getId() === propertyId) {
                value =  p.getValue();
            }
        });

        return value;
    }     

    set(propertyId: string, value: any): any {
        this.properties.forEach(p => {
            if(p.getId() === propertyId) {
                p.setValue(value);
            }
        });
    }

    getTmp(propertyId: string): any {
        let value = null;
        this.properties.forEach(p => {
            if(p.getId() === propertyId) {
                value =  p.getTmpValue();
            }
        });

        return value;
    }

    setTmp(propertyId: string, value: any): any {
        this.properties.forEach(p => {
            if(p.getId() === propertyId) {
                p.setTmpValue(value);
            }
        });
    }

    isDirty(): boolean {
        let isDirty = false;
        this.properties.forEach(p => {
            if(p.isDirty())
                isDirty = true;
        });
        return isDirty;
    }

    reset() {
        this.properties.forEach(p => {
            p.setTmpValue(p.getValue());
        });
    }

    commit() {
        this.properties.forEach(p => {
            p.setValue(p.getTmpValue());
        });
    }

    update() {
        if (this.updateEvents)
            this.updateEvents.forEach(cb => cb());
    } 

    clone(): this {        
        const newObject = Object.assign(
            Object.create(Object.getPrototypeOf(this)),
            this
        );

        return newObject;
    }

    async fetch(): Promise<void> {
        const ctor = this.constructor as typeof Model & { url: string };
        
        const data = await Api.GET(`${ctor.url}/${this.getId()}`); 
        this.fromJson(data);
    }

    async refresh(): Promise<void> {
        await this.fetch();
        await this.update();
    }
    
    fromJson(json: Record<string, any>): void {
        this.properties.forEach(p => {            
            if(typeof p.getValue() === "string") {
                if(json[p.getId()]) {
                    p.setValue(json[p.getId()] || "");
                    p.setTmpValue(p.getValue());
                }                    
            }

            if(typeof p.getValue() === "boolean") {
                if(json[p.getId()]) {
                    p.setValue(json[p.getId()] || false);
                    p.setTmpValue(p.getValue());
                }
            }

            if(typeof p.getValue() === "number") {
                if(json[p.getId()]) {
                    p.setValue(json[p.getId()] || 0);
                    p.setTmpValue(p.getValue());
                }
            }
        });   
    }

    toJson(): Record<string, any> {
        const json: Record<string, any> = {};
        this.properties.forEach(p => {            
            if(typeof p.getValue() === "string") {
                json[p.getId()] = p.getValue();
            }

            if(typeof p.getValue() === "boolean") {
                json[p.getId()] = p.getValue();
            }

            if(typeof p.getValue() === "number") {
                json[p.getId()] = p.getValue();
            }
        });   

        return json;
    }

    async save(): Promise<void> {    
        const ctor = this.constructor as typeof Model & { url: string };
        
        if(this.getId() >= 0) {            
            const data = await Api.PATCH(`${ctor.url}/${this.getId()}`, this.toJson());
            this.fromJson(data);
        } else {
            const data = await Api.PUT(`${ctor.url}`, this.toJson());
            this.fromJson(data);
        } 
        
        if (this.updateEvents)
            this.updateEvents.forEach(cb => cb());
    }

    async delete(): Promise<void> {    
        const ctor = this.constructor as typeof Model & { url: string };
          
        const data = await Api.DELETE(`${ctor.url}/${this.getId()}`);
        
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