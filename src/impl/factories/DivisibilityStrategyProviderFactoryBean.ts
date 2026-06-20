import type { IDivisibilityStrategyProvider } from "../../contracts/IDivisibilityStrategyProvider.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";
import { ServiceLocatorModuloDivisibilityStrategyProviderImpl } from "../providers/ServiceLocatorModuloDivisibilityStrategyProviderImpl.js";
import { ModuloBasedDivisibilityStrategyResolutionHandler } from "../handlers/ModuloBasedDivisibilityStrategyResolutionHandler.js";
import { CatchAllDivisibilityStrategyResolutionHandler } from "../handlers/CatchAllDivisibilityStrategyResolutionHandler.js";
import { FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory } from "./FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.js";

export class DivisibilityStrategyProviderFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "DivisibilityStrategyProviderFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "2.0.0-ENTERPRISE";

  static createProvider(
    visitor: IFizzBuzzVisitor,
    strategyProvider: IModuloArithmeticStrategyProvider,
  ): IDivisibilityStrategyProvider {
    FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.createResolver();

    const provider = new ServiceLocatorModuloDivisibilityStrategyProviderImpl();

    const moduloHandler = new ModuloBasedDivisibilityStrategyResolutionHandler(
      visitor,
      strategyProvider,
    );
    const catchAllHandler = new CatchAllDivisibilityStrategyResolutionHandler();

    provider.registerResolutionHandler(moduloHandler);
    provider.registerResolutionHandler(catchAllHandler);

    console.debug(
      `[${DivisibilityStrategyProviderFactoryBean.FACTORY_BEAN_NAME}] ServiceLocator-aware provider created with ${provider.getProviderName()} (${provider.getProviderVersion()})`,
    );

    return provider;
  }

  static getFactoryBeanName(): string {
    return DivisibilityStrategyProviderFactoryBean.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return DivisibilityStrategyProviderFactoryBean.FACTORY_BEAN_VERSION;
  }
}
