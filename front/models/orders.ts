import { Model, Collection } from "../helpers/models/models";
import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";
import { ClientModel } from "@/models/clients"

export class OrderModel extends Model {
  protected static url: string = "orders";
  protected static key: string = "order";
  protected static attributeId: string = "id";
  id: number | null;
  laboruId: string;  
  number: string;
  name: string;
  archived: boolean;
  createdAt: string;
  archivedAt: string;
  updatedAt: string;
  client: ClientModel;

  constructor(
    id?: number) {
    super();
    this.id = id ? id : null;
    this.laboruId = "";   
    this.number = "";
    this.name = "";
    this.archived = false;
    this.archivedAt = "";
    this.createdAt = "";
    this.updatedAt = "";
    this.client = new ClientModel();
  }

  fromJson(json: any): void {
    this.id = json.id;
    this.laboruId = json.laboruId;  
    this.number = json.number;
    this.name = json.name;
    this.archived = json.archived;
    this.createdAt = json.createdAt;
    this.archivedAt = json.archivedAt;
    this.updatedAt = json.updatedAt;

    if(json.client) {
      this.client = Models.get<ClientModel>("client." + json.client.id, () => new ClientModel());
      this.client.copy(json.client);
    }    
  }
}

export class OrderCollection extends Collection<OrderModel> {
  static url: string = "orders";
  type: string;
  clientId: number | null;  

  constructor(type: string, clientId?: number | null) {
    super();
    this.type = type || "";
    this.clientId = clientId || null;
  }

  async fetch(page?: number, pageSize?: number, searchQuery?: string): Promise<void> {
    this.page = page ?? this.page;
    this.pageSize = pageSize ?? this.pageSize;
    this.searchQuery = searchQuery ?? this.searchQuery;
    
    const params = new URLSearchParams({
      type: this.type,     
      page: this.page ? this.page.toString() : "1",
      pageSize: this.pageSize ? this.pageSize.toString() : "100",
      searchQuery: this.searchQuery
    });

    if(this.clientId)
      params.append("clientId", this.clientId ? this.clientId.toString() : "");

    const data = await Api.GET("orders?" + params);

    this.pageCount = data.pageCount;
    this.total = data.total;

    const items = data.items.map(
      (o: any) => {
        const item = Models.get<OrderModel>("order." + o.id, () => new OrderModel(o.id));
        item.fromJson(o);
        return item;
      }
    );

    this.models.forEach(m => Models.release(m.getKey()));
    this.setModels(items);

    await super.fetch();
  }
}