import { GUI } from "lil-gui";

let instance: Debug | null = null;

export default class Debug {
  active: boolean;
  ui: GUI | undefined;
  constructor() {
    this.active = window.location.hash === "#debug";
    if (instance) {
      return instance;
    }
    instance = this;

    if (this.active) {
      this.ui = new GUI();
      this.ui.close();
      return;
    }
  }
}
