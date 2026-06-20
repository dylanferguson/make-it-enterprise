import type { IEnterpriseFizzBuzzResultValidationSpecificationRegistry } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationRegistry.js";
import type { IEnterpriseFizzBuzzResultValidationSpecification } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecification.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl
  implements IEnterpriseFizzBuzzResultValidationSpecificationRegistry
{
  private readonly _registryName: string;
  private readonly _registryVersion: string;
  private readonly _specifications: Map<string, IEnterpriseFizzBuzzResultValidationSpecification> = new Map();
  private _active: boolean;

  constructor(
    registryName: string,
    registryVersion: string,
    initiallyActive: boolean = true,
  ) {
    this._registryName = registryName;
    this._registryVersion = registryVersion;
    this._active = initiallyActive;
  }

  getRegistryName(): string {
    return this._registryName;
  }

  getRegistryVersion(): string {
    return this._registryVersion;
  }

  registerSpecification(specification: IEnterpriseFizzBuzzResultValidationSpecification): void {
    this._specifications.set(specification.getSpecificationName(), specification);
  }

  unregisterSpecification(specificationName: string): boolean {
    return this._specifications.delete(specificationName);
  }

  resolveSpecification(specificationName: string): IEnterpriseFizzBuzzResultValidationSpecification | null {
    return this._specifications.get(specificationName) ?? null;
  }

  resolveSpecificationsByPriority(): readonly IEnterpriseFizzBuzzResultValidationSpecification[] {
    return [...this._specifications.values()].sort(
      (a, b) => b.getValidationPriority() - a.getValidationPriority(),
    );
  }

  getRegisteredSpecificationNames(): readonly string[] {
    return Array.from(this._specifications.keys());
  }

  getRegisteredSpecificationCount(): number {
    return this._specifications.size;
  }

  validateResult(value: number, computedResult: string): { valid: boolean; failures: readonly string[] } {
    const failures: string[] = [];
    const sorted = this.resolveSpecificationsByPriority();
    for (const spec of sorted) {
      if (!spec.isResultValid(value, computedResult)) {
        failures.push(spec.getFailureCode());
      }
    }
    return { valid: failures.length === 0, failures };
  }

  isRegistryActive(): boolean {
    return this._active;
  }

  setActive(active: boolean): void {
    this._active = active;
  }
}
