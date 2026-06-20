import type { IFizzBuzzSessionManager } from "./IFizzBuzzSessionManager.js";

export interface IServiceLocatorFactory {
  createServiceLocator(): IServiceLocator;
  resetServiceLocator(): void;
}

import type { IServiceLocator } from "./IServiceLocator.js";
