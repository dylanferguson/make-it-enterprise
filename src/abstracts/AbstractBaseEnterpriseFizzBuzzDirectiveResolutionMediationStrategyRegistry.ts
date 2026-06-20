import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry.js";
import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry
  implements IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry
{
  private static readonly REGISTRY_FRAMEWORK_VERSION = "1.0.0-MEDIATION-STRATEGY-REGISTRY-FRAMEWORK";

  protected readonly strategies: Map<string, IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy>;

  constructor() {
    this.strategies = new Map();
  }

  abstract getRegistryName(): string;
  abstract getRegistryVersion(): string;

  registerStrategy(
    name: string,
    strategy: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy,
  ): void {
    this.strategies.set(name, strategy);
  }

  unregisterStrategy(name: string): boolean {
    return this.strategies.delete(name);
  }

  getStrategy(name: string): IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy | null {
    return this.strategies.get(name) ?? null;
  }

  getAllStrategies(): Map<string, IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy> {
    return new Map(this.strategies);
  }

  getRegisteredStrategyCount(): number {
    return this.strategies.size;
  }

  protected getRegistryFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry.REGISTRY_FRAMEWORK_VERSION;
  }
}
