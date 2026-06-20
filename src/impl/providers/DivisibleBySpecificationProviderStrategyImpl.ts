import { AbstractBaseSpecificationProviderStrategy } from "../../abstracts/AbstractBaseSpecificationProviderStrategy.js";
import type { IFizzBuzzSpecification } from "../../contracts/IFizzBuzzSpecification.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";
import { DivisibleBySpecification } from "../specifications/DivisibleBySpecification.js";

export class DivisibleBySpecificationProviderStrategyImpl extends AbstractBaseSpecificationProviderStrategy {
  private static readonly STRATEGY_NAME = "DivisibleBySpecificationProviderStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-SPECIFICATION-PROVIDER-STRATEGY";
  private static readonly SUPPORTED_DIVISORS = [3, 5, 15];

  private readonly divisibilityEvaluator: IDivisibilityEvaluator;

  constructor(divisibilityEvaluator: IDivisibilityEvaluator) {
    super();
    this.divisibilityEvaluator = divisibilityEvaluator;
  }

  override provideSpecification(divisor: number): IFizzBuzzSpecification | null {
    this.validateDivisor(divisor);
    if (!this.supportsDivisor(divisor)) {
      return null;
    }
    return new DivisibleBySpecification(divisor, this.divisibilityEvaluator);
  }

  override supportsDivisor(divisor: number): boolean {
    return DivisibleBySpecificationProviderStrategyImpl.SUPPORTED_DIVISORS.includes(divisor);
  }

  override getProviderStrategyName(): string {
    return DivisibleBySpecificationProviderStrategyImpl.STRATEGY_NAME;
  }

  override getProviderStrategyVersion(): string {
    return DivisibleBySpecificationProviderStrategyImpl.STRATEGY_VERSION;
  }
}
