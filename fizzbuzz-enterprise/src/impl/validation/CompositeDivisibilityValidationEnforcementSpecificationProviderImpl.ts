import { AbstractBaseDivisibilityValidationEnforcementSpecificationProvider } from "../../abstracts/AbstractBaseDivisibilityValidationEnforcementSpecificationProvider.js";
import type { IFizzBuzzSpecification } from "../../contracts/IFizzBuzzSpecification.js";

export class CompositeDivisibilityValidationEnforcementSpecificationProviderImpl
  extends AbstractBaseDivisibilityValidationEnforcementSpecificationProvider
{
  private static readonly PROVIDER_NAME = "CompositeDivisibilityValidationEnforcementSpecificationProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-COMPOSITE-SPECIFICATION-PROVIDER";

  constructor() {
    super();
  }

  override getProviderName(): string {
    return CompositeDivisibilityValidationEnforcementSpecificationProviderImpl.PROVIDER_NAME;
  }

  override getProviderVersion(): string {
    return CompositeDivisibilityValidationEnforcementSpecificationProviderImpl.PROVIDER_VERSION;
  }

  override resolveValidationSpecification(
    divisor: number,
    specificationCategory: string,
  ): IFizzBuzzSpecification {
    const key = this.buildSpecificationRegistryKey(divisor, specificationCategory);
    const specification = this.specificationRegistry.get(key);
    if (specification === undefined) {
      const defaultKey = this.buildSpecificationRegistryKey(
        divisor,
        this.getDefaultSpecificationCategory(),
      );
      return this.specificationRegistry.get(defaultKey) ?? null as unknown as IFizzBuzzSpecification;
    }
    return specification;
  }

  override registerValidationSpecification(
    divisor: number,
    specificationCategory: string,
    specification: IFizzBuzzSpecification,
  ): void {
    const key = this.buildSpecificationRegistryKey(divisor, specificationCategory);
    this.specificationRegistry.set(key, specification);
  }

  getRegisteredDivisorCount(): number {
    return this.specificationRegistry.size;
  }

  clearRegistry(): void {
    this.specificationRegistry.clear();
  }
}
