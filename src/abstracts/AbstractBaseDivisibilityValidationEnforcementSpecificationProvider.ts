import type { IDivisibilityValidationEnforcementSpecificationProvider } from "../contracts/IDivisibilityValidationEnforcementSpecificationProvider.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";

export abstract class AbstractBaseDivisibilityValidationEnforcementSpecificationProvider
  implements IDivisibilityValidationEnforcementSpecificationProvider
{
  protected static readonly DEFAULT_SPECIFICATION_CATEGORY = "PRIMARY_VALIDATION";
  protected static readonly FALLBACK_SPECIFICATION_CATEGORY = "FALLBACK_VALIDATION";

  protected readonly specificationRegistry: Map<string, IFizzBuzzSpecification>;

  constructor() {
    this.specificationRegistry = new Map<string, IFizzBuzzSpecification>();
  }

  abstract getProviderName(): string;
  abstract getProviderVersion(): string;
  abstract resolveValidationSpecification(
    divisor: number,
    specificationCategory: string,
  ): IFizzBuzzSpecification;
  abstract registerValidationSpecification(
    divisor: number,
    specificationCategory: string,
    specification: IFizzBuzzSpecification,
  ): void;

  getRegisteredSpecificationCategories(): readonly string[] {
    return Array.from(this.specificationRegistry.keys());
  }

  protected buildSpecificationRegistryKey(
    divisor: number,
    specificationCategory: string,
  ): string {
    return `spec:${divisor}:${specificationCategory}`;
  }

  protected getDefaultSpecificationCategory(): string {
    return AbstractBaseDivisibilityValidationEnforcementSpecificationProvider.DEFAULT_SPECIFICATION_CATEGORY;
  }

  protected getFallbackSpecificationCategory(): string {
    return AbstractBaseDivisibilityValidationEnforcementSpecificationProvider.FALLBACK_SPECIFICATION_CATEGORY;
  }

  protected getSpecificationCount(): number {
    return this.specificationRegistry.size;
  }
}
