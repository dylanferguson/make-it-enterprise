import type { IEnterpriseDivisibilityResolutionFacade } from "../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export abstract class AbstractBaseEnterpriseDivisibilityResolutionFacade implements IEnterpriseDivisibilityResolutionFacade {
  abstract isDivisible(dividend: number, divisor: number): boolean;
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getResolutionStrategyDescription(): string;

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(`[${this.getFacadeName()}] Dividend must be a finite number, received: ${dividend}`);
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(`[${this.getFacadeName()}] Divisor must be a finite number, received: ${divisor}`);
    }
    if (divisor === 0) {
      throw new Error(`[${this.getFacadeName()}] Divisor must not be zero`);
    }
  }
}
