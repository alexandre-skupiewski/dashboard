export class Page {
  public id: string;
  public title: string;
  public component: React.FC;
  public icon?: any;
  public selected: boolean

  constructor(component: React.FC, id: string, title: string, icon?: any, selected = false) {
    this.id = id;
    this.title = title;
    this.component = component;
    this.icon = icon;
    this.selected = selected;
  }
}

export class Pages {
  private static openEvents: Array<(page: Page) => void> = [];
  private static closeEvents: Array<(page: Page) => void> = [];
  private static pages: Page[] = [];
  
  static open(page: Page) {
    const exists = this.pages.some(p => p.id === page.id);

    if (exists) {
    } else {
      this.pages.push(page)
    }

    this.pages = this.pages.map(p => ({
        ...p,
        selected: p.id === page.id
      }));

    this.openEvents.forEach(cb => cb(page));
  }

  static onOpen(callback: (page: Page) => void) {
    if (!this.openEvents.includes(callback)) {
      this.openEvents.push(callback);
    }

    return () => this.offOpen(callback);
  }

  static offOpen(callback: (page: Page) => void) {
    this.openEvents = this.openEvents.filter(cb => cb !== callback);
  }

  static close(page: Page) {
    const exists = this.pages.some(p => p.id === page.id);
    if (!exists) return;

    // Retire la page
    this.pages = this.pages.filter(p => p.id !== page.id);    

    // Optionnel : sélectionner une autre page (ex : la dernière)
    if (this.pages.length > 0) {
      this.pages = this.pages.map((p, index) => ({
        ...p,
        selected: index === this.pages.length - 1,
      }));
    }

    // Notifie les abonnés
    this.closeEvents.forEach(cb => cb(page));
  }

  static onClose(callback: (page: Page) => void) {
    if (!this.closeEvents.includes(callback)) {
      this.closeEvents.push(callback);
    }

    return () => this.offClose(callback);
  }  

   static offClose(callback: (page: Page) => void) {
    this.openEvents = this.openEvents.filter(cb => cb !== callback);
  }

  static getPages() {
    return this.pages;
  }

  static getSelectedPage(): Page | null {
    return this.pages.find(p => p.selected) ?? null;
  }
}