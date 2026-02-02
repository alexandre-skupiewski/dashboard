export class Page {
  public id: string;
  public title: React.ReactNode;
  public component?: React.ReactNode;
  public icon?: any;
  public selected: boolean

  constructor(component: React.ReactNode, id: string, title: React.ReactNode, icon?: any) {
    this.id = id;
    this.title = title;
    this.component = component;
    this.icon = icon;
    this.selected = false;
  }
}

export class Pages {
  private static openEvents: Array<(page: Page) => void> = [];
  private static updateEvents: Array<(page: Page) => void> = [];
  private static closeEvents: Array<(page: Page) => void> = [];
  private static pages: Page[] = [];
  
  static open(page: Page) {
    const exists = this.pages.some(p => p.id === page.id);

    if (!exists) {    
      this.pages.push(page)
    }

    this.pages = this.pages.map(p => ({
      ...p,
      selected: p.id === page.id
    }));

    this.openEvents.forEach(cb => cb(page));
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

  static updateId(id: string, newId: string) {
    let updatedPage: Page | undefined;

    // Met à jour la page correspondante
    this.pages = this.pages.map(p => {
      if (p.id === id) {
        p.id = newId;        
      }
      return p;
    });

    // Notifie les abonnés à l'update
    if (updatedPage) {
      this.updateEvents.forEach(cb => cb(updatedPage!));
    }
  }

  static updateTitle(id: string, title: React.ReactNode) {
    let updatedPage: Page | undefined;

    // Met à jour la page correspondante
    this.pages = this.pages.map(p => {
      if (p.id === id) {
        updatedPage = { ...p, title }; // clone et update
        return updatedPage;
      }
      return p;
    });

    // Notifie les abonnés à l'update
    if (updatedPage) {
      this.updateEvents.forEach(cb => cb(updatedPage!));
    }
  }

  // Abonnements aux updates
  static onUpdate(callback: (page: Page) => void) {
    if (!this.updateEvents.includes(callback)) {
      this.updateEvents.push(callback);
    }
    return () => this.offUpdate(callback);
  }

  static offUpdate(callback: (page: Page) => void) {
    this.updateEvents = this.updateEvents.filter(cb => cb !== callback);
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