import type { IDivisibilityOperatorProvider } from "../contracts/IDivisibilityOperatorProvider.js";
import type { IDivisibilityOperatorFactory } from "../contracts/IDivisibilityOperatorFactory.js";
import type { IDivisibilityOperator } from "../contracts/IDivisibilityOperator.js";

export abstract class AbstractBaseDivisibilityOperatorProvider implements IDivisibilityOperatorProvider {
  private static readonly DEFAULT_PROVIDER_NAME = "AbstractBaseDivisibilityOperatorProvider";
  private static readonly DEFAULT_PROVIDER_VERSION = "1.0.0-BASE-OPERATOR-PROVIDER";

  private readonly providerName: string;
  private readonly providerVersion: string;
  protected readonly factories: IDivisibilityOperatorFactory[] = [];
  private readonly operatorCache: Map<number, IDivisibilityOperator> = new Map();

  constructor(
    providerName: string = AbstractBaseDivisibilityOperatorProvider.DEFAULT_PROVIDER_NAME,
    providerVersion: string = AbstractBaseDivisibilityOperatorProvider.DEFAULT_PROVIDER_VERSION,
  ) {
    this.providerName = providerName;
    this.providerVersion = providerVersion;
  }

  getProviderName(): string {
    return this.providerName;
  }

  getProviderVersion(): string {
    return this.providerVersion;
  }

  abstract resolveOperator(): IDivisibilityOperator;
  abstract resolveOperatorForDivisor(divisor: number): IDivisibilityOperator;

  getRegisteredFactoryCount(): number {
    return this.factories.length;
  }

  registerFactory(factory: IDivisibilityOperatorFactory): void {
    this.factories.push(factory);
    this.operatorCache.clear();
  }

  protected getFromCache(divisor: number): IDivisibilityOperator | undefined {
    return this.operatorCache.get(divisor);
  }

  protected cacheOperator(divisor: number, operator: IDivisibilityOperator): void {
    this.operatorCache.set(divisor, operator);
  }

  protected buildOperatorFromChain(divisor: number): IDivisibilityOperator {
    for (const factory of this.factories) {
      const operator = factory.createOperatorWithContext(`divisor:${divisor}`);
      if (operator !== null) {
        return operator;
      }
    }
    if (this.factories.length > 0) {
      return this.factories[0]!.createOperator();
    }
    throw new Error(
      `[${this.providerName}] No divisibility operator factories registered to handle divisor=${divisor}`,
    );
  }
}
