import type { IComputationPrototypeRegistry } from "../../contracts/IComputationPrototypeRegistry.js";
import type { IFizzBuzzComputationPrototype } from "../../contracts/IFizzBuzzComputationPrototype.js";

export class ComputationPrototypeRegistryImpl
  implements IComputationPrototypeRegistry
{
  private static readonly REGISTRY_NAME = "ComputationPrototypeRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-PROTOTYPE-REGISTRY";

  private readonly _prototypes: Map<string, IFizzBuzzComputationPrototype>;

  constructor() {
    this._prototypes = new Map<string, IFizzBuzzComputationPrototype>();
  }

  getRegistryName(): string {
    return ComputationPrototypeRegistryImpl.REGISTRY_NAME;
  }

  getRegistryVersion(): string {
    return ComputationPrototypeRegistryImpl.REGISTRY_VERSION;
  }

  registerPrototype(identifier: string, prototype: IFizzBuzzComputationPrototype): void {
    this._prototypes.set(identifier, prototype);
  }

  getPrototype(identifier: string): IFizzBuzzComputationPrototype | null {
    return this._prototypes.get(identifier) ?? null;
  }

  clonePrototype(identifier: string, overrides?: Record<string, unknown>): IFizzBuzzComputationPrototype | null {
    const prototype = this._prototypes.get(identifier);
    if (prototype === undefined || prototype === null) {
      return null;
    }
    const cloned = prototype.clone();
    if (overrides !== undefined && cloned.isConfigurable()) {
      cloned.configure(overrides);
    }
    return cloned;
  }

  getRegisteredIdentifiers(): readonly string[] {
    return Array.from(this._prototypes.keys());
  }

  getPrototypeCount(): number {
    return this._prototypes.size;
  }

  clearRegistry(): void {
    this._prototypes.clear();
  }
}

