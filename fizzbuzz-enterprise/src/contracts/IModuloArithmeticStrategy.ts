export interface IModuloArithmeticStrategy {
  computeModulo(dividend: number, divisor: number): number;
  getArithmeticStrategyName(): string;
}
