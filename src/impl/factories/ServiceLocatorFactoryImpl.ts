import type { IServiceLocator } from "../../contracts/IServiceLocator.js";
import { ServiceLocatorImpl } from "../locators/ServiceLocatorImpl.js";

export class ServiceLocatorFactory {
  private static instance: IServiceLocator | null = null;

  static createServiceLocator(): IServiceLocator {
    if (ServiceLocatorFactory.instance === null) {
      ServiceLocatorFactory.instance = new ServiceLocatorImpl();
    }
    return ServiceLocatorFactory.instance;
  }

  static resetServiceLocator(): void {
    ServiceLocatorFactory.instance = null;
  }
}
