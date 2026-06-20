import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "./IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";

export interface IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry {
  registerStrategy(
    name: string,
    strategy: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy,
  ): void;
  unregisterStrategy(name: string): boolean;
  getStrategy(name: string): IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy | null;
  getAllStrategies(): Map<string, IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy>;
  getRegistryName(): string;
  getRegistryVersion(): string;
  getRegisteredStrategyCount(): number;
}
