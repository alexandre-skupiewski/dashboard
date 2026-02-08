import { Model, Collection } from "../helpers/models/models";
import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";

export class ClientModel extends Model {
  protected static url: string = "clients";
  protected static key: string = "client";
  protected static attributeId: string = "id";
  id: number | null = null;
  laboruId: string = "";
  name: string = "";
  description: string = "";
  email: string = "";
  vat: string = "";
  vatType: string = "";
  vatRate: string = "";
  phone1: string = "";
  phone2: string = "";
  phone3: string = "";
  phone4: string = "";
  archived: boolean = false;
  createdAt: string = "";
  archivedAt: string = "";
  updatedAt: string = "";

  constructor(id?: number) {
    super();
    this.id = id || null;    
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

    this.pageCount = data.pageCount;
    this.total = data.total;

    const items = data.items.map(
      (c: any) => {
        const item = Models.get<ClientModel>("client." + c.id, () => new ClientModel(c.id));
        item!.fromJson(c);
        return item;
      }
    );

    this.models.forEach(m => Models.release(m.getKey()));
    this.setModels(items);

    await super.fetch(page, pageSize, searchQuery);
  }
}