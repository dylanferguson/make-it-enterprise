import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export class ValidatingValueResolverDecorator implements ICompositeValueResolver {
  private readonly decorated: ICompositeValueResolver;
  private readonly minValue: number;
  private readonly maxValue: number;

  constructor(decorated: ICompositeValueResolver, minValue: number = 0, maxValue: number = Number.MAX_SAFE_INTEGER) {
    this.decorated = decorated;
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  resolve(value: number): string {
    this.validateValue(value);
    return this.decorated.resolve(value);
  }

  private validateValue(value: number): void {
    if (!Number.isInteger(value)) {
      throw new Error(`[ValidatingDecorator] Value must be an integer, received: ${value}`);
    }
    if (value < this.minValue) {
      throw new Error(`[ValidatingDecorator] Value ${value} is below minimum ${this.minValue}`);
    }
    if (value > this.maxValue) {
      throw new Error(`[ValidatingDecorator] Value ${value} exceeds maximum ${this.maxValue}`);
    }
  }
}
