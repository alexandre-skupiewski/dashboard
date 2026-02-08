import { Model, Collection } from "../helpers/models/models";
import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";
import { ClientModel } from "@/models/clients"
import { OrderItemModel, OrderItemCollection } from "@/models/orderItems";

export class OrderModel extends Model {
  protected static url: string = "orders";
  protected static key: string = "order";
  protected static attributeId: string = "id";
  id: number | null;
  type: "order" | "offer" = "order";
  laboruId: string = "";  
  number: string = "";
  name: string = "";
  total: number = 0;
  vat: number = 0;
  vatType: string = "";
  vatRate: number = 0;
  vatTotal: number = 0;
  archived: boolean = false;
  createdAt: string = "";
  archivedAt: string = "";
  updatedAt: string = "";
  dueAt: string = "";
  client: ClientModel | null;
  items: OrderItemCollection;

  constructor(id?: number | null) {
    super();
    this.id = id || null;   
    this.client = new ClientModel();
    this.items = new OrderItemCollection(this.id);
  }

  fromJson(json: any): void {
    this.id = json.id;
    this.type = json.type;  
    this.laboruId = json.laboruId;  
    this.number = json.number;
    this.name = json.name;
    this.total = json.total;
    this.vat = json.vat;
    this.vatType = json.vatType;
    this.vatRate = json.vatRate;
    this.vatTotal = json.vatTotal;
    this.archived = json.archived;
    this.createdAt = json.createdAt;
    this.archivedAt = json.archivedAt;
    this.updatedAt = json.updatedAt;
    this.dueAt = json.dueAt;

    if(json.client) {
      this.client = Models.get<ClientModel>("client." + json.client.id, () => new ClientModel());
      this.client?.copy(json.client);
    }    
  }

  toJson(): Record<string, any> {
    const json: Record<string, any> = {};
    json["id"] = this.id;
    json["type"] = this.type;
    json["laboruId"] = this.laboruId;
    json["number"] = this.number;
    json["name"] = this.name;
    json["total"] = this.total;
    json["vat"] = this.vat;
    json["vatType"] = this.vatType;
    json["vatRate"] = this.vatRate;
    json["vatTotal"] = this.vatTotal;
    json["archived"] = this.archived;
    json["createdAt"] = this.createdAt;
    json["archivedAt"] = this.archivedAt;
    json["updatedAt"] = this.updatedAt;
    json["dueAt"] = this.dueAt;
    return json;
  }

  calc() { 
    this.total = 0;
    this.vat = 0;
    this.vatTotal = 0;
    this.items.getModels().forEach((orderItem) => {
      this.total += orderItem.totalPrice;
      this.vat += orderItem.vatValue;
      this.vatTotal += orderItem.vatPrice;
    });  
    this.update();  
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
        item?.fromJson(o);
        return item;
      }
    );

    this.models.forEach(m => Models.release(m.getKey()));
    this.setModels(items);

    await super.fetch();
  }
}