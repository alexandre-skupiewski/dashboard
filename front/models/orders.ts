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
  archived: boolean;
  createdAt: string;
  archivedAt: string;
  updatedAt: string;
  client: ClientModel | null;

  constructor(
    id?: number) {
    super();
    this.id = id ? id : null;
    this.laboruId = "";   
    this.number = "";
    this.archived = false;
    this.archivedAt = "";
    this.createdAt = "";
    this.updatedAt = "";
    this.client = null;
  }

  fromJson(json: any): void {
    this.id = json.id;
    this.laboruId = json.laboruId;  
    this.number = json.number;
    this.archived = json.archived;
    this.createdAt = json.createdAt;
    this.archivedAt = json.archivedAt;
    this.updatedAt = json.updatedAt;

    if(json.client) {
      this.client = Models.get<ClientModel>("client." + this.id, () => new ClientModel());
      this.client.copy(json.client);
    }    
  }
}

export class OrderCollection extends Collection<OrderModel> {
  static url: string = "orders";
  type: string = "";

  constructor(type: string) {
    super();
    this.type = type;
  }

  async fetch(page?: number, pageSize?: number): Promise<void> {
    const params = new URLSearchParams({
      type: this.type,
      page: page ? page.toString() : "1",
      pageSize: pageSize ? pageSize.toString() : "100",
    });

    const data = await Api.GET("orders?" + params);

    const orders = data.orders.map(
      (o: any) => {
        const order = Models.get<OrderModel>("order." + o.id, () => new OrderModel(o.id));
        order.fromJson(o);
        return order;
      }
    );

    this.setModels(orders);
  }
}