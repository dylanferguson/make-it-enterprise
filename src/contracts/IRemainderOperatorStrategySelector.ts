import type { IModuloArithmeticStrategy } from "./IModuloArithmeticStrategy.js";

export interface IRemainderOperatorStrategySelector {
  selectArithmeticStrategy(divisor: number): IModuloArithmeticStrategy;
  getSelectorName(): string;
  getSelectorVersion(): string;
}
