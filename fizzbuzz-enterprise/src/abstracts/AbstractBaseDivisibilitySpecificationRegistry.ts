import type { IDivisibilitySpecificationRegistry } from "../contracts/IDivisibilitySpecificationRegistry.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";

export abstract class AbstractBaseDivisibilitySpecificationRegistry
  implements IDivisibilitySpecificationRegistry
{
  protected readonly specificationRegistry: Map<number, IFizzBuzzSpecification>;

  constructor() {
    this.specificationRegistry = new Map<number, IFizzBuzzSpecification>();
  }

  abstract getRegistryName(): string;
  abstract getRegistryVersion(): string;

  registerDivisibilitySpecification(
    divisor: number,
    specification: IFizzBuzzSpecification,
  ): void {
    if (!Number.isFinite(divisor) || divisor <= 0) {
      throw new Error(
        `[${this.getRegistryName()}] Invalid divisor for specification registration: ${divisor}`,
      );
    }
    this.specificationRegistry.set(divisor, specification);
  }

  resolveDivisibilitySpecification(
    divisor: number,
  ): IFizzBuzzSpecification | null {
    return this.specificationRegistry.get(divisor) ?? null;
  }

  getRegisteredDivisors(): readonly number[] {
    return Array.from(this.specificationRegistry.keys());
  }

  protected clearRegistry(): void {
    this.specificationRegistry.clear();
  }
}
