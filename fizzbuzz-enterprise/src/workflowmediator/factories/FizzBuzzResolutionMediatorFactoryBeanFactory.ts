import type { IFizzBuzzResolutionMediator } from "../contracts/IFizzBuzzResolutionMediator.js";
import { StandardFizzBuzzResolutionMediatorImpl } from "../impl/StandardFizzBuzzResolutionMediatorImpl.js";

export class FizzBuzzResolutionMediatorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "FizzBuzzResolutionMediatorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-MEDIATOR-FACTORY-BEAN-FACTORY";

  private static mediatorSingleton: IFizzBuzzResolutionMediator | null = null;

  static createMediator(): IFizzBuzzResolutionMediator {
    if (FizzBuzzResolutionMediatorFactoryBeanFactory.mediatorSingleton === null) {
      FizzBuzzResolutionMediatorFactoryBeanFactory.mediatorSingleton =
        new StandardFizzBuzzResolutionMediatorImpl();
    }
    return FizzBuzzResolutionMediatorFactoryBeanFactory.mediatorSingleton;
  }

  static getMediator(): IFizzBuzzResolutionMediator | null {
    return FizzBuzzResolutionMediatorFactoryBeanFactory.mediatorSingleton;
  }

  static isMediatorInitialized(): boolean {
    return FizzBuzzResolutionMediatorFactoryBeanFactory.mediatorSingleton !== null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzResolutionMediatorFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzResolutionMediatorFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}
