import type { IModuloArithmeticStrategy } from "../contracts/IModuloArithmeticStrategy.js";
import type { IModuloArithmeticStrategyProvider } from "../contracts/IModuloArithmeticStrategyProvider.js";

export abstract class AbstractBaseModuloArithmeticStrategyProvider implements IModuloArithmeticStrategyProvider {
  protected readonly strategyRegistry: Map<number, IModuloArithmeticStrategy> = new Map();
  protected defaultStrategy: IModuloArithmeticStrategy | null = null;

  abstract getStrategy(): IModuloArithmeticStrategy;
  abstract getStrategyForDivisor(divisor: number): IModuloArithmeticStrategy;
  abstract registerStrategy(divisor: number, strategy: IModuloArithmeticStrategy): void;

  protected getDefaultStrategy(): IModuloArithmeticStrategy {
    if (this.defaultStrategy === null) {
      throw new Error("No default strategy has been configured in the provider");
    }
    return this.defaultStrategy;
  }

  protected setDefaultStrategy(strategy: IModuloArithmeticStrategy): void {
    this.defaultStrategy = strategy;
  }
}
