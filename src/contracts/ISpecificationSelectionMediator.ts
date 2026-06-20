import type { ISpecificationProviderStrategy } from "./ISpecificationProviderStrategy.js";
import type { ISpecificationEnforcementChain } from "./ISpecificationEnforcementChain.js";

export interface ISpecificationSelectionMediator {
  mediateSpecificationSelection(
    value: number,
    divisor: number,
  ): boolean;
  registerProviderStrategy(
    strategy: ISpecificationProviderStrategy,
  ): void;
  registerEnforcementChain(
    chain: ISpecificationEnforcementChain,
  ): void;
  getMediatorName(): string;
  getMediatorVersion(): string;
}
