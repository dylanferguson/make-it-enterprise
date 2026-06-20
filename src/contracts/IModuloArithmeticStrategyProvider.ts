import type { IModuloArithmeticStrategy } from "./IModuloArithmeticStrategy.js";

export interface IModuloArithmeticStrategyProvider {
  getStrategy(): IModuloArithmeticStrategy;
  getStrategyForDivisor(divisor: number): IModuloArithmeticStrategy;
  registerStrategy(divisor: number, strategy: IModuloArithmeticStrategy): void;
}
