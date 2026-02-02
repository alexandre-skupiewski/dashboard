import {Model, Collection} from "./models";
import Api from "@/helpers/api"
import { Models } from "@/models/models";

export class ClientModel extends Model {
  protected static url: string = "clients";
  protected static key: string = "client";
  protected static attributeId: string = "id";
  id: number | null;
  laboruId: string;
  name: string;
  description: string;
  email: string;
  vat: string;
  vatType: string;
  vatRate: string;
  phone1: string;
  phone2: string;
  phone3: string;
  phone4: string;
  archived: boolean;
  createdAt: string;
  archivedAt: string;
  updatedAt: string;

  constructor(
    id?: number) {
    super();
    this.id = id ? id : null;
    this.laboruId = "";
    this.name = "";
    this.description = "";   
    this.email = "";
    this.vat = "";
    this.vatType = "";
    this.vatRate = "";
    this.phone1 = "";
    this.phone2 = "";
    this.phone3 = "";
    this.phone4 = "";
    this.archived = false;
    this.archivedAt = "";
    this.createdAt = "";
    this.updatedAt = "";
  } 
}

export class ClientCollection extends Collection<ClientModel> {
  static url: string = "clients";

  async fetch(page?: number, pageSize?: number): Promise<void> {
    const params = new URLSearchParams({
      page: page ? page.toString() : "1",
      pageSize: pageSize ? pageSize.toString() : "100",
    });

    const data = await Api.GET("clients?" + params);
    
    const clients = data.clients.map(
      (c: any) => {
        const client = Models.get<ClientModel>("client." + c.id, () => new ClientModel(c.id));      
        client.fromJson(c);
        return client;
      }
    );   

    this.setModels(clients);
  }
}