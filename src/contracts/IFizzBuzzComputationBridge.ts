import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";
import type { IRangeCalculator } from "./IRangeCalculator.js";

export interface IFizzBuzzComputationBridge {
  resolveValue(value: number): string;
  calculateRange(start: number, end: number): readonly string[];
  getBridgeName(): string;
  getBridgeVersion(): string;
  getValueResolver(): ICompositeValueResolver;
  getRangeCalculator(): IRangeCalculator;
}
