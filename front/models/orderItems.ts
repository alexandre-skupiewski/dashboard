import { Model, Collection } from "../helpers/models/models";
import { ModelProperty } from "@/helpers/models/model";
import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";
import { OrderModel } from "@/models/orders"

export class OrderItemModel extends Model {
  protected static url: string = "order/items";
  protected static key: string = "orderItem";
  protected static attributeId: string = "id"; 
 
  order: OrderModel | null;

  constructor(id?: number) {
    super();
    
    this.addProperty(new ModelProperty<number | null>("id", id || -1)); 
    this.addProperty(new ModelProperty<string>("name", ""));
    this.addProperty(new ModelProperty<number>("price", 0));
    this.addProperty(new ModelProperty<number>("totalPrice", 0));
    this.addProperty(new ModelProperty<number>("vatValue", 0));
    this.addProperty(new ModelProperty<number>("amount", 0));
    this.addProperty(new ModelProperty<number>("vat", 0));
    this.addProperty(new ModelProperty<number>("vatPrice", 0));
    this.addProperty(new ModelProperty<string>("createdAt", ""));
    this.addProperty(new ModelProperty<string>("updatedAt", ""));
    this.addProperty(new ModelProperty<string>("laboruId", ""));

    this.order = new OrderModel(id);
  }

  fromJson(json: any): void {
    super.fromJson(json); 
    this.calc();

    if(json.order) {
      this.order = Models.get<OrderModel>("order." + json.order.id, () => new OrderModel(json.order.id));
      this.order?.fromJson(json.order);
    }    
  }

  toJson(): Record<string, any> {
    const json = super.toJson(); 
    json["orderId"] = this.order?.getId();
    return json;
  }

  calc() { 
    this.setTmp("totalPrice", this.getTmp("amount") * this.getTmp("price"));
    this.setTmp("vatValue", this.getTmp("totalPrice") * this.getTmp("vat")/100);
    this.setTmp("vatPrice", Math.round((this.getTmp("totalPrice") + this.getTmp("vatValue")) * 100) / 100);
  }

  setAmount(value: number) {
    this.setTmp("amount", value);    
    this.calc();
    this.update();
    this.order?.calc();
  }

  setPrice(value: number) {
    this.setTmp("price", value);
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

  loadModel(id: any): OrderItemModel {
    return new OrderItemModel(id);
  }

  fetchParams(): Record<string, any>  {
    let params = super.fetchParams();
    params["orderId"] = this.orderId;   
    return params;
  }
}