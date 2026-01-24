class Views {
  private static _instance: Views;
  private eventTarget: EventTarget;

  private constructor() {
    this.eventTarget = new EventTarget();
  }

  static get instance() {
    if (!this._instance) this._instance = new Views();
    return this._instance;
  }

  on(event: string, callback: EventListener) {
    this.eventTarget.addEventListener(event, callback);
  }

  off(event: string, callback: EventListener) {
    this.eventTarget.removeEventListener(event, callback);
  }

  open(title: string, detail?: any) {
    this.eventTarget.dispatchEvent(new CustomEvent("open", { detail }));
  }
}

export default Views;
