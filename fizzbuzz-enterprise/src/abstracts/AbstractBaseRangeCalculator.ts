import type { IRangeCalculator } from "../contracts/IRangeCalculator.js";
import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export abstract class AbstractBaseRangeCalculator implements IRangeCalculator {
  protected readonly resolver: ICompositeValueResolver;

  constructor(resolver: ICompositeValueResolver) {
    this.resolver = resolver;
  }

  abstract calculateRange(start: number, end: number): readonly string[];

  getResolver(): ICompositeValueResolver {
    return this.resolver;
  }

  protected validateRange(start: number, end: number): void {
    if (!Number.isInteger(start)) {
      throw new Error(`Start must be an integer, received: ${start}`);
    }
    if (!Number.isInteger(end)) {
      throw new Error(`End must be an integer, received: ${end}`);
    }
    if (start > end) {
      throw new Error(`Start (${start}) must not exceed end (${end})`);
    }
  }
}
