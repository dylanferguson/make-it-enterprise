import type { IFizzBuzzComputationTypeFlyweight } from "../../contracts/IFizzBuzzComputationTypeFlyweight.js";
import type { IFlyweightComputationTypeRegistry } from "../../contracts/IFlyweightComputationTypeRegistry.js";
import { ComputationTypeFlyweightRegistryImpl } from "./ComputationTypeFlyweightRegistryImpl.js";
import { FizzBuzzComputationTypeFlyweightImpl } from "../flyweights/FizzBuzzComputationTypeFlyweightImpl.js";
import { FizzComputationTypeFlyweightImpl } from "../flyweights/FizzComputationTypeFlyweightImpl.js";
import { BuzzComputationTypeFlyweightImpl } from "../flyweights/BuzzComputationTypeFlyweightImpl.js";
import { NumberComputationTypeFlyweightImpl } from "../flyweights/NumberComputationTypeFlyweightImpl.js";

let flyweightFactorySingleton: ComputationTypeFlyweightFactoryImpl | null = null;

export class ComputationTypeFlyweightFactoryImpl {
  private static readonly FACTORY_NAME = "ComputationTypeFlyweightFactory";
  private static readonly FACTORY_VERSION = "1.0.0-FLYWEIGHT-FACTORY";

  private readonly _registry: IFlyweightComputationTypeRegistry;
  private readonly _flyweightCache: Map<string, IFizzBuzzComputationTypeFlyweight>;

  constructor(registry: IFlyweightComputationTypeRegistry) {
    this._registry = registry;
    this._flyweightCache = new Map<string, IFizzBuzzComputationTypeFlyweight>();
    this.initializeDefaultFlyweights();
  }

  private initializeDefaultFlyweights(): void {
    const fizzbuzz = new FizzBuzzComputationTypeFlyweightImpl();
    const fizz = new FizzComputationTypeFlyweightImpl();
    const buzz = new BuzzComputationTypeFlyweightImpl();
    const number = new NumberComputationTypeFlyweightImpl();

    this._registry.registerType(fizzbuzz.getTypeIdentifier(), fizzbuzz);
    this._registry.registerType(fizz.getTypeIdentifier(), fizz);
    this._registry.registerType(buzz.getTypeIdentifier(), buzz);
    this._registry.registerType(number.getTypeIdentifier(), number);

    this._flyweightCache.set(fizzbuzz.getTypeIdentifier(), fizzbuzz);
    this._flyweightCache.set(fizz.getTypeIdentifier(), fizz);
    this._flyweightCache.set(buzz.getTypeIdentifier(), buzz);
    this._flyweightCache.set(number.getTypeIdentifier(), number);
  }

  getFactoryName(): string {
    return ComputationTypeFlyweightFactoryImpl.FACTORY_NAME;
  }

  getFactoryVersion(): string {
    return ComputationTypeFlyweightFactoryImpl.FACTORY_VERSION;
  }

  getRegistry(): IFlyweightComputationTypeRegistry {
    return this._registry;
  }

  getFlyweight(typeIdentifier: string): IFizzBuzzComputationTypeFlyweight | null {
    return this._flyweightCache.get(typeIdentifier) ?? null;
  }

  resolveComputationType(value: number): IFizzBuzzComputationTypeFlyweight | null {
    const sortedFlyweights = this._registry.getRegisteredFlyweights()
      .slice()
      .sort((a: IFizzBuzzComputationTypeFlyweight, b: IFizzBuzzComputationTypeFlyweight) => a.getOrdinalPriority() - b.getOrdinalPriority());

    for (const flyweight of sortedFlyweights) {
      if (flyweight.evaluate(value)) {
        return flyweight;
      }
    }
    return null;
  }

  getCachedFlyweights(): readonly IFizzBuzzComputationTypeFlyweight[] {
    return Array.from(this._flyweightCache.values());
  }

  getCacheSize(): number {
    return this._flyweightCache.size;
  }

  static getFactoryNameStatic(): string {
    return ComputationTypeFlyweightFactoryImpl.FACTORY_NAME;
  }

  static getFactoryVersionStatic(): string {
    return ComputationTypeFlyweightFactoryImpl.FACTORY_VERSION;
  }
}

