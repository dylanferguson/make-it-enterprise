export interface IEjbHome {
  getHomeName(): string;
  getHomeVersion(): string;
  getJndiBindingName(): string;
  create(): IEjbObject;
  remove(handle: string): void;
}

import type { IEjbObject } from "./IEjbObject.js";
