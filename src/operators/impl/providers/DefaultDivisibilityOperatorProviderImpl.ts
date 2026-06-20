import { AbstractBaseDivisibilityOperatorProvider } from "../../abstracts/AbstractBaseDivisibilityOperatorProvider.js";
import type { IDivisibilityOperator } from "../../contracts/IDivisibilityOperator.js";
import { DivisibilityOperatorFactoryImpl } from "../factories/DivisibilityOperatorFactoryImpl.js";

export class DefaultDivisibilityOperatorProviderImpl extends AbstractBaseDivisibilityOperatorProvider {
  private static readonly PROVIDER_NAME = "DefaultDivisibilityOperatorProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-DEFAULT-OPERATOR-PROVIDER";

  private readonly defaultOperator: IDivisibilityOperator;

  constructor() {
    super(
      DefaultDivisibilityOperatorProviderImpl.PROVIDER_NAME,
      DefaultDivisibilityOperatorProviderImpl.PROVIDER_VERSION,
    );
    const defaultFactory = new DivisibilityOperatorFactoryImpl();
    this.registerFactory(defaultFactory);
    this.defaultOperator = defaultFactory.createOperator();
  }

  override resolveOperator(): IDivisibilityOperator {
    return this.defaultOperator;
  }

  override resolveOperatorForDivisor(divisor: number): IDivisibilityOperator {
    const cached = this.getFromCache(divisor);
    if (cached !== undefined) {
      return cached;
    }
    const operator = this.buildOperatorFromChain(divisor);
    this.cacheOperator(divisor, operator);
    return operator;
  }
}
