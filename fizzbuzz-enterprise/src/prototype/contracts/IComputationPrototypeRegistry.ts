import type { IFizzBuzzComputationPrototype } from "./IFizzBuzzComputationPrototype.js";

export interface IComputationPrototypeRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerPrototype(identifier: string, prototype: IFizzBuzzComputationPrototype): void;
  getPrototype(identifier: string): IFizzBuzzComputationPrototype | null;
  clonePrototype(identifier: string, overrides?: Record<string, unknown>): IFizzBuzzComputationPrototype | null;
  getRegisteredIdentifiers(): readonly string[];
  getPrototypeCount(): number;
  clearRegistry(): void;
}

