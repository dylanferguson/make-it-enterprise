import type { IDivisibilitySpecificationStrategy } from "../contracts/IDivisibilitySpecificationStrategy.js";
import type { IDivisibilitySpecificationRegistry } from "../contracts/IDivisibilitySpecificationRegistry.js";

export abstract class AbstractBaseDivisibilitySpecificationRegistry implements IDivisibilitySpecificationRegistry {
  protected readonly specifications: Map<string, IDivisibilitySpecificationStrategy> = new Map();
  protected readonly divisorToName: Map<number, string> = new Map();
  protected initialized: boolean = false;

  abstract getRegistryName(): string;
  abstract getRegistryVersion(): string;

  registerSpecification(name: string, specification: IDivisibilitySpecificationStrategy): void {
    this.specifications.set(name, specification);
    this.divisorToName.set(specification.getSpecificationDivisor(), name);
  }

  getSpecification(name: string): IDivisibilitySpecificationStrategy | null {
    return this.specifications.get(name) ?? null;
  }

  getRegisteredSpecificationNames(): readonly string[] {
    return Array.from(this.specifications.keys());
  }

  getSpecificationForDivisor(divisor: number): IDivisibilitySpecificationStrategy | null {
    const name = this.divisorToName.get(divisor);
    if (name === undefined) return null;
    return this.specifications.get(name) ?? null;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  protected markInitialized(): void {
    this.initialized = true;
  }
}
