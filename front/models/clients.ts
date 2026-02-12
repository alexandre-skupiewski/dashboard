import { Model, Collection } from "../helpers/models/models";
import { ModelProperty } from "@/helpers/models/model";

export class ClientModel extends Model {
  protected static url: string = "clients";
  protected static key: string = "client";
  protected static attributeId: string = "id";  

  constructor(id?: number) {
    super();

    this.addProperty(new ModelProperty<number | null>("id", id || -1)); 
    this.addProperty(new ModelProperty<string>("laboruId", ""));
    this.addProperty(new ModelProperty<string>("name", ""));
    this.addProperty(new ModelProperty<string>("email", ""));
    this.addProperty(new ModelProperty<string>("description", ""));
    this.addProperty(new ModelProperty<string>("vat", ""));
    this.addProperty(new ModelProperty<string>("vatType", ""));
    this.addProperty(new ModelProperty<string>("vatRate", ""));  
    this.addProperty(new ModelProperty<string>("phone1", "")); 
    this.addProperty(new ModelProperty<string>("phone2", "")); 
    this.addProperty(new ModelProperty<string>("phone3", "")); 
    this.addProperty(new ModelProperty<string>("phone4", "")); 
    this.addProperty(new ModelProperty<boolean>("archived", false)); 
    this.addProperty(new ModelProperty<string>("createdAt", "")); 
    this.addProperty(new ModelProperty<string>("archivedAt", "")); 
    this.addProperty(new ModelProperty<string>("updatedAt", "")); 
  }
}

export class ClientCollection extends Collection<ClientModel> {
  static url: string = "clients";

  loadModel(id: any): ClientModel {
    return new ClientModel(id);
  }
}