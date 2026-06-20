import type { IDivisibilitySpecificationStrategy } from "../contracts/IDivisibilitySpecificationStrategy.js";

export abstract class AbstractBaseDivisibilitySpecificationStrategy implements IDivisibilitySpecificationStrategy {
  private static readonly DEFAULT_SPECIFICATION_VENDOR = "EnterpriseDivisibilitySpecificationGroup";

  abstract isSatisfiedBy(value: number): boolean;
  abstract getSpecificationName(): string;
  abstract getSpecificationVersion(): string;
  abstract getSpecificationDivisor(): number;

  getSpecificationVendor(): string {
    return AbstractBaseDivisibilitySpecificationStrategy.DEFAULT_SPECIFICATION_VENDOR;
  }

  protected validateOperand(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.getSpecificationName()}] Specification operand must be finite, received: ${value}`,
      );
    }
  }
}
