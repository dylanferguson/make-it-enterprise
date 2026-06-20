import { AbstractBaseFizzBuzzStrategyResolutionChainHandler } from "../../abstracts/AbstractBaseFizzBuzzStrategyResolutionChainHandler.js";
import type { IServiceLocator } from "../../contracts/IServiceLocator.js";

export class ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandlerImpl extends AbstractBaseFizzBuzzStrategyResolutionChainHandler {
  private static readonly HANDLER_NAME = "ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandler";
  private static readonly HANDLER_PRIORITY = 200;
  private static readonly RESOLVED_STRATEGY_TYPE = "SERVICE_LOCATOR_RESOLVED_MODULO_STRATEGY";
  private static readonly STANDARD_DIVISORS = [3, 5, 15];

  private readonly serviceLocator: IServiceLocator;

  constructor(serviceLocator: IServiceLocator) {
    super(
      ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandlerImpl.HANDLER_NAME,
      ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandlerImpl.HANDLER_PRIORITY,
    );
    this.serviceLocator = serviceLocator;
  }

  override handleStrategyResolution(
    value: number,
  ): { resolved: boolean; strategyType: string; divisor: number | null } {
    this.validateOperand(value);

    const strategyProvider = this.serviceLocator.getModuloEvaluationStrategyProvider();
    if (strategyProvider === null) {
      return this.proceedToNext(value);
    }

    for (const divisor of ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandlerImpl.STANDARD_DIVISORS) {
      if (value % divisor === 0) {
        const strategy = strategyProvider.resolveStrategy(divisor);
        if (strategy !== null) {
          return {
            resolved: true,
            strategyType: `${ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandlerImpl.RESOLVED_STRATEGY_TYPE}:${divisor}`,
            divisor,
          };
        }
      }
    }

    return this.proceedToNext(value);
  }

  private validateOperand(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.handlerName}] Value must be finite for strategy resolution, received: ${value}`,
      );
    }
  }
}
