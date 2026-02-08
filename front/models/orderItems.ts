import { Model, Collection } from "../helpers/models/models";
import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";
import { OrderModel } from "@/models/orders"

export class OrderItemModel extends Model {
  protected static url: string = "order/items";
  protected static key: string = "orderItem";
  protected static attributeId: string = "id";
  id: number | null; 
  name: string = ""; 
  price: number = 0;
  totalPrice: number = 0;
  vatValue: number = 0;
  vatPrice: number = 0;
  amount: number = 0;
  vat: number = 0;
  createdAt: string = ""; 
  updatedAt: string = "";
  order: OrderModel | null;

  constructor(id?: number) {
    super();
    this.id = id || null;     
    this.order = new OrderModel(id);
  }

  fromJson(json: any): void {
    this.id = json.id;   
    this.name = json.name;   
    this.price = json.price;            
    this.amount = json.amount;   
    this.vat = json.vat;       
    this.createdAt = json.createdAt;    
    this.updatedAt = json.updatedAt;
    this.calc();

    if(json.order) {
      this.order = Models.get<OrderModel>("order." + json.order.id, () => new OrderModel(json.order.id));
      this.order?.copy(json.order);
    }    
  }

  toJson(): Record<string, any> {
    const json: Record<string, any> = {};
    json["id"] = this.id;
    json["orderId"] = this.order?.id;
    json["name"] = this.name;
    json["price"] = this.price;
    json["amount"] = this.amount;
    json["createdAt"] = this.createdAt;
    json["totalPrice"] = this.totalPrice;
    json["vatValue"] = this.vatValue;
    json["vatPrice"] = this.vatPrice;
    return json;
  }

  calc() { 
    this.totalPrice = this.amount * this.price;
    this.vatValue = this.totalPrice * this.vat/100;
    this.vatPrice = Math.round((this.totalPrice + this.vatValue) * 100) / 100;
  }

  setAmount(value: number) {
    this.amount = value;    
    this.calc();
    this.update();
    this.order?.calc();
  }

  setPrice(value: number) {
    this.price = value;
    this.calc();
    this.update();
    this.order?.calc();    
  }
}

export class OrderItemCollection extends Collection<OrderItemModel> {
  static url: string = "order/items";
  orderId: number | null;  

  constructor(orderId?: number | null) {
    super();   
    this.orderId = orderId || null;
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
        item?.fromJson(o);
        return item;
      }
    );

    this.models.forEach(m => Models.release(m.getKey()));
    this.setModels(items);

    await super.fetch();
  }
}