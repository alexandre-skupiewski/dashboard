import { Model, Collection } from "../helpers/models/models";
import { ModelProperty } from "@/helpers/models/model";
import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";
import { ClientModel } from "@/models/clients"
import { OrderItemModel, OrderItemCollection } from "@/models/orderItems";

export class OrderModel extends Model {
  protected static url: string = "orders";
  protected static key: string = "order";
  protected static attributeId: string = "id";
  client: ClientModel | null;
  items: OrderItemCollection;

  constructor(id?: number | null) {
    super();

    this.addProperty(new ModelProperty<number | null>("id", id || -1));    
    this.addProperty(new ModelProperty<"order" | "offer">("type", "order"));
    this.addProperty(new ModelProperty<string>("laboruId", ""));
    this.addProperty(new ModelProperty<string>("number", ""));
    this.addProperty(new ModelProperty<string>("name", ""));
    this.addProperty(new ModelProperty<number>("total", 0));
    this.addProperty(new ModelProperty<number>("vat", 0));
    this.addProperty(new ModelProperty<string>("vatType", ""));
    this.addProperty(new ModelProperty<number>("vatRate", 0));
    this.addProperty(new ModelProperty<number>("vatTotal", 0));
    this.addProperty(new ModelProperty<boolean>("archived", false));
    this.addProperty(new ModelProperty<string>("createdAt", ""));
    this.addProperty(new ModelProperty<string>("archivedAt", ""));
    this.addProperty(new ModelProperty<string>("updatedAt", ""));
    this.addProperty(new ModelProperty<string>("dueAt", ""));
    this.addProperty(new ModelProperty<OrderItemCollection>("items", new OrderItemCollection(this.getId())));
     
    this.client = new ClientModel();
    this.items = new OrderItemCollection(this.getId());
  }

  async fetch() {
    await super.fetch();
    await this.client?.fetch();
  }

  async refresh() {
    await super.refresh();
    await this.items.fetch();
  }

  fromJson(json: any): void {
    super.fromJson(json);    

    if(json.client) {
      this.client = Models.get<ClientModel>("client." + json.client.id, () => new ClientModel());
      this.client?.fromJson(json.client);
    }    
  }

  addOrderItem(): void {
    let orderItem: OrderItemModel | null = new OrderItemModel();
    orderItem.order = this;   
    orderItem.set("vat", this.get("vatRate")); 
    
    orderItem!.save().then(() => {
      orderItem = Models.get<OrderItemModel>("orderItem." + orderItem?.getId(), () => orderItem!);
      this.items.add(orderItem!);     
    });          
  }

  calc() { 
    let total = 0;
    let vat = 0;
    let vatTotal = 0;

    this.items.getModels().forEach((orderItem) => {
      total += orderItem.getTmp("totalPrice");
      vat += orderItem.getTmp("vatValue");
      vatTotal += orderItem.getTmp("vatPrice");
    });  

    this.setTmp("total", total);
    this.setTmp("vat", vat);
    this.setTmp("vatTotal", vatTotal);
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

  loadModel(id: any): OrderModel {
    return new OrderModel(id);
  }

  fetchParams(): Record<string, any>  {
    let params = super.fetchParams();
    params["type"] = this.type;
    if(this.clientId)
      params["clientId"] = this.clientId;
    return params;
  }
}