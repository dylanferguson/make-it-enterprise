import type { IServiceLocator } from "./IServiceLocator.js";

export interface IEnterpriseNamingContext {
  lookup(name: string): unknown;
  lookupServiceLocator(): IServiceLocator;
  bind(name: string, value: unknown): void;
  unbind(name: string): boolean;
  listBoundNames(): readonly string[];
  getNamingContextName(): string;
}
