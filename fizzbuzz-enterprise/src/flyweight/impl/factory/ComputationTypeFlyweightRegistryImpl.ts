import type { IFlyweightComputationTypeRegistry } from "../../contracts/IFlyweightComputationTypeRegistry.js";
import type { IFizzBuzzComputationTypeFlyweight } from "../../contracts/IFizzBuzzComputationTypeFlyweight.js";

export class ComputationTypeFlyweightRegistryImpl
  implements IFlyweightComputationTypeRegistry
{
  private static readonly REGISTRY_NAME = "ComputationTypeFlyweightRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-FLYWEIGHT-REGISTRY";

  private readonly _typeRegistry: Map<string, IFizzBuzzComputationTypeFlyweight>;

  constructor() {
    this._typeRegistry = new Map<string, IFizzBuzzComputationTypeFlyweight>();
  }

  getRegistryName(): string {
    return ComputationTypeFlyweightRegistryImpl.REGISTRY_NAME;
  }

  getRegistryVersion(): string {
    return ComputationTypeFlyweightRegistryImpl.REGISTRY_VERSION;
  }

  registerType(typeIdentifier: string, flyweight: IFizzBuzzComputationTypeFlyweight): void {
    this._typeRegistry.set(typeIdentifier, flyweight);
  }

  getType(typeIdentifier: string): IFizzBuzzComputationTypeFlyweight | null {
    return this._typeRegistry.get(typeIdentifier) ?? null;
  }

  getRegisteredTypeIdentifiers(): readonly string[] {
    return Array.from(this._typeRegistry.keys());
  }

  getRegisteredFlyweights(): readonly IFizzBuzzComputationTypeFlyweight[] {
    return Array.from(this._typeRegistry.values());
  }

  getTypeCount(): number {
    return this._typeRegistry.size;
  }

  clearRegistry(): void {
    this._typeRegistry.clear();
  }
}

