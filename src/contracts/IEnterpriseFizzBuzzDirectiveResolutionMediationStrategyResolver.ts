import type { IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy } from "./IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy.js";

export interface IEnterpriseFizzBuzzDirectiveResolutionMediationStrategyResolver {
  resolveStrategy(
    directiveType: string,
    value: number,
  ): IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy | null;
  registerStrategy(
    name: string,
    strategy: IEnterpriseFizzBuzzDirectiveResolutionMediationStrategy,
  ): void;
  getResolverName(): string;
  getResolverVersion(): string;
}
