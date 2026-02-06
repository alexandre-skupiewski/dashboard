import { Model, Collection } from "../helpers/models/models";
import Api from "@/helpers/api"
import { Models } from "@/helpers/models/models";

export class ProductModel extends Model {
  protected static url: string = "products";
  protected static key: string = "product";
  protected static attributeId: string = "id";
  id: number | null;
  laboruId: string;
  name: string; 
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
    this.archived = false;
    this.archivedAt = "";
    this.createdAt = "";
    this.updatedAt = "";
  }
}

export class ProductCollection extends Collection<ProductModel> {
  static url: string = "products";

  async fetch(page?: number, pageSize?: number, searchQuery?: string): Promise<void> {
    this.page = page ?? this.page;
    this.pageSize = pageSize ?? this.pageSize;
    this.searchQuery = searchQuery ?? this.searchQuery;

    const params = new URLSearchParams({
      page: this.page ? this.page.toString() : "1",
      pageSize: this.pageSize ? this.pageSize.toString() : "100",
      searchQuery: this.searchQuery
    });

    const data = await Api.GET("products?" + params);

    this.pageCount = data.pageCount;
    this.total = data.total;

    const items = data.items.map(
      (c: any) => {
        const item = Models.get<ProductModel>("product." + c.id, () => new ProductModel(c.id));
        item.fromJson(c);
        return item;
      }
    );

    this.models.forEach(m => Models.release(m.getKey()));
    this.setModels(items);

    await super.fetch(page, pageSize, searchQuery);
  }
}