import type { IDivisibilitySpecificationRegistrationService } from "../contracts/IDivisibilitySpecificationRegistrationService.js";
import type { IDivisibilitySpecificationRegistry } from "../contracts/IDivisibilitySpecificationRegistry.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";

export abstract class AbstractBaseDivisibilitySpecificationRegistrationService
  implements IDivisibilitySpecificationRegistrationService
{
  protected readonly registry: IDivisibilitySpecificationRegistry;

  constructor(registry: IDivisibilitySpecificationRegistry) {
    this.registry = registry;
  }

  abstract getRegistrationServiceName(): string;
  abstract getRegistrationServiceVersion(): string;

  registerSpecificationForDivisor(
    divisor: number,
    specification: IFizzBuzzSpecification,
  ): void {
    this.registry.registerDivisibilitySpecification(divisor, specification);
  }

  abstract registerDefaultSpecifications(): void;

  getUnderlyingRegistry(): IDivisibilitySpecificationRegistry {
    return this.registry;
  }
}
