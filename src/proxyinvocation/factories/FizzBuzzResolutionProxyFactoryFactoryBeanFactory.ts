import type { IFizzBuzzResolutionProxyFactory } from "../contracts/IFizzBuzzResolutionProxyFactory.js";
import { StandardFizzBuzzResolutionProxyFactoryImpl } from "../impl/StandardFizzBuzzResolutionProxyFactoryImpl.js";

export class FizzBuzzResolutionProxyFactoryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "FizzBuzzResolutionProxyFactoryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PROXY-FACTORY-FBF";

  private static proxyFactorySingleton: StandardFizzBuzzResolutionProxyFactoryImpl | null = null;

  static createProxyFactory(): StandardFizzBuzzResolutionProxyFactoryImpl {
    if (
      FizzBuzzResolutionProxyFactoryFactoryBeanFactory.proxyFactorySingleton === null
    ) {
      FizzBuzzResolutionProxyFactoryFactoryBeanFactory.proxyFactorySingleton =
        new StandardFizzBuzzResolutionProxyFactoryImpl();

      console.debug(
        `[${FizzBuzzResolutionProxyFactoryFactoryBeanFactory.FACTORY_BEAN_NAME} v${FizzBuzzResolutionProxyFactoryFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Resolution proxy factory created: ` +
        `factory=[${FizzBuzzResolutionProxyFactoryFactoryBeanFactory.proxyFactorySingleton.getFactoryName()} v${FizzBuzzResolutionProxyFactoryFactoryBeanFactory.proxyFactorySingleton.getFactoryVersion()}]`,
      );
    }
    return FizzBuzzResolutionProxyFactoryFactoryBeanFactory.proxyFactorySingleton;
  }

  static getProxyFactory(): IFizzBuzzResolutionProxyFactory | null {
    return FizzBuzzResolutionProxyFactoryFactoryBeanFactory.proxyFactorySingleton;
  }

  static isProxyFactoryInitialized(): boolean {
    return FizzBuzzResolutionProxyFactoryFactoryBeanFactory.proxyFactorySingleton !== null;
  }

  static resetProxyFactory(): void {
    FizzBuzzResolutionProxyFactoryFactoryBeanFactory.proxyFactorySingleton = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzResolutionProxyFactoryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzResolutionProxyFactoryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
