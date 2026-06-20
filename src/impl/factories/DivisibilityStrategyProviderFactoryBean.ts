import type { IDivisibilityStrategyProvider } from "../../contracts/IDivisibilityStrategyProvider.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";
import { DivisibilityStrategyProviderChainOfResponsibilityImpl } from "../providers/DivisibilityStrategyProviderChainOfResponsibilityImpl.js";
import { ModuloBasedDivisibilityStrategyResolutionHandler } from "../handlers/ModuloBasedDivisibilityStrategyResolutionHandler.js";
import { CatchAllDivisibilityStrategyResolutionHandler } from "../handlers/CatchAllDivisibilityStrategyResolutionHandler.js";

export class DivisibilityStrategyProviderFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "DivisibilityStrategyProviderFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ENTERPRISE";

  static createProvider(
    visitor: IFizzBuzzVisitor,
    strategyProvider: IModuloArithmeticStrategyProvider,
  ): IDivisibilityStrategyProvider {
    const provider = new DivisibilityStrategyProviderChainOfResponsibilityImpl(visitor);

    const moduloHandler = new ModuloBasedDivisibilityStrategyResolutionHandler(
      visitor,
      strategyProvider,
    );
    const catchAllHandler = new CatchAllDivisibilityStrategyResolutionHandler();

    provider.registerResolutionHandler(moduloHandler);
    provider.registerResolutionHandler(catchAllHandler);

    console.debug(
      `[${DivisibilityStrategyProviderFactoryBean.FACTORY_BEAN_NAME}] Provider created with 2 resolution handlers`,
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
