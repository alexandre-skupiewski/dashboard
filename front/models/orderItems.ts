import { Model, Collection } from "../helpers/models/models";
import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";
import { OrderModel } from "@/models/orders"

export class OrderItemModel extends Model {
  protected static url: string = "order/items";
  protected static key: string = "orderItem";
  protected static attributeId: string = "id";
  id: number | null; 
  name: string; 
  createdAt: string; 
  updatedAt: string;
  order: OrderModel | null;

  constructor(
    id?: number) {
    super();
    this.id = id ? id : null;   
    this.name = "";   
    this.createdAt = "";
    this.updatedAt = "";
    this.order = new OrderModel();
  }

  fromJson(json: any): void {
    this.id = json.id;   
    this.name = json.name;    
    this.createdAt = json.createdAt;    
    this.updatedAt = json.updatedAt;

    if(json.order) {
      this.order = Models.get<OrderModel>("order." + json.order.id, () => new OrderModel());
      this.order.copy(json.order);
    }    
  }
}

export class OrderItemCollection extends Collection<OrderItemModel> {
  static url: string = "order/items";
  orderId: number;  

  constructor(orderId: number) {
    super();   
    this.orderId = orderId;
  }

  async fetch(page?: number, pageSize?: number, searchQuery?: string): Promise<void> {
    this.page = page ?? this.page;
    this.pageSize = pageSize ?? this.pageSize;
    this.searchQuery = searchQuery ?? this.searchQuery;
    
    const params = new URLSearchParams({  
      page: this.page ? this.page.toString() : "1",
      pageSize: this.pageSize ? this.pageSize.toString() : "100",
      searchQuery: this.searchQuery
    });

    params.append("orderId", this.orderId ? this.orderId.toString() : "");

    const data = await Api.GET(`${OrderItemCollection.url}?${params}`);

    this.pageCount = data.pageCount;
    this.total = data.total;

    const items = data.items.map(
      (o: any) => {
        const item = Models.get<OrderItemModel>("orderItem." + o.id, () => new OrderItemModel(o.id));
        item.fromJson(o);
        return item;
      }
    );

    this.models.forEach(m => Models.release(m.getKey()));
    this.setModels(items);

    await super.fetch();
  }
}