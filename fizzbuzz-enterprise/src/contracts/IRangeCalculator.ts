import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";

export interface IRangeCalculator {
  calculateRange(start: number, end: number): readonly string[];
  getResolver(): ICompositeValueResolver;
}
