import type { IServiceLocator } from "../../contracts/IServiceLocator.js";
import type { IServiceLocatorFactory } from "../../contracts/IServiceLocatorFactory.js";
import { ServiceLocatorFactory } from "./ServiceLocatorFactoryImpl.js";

export class ServiceLocatorFactoryBean implements IServiceLocatorFactory {
  private readonly factoryName: string;
  private readonly version: string;

  constructor(factoryName: string = "DefaultServiceLocatorFactoryBean", version: string = "2.0.0-ENTERPRISE") {
    this.factoryName = factoryName;
    this.version = version;
  }

  createServiceLocator(): IServiceLocator {
    console.debug(`[${this.factoryName}:${this.version}] Creating ServiceLocator via FactoryBean`);
    return ServiceLocatorFactory.createServiceLocator();
  }

  resetServiceLocator(): void {
    console.debug(`[${this.factoryName}:${this.version}] Resetting ServiceLocator via FactoryBean`);
    ServiceLocatorFactory.resetServiceLocator();
  }

  getFactoryName(): string {
    return this.factoryName;
  }

  getVersion(): string {
    return this.version;
  }
}

export class ServiceLocatorFactoryBeanFactory {
  static createFactoryBean(factoryName: string = "DefaultServiceLocatorFactoryBean"): ServiceLocatorFactoryBean {
    return new ServiceLocatorFactoryBean(factoryName);
  }
}
