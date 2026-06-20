import type { ISpecificationBasedDivisibilityResolutionHandler } from "../contracts/ISpecificationBasedDivisibilityResolutionHandler.js";
import type { IDivisibilitySpecificationRegistry } from "../contracts/IDivisibilitySpecificationRegistry.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";

export abstract class AbstractBaseSpecificationBasedDivisibilityResolutionHandler
  implements ISpecificationBasedDivisibilityResolutionHandler
{
  protected readonly registry: IDivisibilitySpecificationRegistry;

  constructor(registry: IDivisibilitySpecificationRegistry) {
    this.registry = registry;
  }

  abstract getHandlerName(): string;
  abstract getHandlerVersion(): string;

  resolveDivisibilityBySpecification(
    dividend: number,
    divisor: number,
  ): boolean {
    const specification = this.registry.resolveDivisibilitySpecification(divisor);
    if (specification !== null) {
      return specification.isSatisfiedBy(dividend);
    }
    const resolvedSpecification = this.resolveSpecificationFallback(divisor);
    if (resolvedSpecification !== null) {
      return resolvedSpecification.isSatisfiedBy(dividend);
    }
    return this.defaultDivisibilityCheck(dividend, divisor);
  }

  getUnderlyingSpecification(divisor: number): IFizzBuzzSpecification | null {
    return this.registry.resolveDivisibilitySpecification(divisor);
  }

  protected abstract resolveSpecificationFallback(
    divisor: number,
  ): IFizzBuzzSpecification | null;

  protected abstract defaultDivisibilityCheck(
    dividend: number,
    divisor: number,
  ): boolean;
}
