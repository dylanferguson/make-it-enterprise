import type { ISpecificationProviderStrategy } from "../contracts/ISpecificationProviderStrategy.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";

export abstract class AbstractBaseSpecificationProviderStrategy
  implements ISpecificationProviderStrategy
{
  abstract getProviderStrategyName(): string;
  abstract getProviderStrategyVersion(): string;
  abstract supportsDivisor(divisor: number): boolean;
  abstract provideSpecification(divisor: number): IFizzBuzzSpecification | null;

  protected validateDivisor(divisor: number): void {
    if (!Number.isFinite(divisor) || divisor <= 0) {
      throw new Error(
        `[${this.getProviderStrategyName()}] Invalid divisor: ${divisor}`,
      );
    }
  }
}
