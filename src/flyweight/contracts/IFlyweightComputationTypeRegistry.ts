import type { IFizzBuzzComputationTypeFlyweight } from "./IFizzBuzzComputationTypeFlyweight.js";

export interface IFlyweightComputationTypeRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerType(typeIdentifier: string, flyweight: IFizzBuzzComputationTypeFlyweight): void;
  getType(typeIdentifier: string): IFizzBuzzComputationTypeFlyweight | null;
  getRegisteredTypeIdentifiers(): readonly string[];
  getRegisteredFlyweights(): readonly IFizzBuzzComputationTypeFlyweight[];
  getTypeCount(): number;
  clearRegistry(): void;
}

