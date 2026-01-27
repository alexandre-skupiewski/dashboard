import Model from "./model";

export default class Client extends Model {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    super();
    this.id = id;
    this.name = name ? name : "";
    this.email = email ? email : "";
  }

  async fetch() {
    const params = new URLSearchParams({    
    });

    const res = await fetch("/api/clients/" + this.id);
        
    if (!res.ok) {
        throw new Error("Erreur lors du chargement");
    }

    const data = await res.json()

    return new Client(data.id, data.name, data.email)
  }

  static async fetch(page: number = 1, pageSize: number = 100) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    const res = await fetch("/api/clients?" + params);
        
    if (!res.ok) {
        throw new Error("Erreur lors du chargement");
    }

    const data = await res.json()

    return data.clients.map(
        (c: any) => new Client(c.id, c.name, c.email)
    );   
  }
}