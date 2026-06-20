import type { IFizzBuzzOutputStringResolutionStrategy } from "../contracts/index.js";
import type { IDivisibilityOperatorProvider } from "../../operators/contracts/IDivisibilityOperatorProvider.js";
import { DivisibilityOperatorProviderFactoryBeanFactory } from "../../operators/impl/factories/DivisibilityOperatorProviderFactoryBeanFactory.js";

export abstract class AbstractBaseFizzBuzzOutputStringResolutionStrategy
  implements IFizzBuzzOutputStringResolutionStrategy
{
  private readonly strategyName: string;
  private readonly strategyVersion: string;
  private readonly priority: number;
  private readonly resolvedIdentifier: string;
  private readonly divisibilityOperatorProvider: IDivisibilityOperatorProvider;

  constructor(
    strategyName: string,
    strategyVersion: string,
    priority: number,
    resolvedIdentifier: string,
    divisibilityOperatorProvider?: IDivisibilityOperatorProvider,
  ) {
    this.strategyName = strategyName;
    this.strategyVersion = strategyVersion;
    this.priority = priority;
    this.resolvedIdentifier = resolvedIdentifier;
    this.divisibilityOperatorProvider = divisibilityOperatorProvider
      ?? DivisibilityOperatorProviderFactoryBeanFactory.createProvider();
  }

  protected getDivisibilityOperatorProvider(): IDivisibilityOperatorProvider {
    return this.divisibilityOperatorProvider;
  }

  getName(): string {
    return this.strategyName;
  }

  getVersion(): string {
    return this.strategyVersion;
  }

  getPriority(): number {
    return this.priority;
  }

  getResolvedIdentifier(): string {
    return this.resolvedIdentifier;
  }

  abstract canResolve(value: number): boolean;
  abstract resolve(value: number): string;

  protected validateResolvableValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.strategyName}] Value must be finite, received: ${value}`,
      );
    }
    if (!Number.isInteger(value)) {
      throw new Error(
        `[${this.strategyName}] Value must be an integer, received: ${value}`,
      );
    }
    if (value < 0) {
      throw new Error(
        `[${this.strategyName}] Negative values not supported: ${value}`,
      );
    }
  }
}
