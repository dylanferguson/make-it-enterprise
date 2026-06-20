import type { ISpecificationSelectionMediator } from "../contracts/ISpecificationSelectionMediator.js";
import type { ISpecificationProviderStrategy } from "../contracts/ISpecificationProviderStrategy.js";
import type { ISpecificationEnforcementChain } from "../contracts/ISpecificationEnforcementChain.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";

export abstract class AbstractBaseSpecificationSelectionMediator
  implements ISpecificationSelectionMediator
{
  protected readonly providerStrategies: ISpecificationProviderStrategy[];
  protected enforcementChain: ISpecificationEnforcementChain | null;

  constructor() {
    this.providerStrategies = [];
    this.enforcementChain = null;
  }

  abstract getMediatorName(): string;
  abstract getMediatorVersion(): string;

  registerProviderStrategy(strategy: ISpecificationProviderStrategy): void {
    this.providerStrategies.push(strategy);
  }

  registerEnforcementChain(chain: ISpecificationEnforcementChain): void {
    this.enforcementChain = chain;
  }

  abstract mediateSpecificationSelection(
    value: number,
    divisor: number,
  ): boolean;

  protected resolveSpecification(divisor: number): IFizzBuzzSpecification | null {
    for (const strategy of this.providerStrategies) {
      if (strategy.supportsDivisor(divisor)) {
        const specification = strategy.provideSpecification(divisor);
        if (specification !== null) {
          return specification;
        }
      }
    }
    return null;
  }
}
