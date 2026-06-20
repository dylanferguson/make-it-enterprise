import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IMediatorAwareResolutionFacadeDecorator } from "../contracts/IMediatorAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzResolutionMediator } from "../contracts/IFizzBuzzResolutionMediator.js";
import { StandardMediatorAwareResolutionFacadeDecoratorImpl } from "../impl/StandardMediatorAwareResolutionFacadeDecoratorImpl.js";

export class MediatorAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "MediatorAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-MEDIATOR-DECORATOR-FACTORY-BEAN-FACTORY";

  private static decoratorSingleton: IMediatorAwareResolutionFacadeDecorator | null = null;

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    mediator: IFizzBuzzResolutionMediator,
    decoratorEnabled: boolean,
    useSingleton: boolean = true,
  ): IMediatorAwareResolutionFacadeDecorator {
    if (useSingleton && MediatorAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton !== null) {
      return MediatorAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton;
    }
    const decorator = new StandardMediatorAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      mediator,
      decoratorEnabled,
    );
    if (useSingleton) {
      MediatorAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton = decorator;
    }
    return decorator;
  }

  static getDecorator(): IMediatorAwareResolutionFacadeDecorator | null {
    return MediatorAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton;
  }

  static getFactoryBeanName(): string {
    return MediatorAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return MediatorAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}
