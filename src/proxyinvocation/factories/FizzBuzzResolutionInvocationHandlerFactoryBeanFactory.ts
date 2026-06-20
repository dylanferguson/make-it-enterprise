import type { IFizzBuzzResolutionInvocationHandler } from "../contracts/IFizzBuzzResolutionInvocationHandler.js";
import { StandardFizzBuzzResolutionInvocationHandlerImpl } from "../impl/StandardFizzBuzzResolutionInvocationHandlerImpl.js";

export class FizzBuzzResolutionInvocationHandlerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "FizzBuzzResolutionInvocationHandlerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-INVOCATION-HANDLER-FBF";

  private static handlerSingleton: StandardFizzBuzzResolutionInvocationHandlerImpl | null = null;

  static createHandler(): StandardFizzBuzzResolutionInvocationHandlerImpl {
    if (
      FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.handlerSingleton === null
    ) {
      FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.handlerSingleton =
        new StandardFizzBuzzResolutionInvocationHandlerImpl();

      console.debug(
        `[${FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.FACTORY_BEAN_NAME} v${FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Resolution invocation handler created: ` +
        `handler=[${FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.handlerSingleton.getHandlerName()} v${FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.handlerSingleton.getHandlerVersion()}]`,
      );
    }
    return FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.handlerSingleton;
  }

  static getHandler(): IFizzBuzzResolutionInvocationHandler | null {
    return FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.handlerSingleton;
  }

  static isHandlerInitialized(): boolean {
    return FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.handlerSingleton !== null;
  }

  static resetHandler(): void {
    FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.handlerSingleton = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzResolutionInvocationHandlerFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
