import { BridgeFlyweightPrototypeManagedCommandDecoratorImpl } from "../decorators/BridgeFlyweightPrototypeManagedCommandDecoratorImpl.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";

let decoratorSingleton: BridgeFlyweightPrototypeManagedCommandDecoratorImpl | null = null;

export class BridgeFlyweightPrototypeManagedCommandDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "BridgeFlyweightPrototypeManagedCommandDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-BFP-DECORATOR-FBF";

  static createDecorator(
    wrappedCommand: IFizzBuzzComputationCommand,
  ): BridgeFlyweightPrototypeManagedCommandDecoratorImpl {
    if (decoratorSingleton === null) {
      decoratorSingleton = new BridgeFlyweightPrototypeManagedCommandDecoratorImpl(wrappedCommand);
    }
    return decoratorSingleton;
  }

  static getDecorator(): BridgeFlyweightPrototypeManagedCommandDecoratorImpl | null {
    return decoratorSingleton;
  }

  static resetDecorator(): void {
    decoratorSingleton = null;
  }

  static getFactoryBeanName(): string {
    return BridgeFlyweightPrototypeManagedCommandDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return BridgeFlyweightPrototypeManagedCommandDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

