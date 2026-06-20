import type { IFizzBuzzEnterpriseServiceFacade } from "../contracts/IFizzBuzzEnterpriseServiceFacade.js";

export abstract class AbstractBaseFizzBuzzEnterpriseServiceFacade implements IFizzBuzzEnterpriseServiceFacade {
  abstract resolveEnterpriseValue(value: number): string;
  abstract calculateEnterpriseRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;

  protected validateFacadeValue(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(`[FizzBuzzEnterpriseServiceFacade] Invalid value: ${value}`);
    }
  }

  protected getFacadeFrameworkVersion(): string {
    return "1.0.0-ENTERPRISE";
  }
}
