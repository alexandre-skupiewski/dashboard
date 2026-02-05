import { Model, Collection } from "../helpers/models/models";
import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";

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

  async fetch(page?: number, pageSize?: number, searchQuery?: string): Promise<void> {
    this.page = page ?? this.page;
    this.pageSize = pageSize ?? this.pageSize;
    this.searchQuery = searchQuery ?? this.searchQuery;

    const params = new URLSearchParams({
      page: this.page ? this.page.toString() : "1",
      pageSize: this.pageSize ? this.pageSize.toString() : "100",
      searchQuery: this.searchQuery
    });

    const data = await Api.GET("clients?" + params);

    const clients = data.clients.map(
      (c: any) => {
        const client = Models.get<ClientModel>("client." + c.id, () => new ClientModel(c.id));
        client.fromJson(c);
        return client;
      }
    );

    this.models.forEach(m => Models.release(m.getKey()));
    this.setModels(clients);

    await super.fetch();
  }
}