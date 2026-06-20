import type { IObjectFactory } from "../../contracts/IObjectFactory.js";

export class ObjectFactoryImpl<T> implements IObjectFactory<T> {
  private readonly factoryMethod: (...args: unknown[]) => T;
  private readonly objectType: string;
  private readonly singleton: boolean;
  private singletonInstance: T | null;
  private readonly factoryQualifier: string;

  constructor(
    factoryMethod: (...args: unknown[]) => T,
    objectType: string,
    singleton: boolean = true,
    factoryQualifier: string = "DefaultObjectFactory",
  ) {
    this.factoryMethod = factoryMethod;
    this.objectType = objectType;
    this.singleton = singleton;
    this.singletonInstance = null;
    this.factoryQualifier = factoryQualifier;
  }

  createInstance(...args: unknown[]): T {
    if (this.singleton && this.singletonInstance !== null) {
      return this.singletonInstance;
    }
    const instance = this.factoryMethod(...args);
    if (this.singleton) {
      this.singletonInstance = instance;
    }
    return instance;
  }

  getObjectType(): string {
    return this.objectType;
  }

  isSingleton(): boolean {
    return this.singleton;
  }

  getFactoryQualifier(): string {
    return this.factoryQualifier;
  }

  destroySingleton(): void {
    this.singletonInstance = null;
  }
}
