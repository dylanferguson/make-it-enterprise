import { AbstractBaseFizzBuzzSpecification } from "../../abstracts/AbstractBaseFizzBuzzSpecification.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";

export class DivisibleBySpecification extends AbstractBaseFizzBuzzSpecification {
  private readonly divisor: number;
  private readonly divisibilityEvaluator: IDivisibilityEvaluator;

  constructor(divisor: number, divisibilityEvaluator: IDivisibilityEvaluator) {
    super();
    this.divisor = divisor;
    this.divisibilityEvaluator = divisibilityEvaluator;
  }

  override isSatisfiedBy(value: number): boolean {
    return this.divisibilityEvaluator.isDivisible(value, this.divisor);
  }

  override getSpecificationName(): string {
    return `DivisibleBy${this.divisor}Specification`;
  }

  getDivisor(): number {
    return this.divisor;
  }
}
