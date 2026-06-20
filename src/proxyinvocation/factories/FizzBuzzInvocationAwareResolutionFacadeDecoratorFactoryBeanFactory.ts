import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionInvocationHandler } from "../contracts/IFizzBuzzResolutionInvocationHandler.js";
import type { IFizzBuzzResolutionProxyFactory } from "../contracts/IFizzBuzzResolutionProxyFactory.js";
import type { IInvocationAwareResolutionFacadeDecorator } from "../contracts/IInvocationAwareResolutionFacadeDecorator.js";
import { StandardInvocationAwareResolutionFacadeDecoratorImpl } from "../impl/StandardInvocationAwareResolutionFacadeDecoratorImpl.js";
import { FizzBuzzResolutionInvocationHandlerFactoryBeanFactory } from "./FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.js";
import { FizzBuzzResolutionProxyFactoryFactoryBeanFactory } from "./FizzBuzzResolutionProxyFactoryFactoryBeanFactory.js";

export class FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-INVOCATION-AWARE-DECORATOR-FBF";

  private static decoratorSingleton: StandardInvocationAwareResolutionFacadeDecoratorImpl | null = null;

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    proxyInvocationEnabled: boolean = true,
  ): IInvocationAwareResolutionFacadeDecorator {
    if (
      FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton === null
    ) {
      const handler: IFizzBuzzResolutionInvocationHandler =
        FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.createHandler();
      const proxyFactory: IFizzBuzzResolutionProxyFactory =
        FizzBuzzResolutionProxyFactoryFactoryBeanFactory.createProxyFactory();

      FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton =
        new StandardInvocationAwareResolutionFacadeDecoratorImpl(
          wrappedFacade,
          handler,
          proxyFactory,
          proxyInvocationEnabled,
        );

      console.debug(
        `[${FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Invocation-aware resolution facade decorator created: ` +
        `decorator=[${FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton.getDecoratorName()} v${FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton.getDecoratorVersion()}], ` +
        `handler=[${handler.getHandlerName()} v${handler.getHandlerVersion()}], ` +
        `proxyFactory=[${proxyFactory.getFactoryName()} v${proxyFactory.getFactoryVersion()}], ` +
        `proxyInvocationEnabled=[${proxyInvocationEnabled}], ` +
        `wrappedFacade=[${wrappedFacade.getFacadeName()}]`,
      );
    }
    return FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton;
  }

  static getDecorator(): IInvocationAwareResolutionFacadeDecorator | null {
    return FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton;
  }

  static isDecoratorInitialized(): boolean {
    return FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton !== null;
  }

  static resetDecorator(): void {
    FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzInvocationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
