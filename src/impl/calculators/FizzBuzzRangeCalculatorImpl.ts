import { AbstractBaseRangeCalculator } from "../../abstracts/AbstractBaseRangeCalculator.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";

export class FizzBuzzRangeCalculatorImpl extends AbstractBaseRangeCalculator {
  constructor(resolver: ICompositeValueResolver) {
    super(resolver);
  }

  override calculateRange(start: number, end: number): readonly string[] {
    this.validateRange(start, end);
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => this.resolver.resolve(start + index));
  }
}
