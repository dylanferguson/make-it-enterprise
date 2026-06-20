import { AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator } from "../../abstracts/AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export class AuditTrailDivisibilityResolutionFacadeDecoratorImpl
  extends AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "AuditTrailDivisibilityResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-DIVISIBILITY-DECORATOR";

  private readonly auditLog: Array<{
    dividend: number;
    divisor: number;
    result: boolean;
    timestamp: Date;
  }> = [];

  constructor(wrappedFacade: IEnterpriseDivisibilityResolutionFacade) {
    super(wrappedFacade);
  }

  override isDivisible(dividend: number, divisor: number): boolean {
    const result = this.wrappedFacade.isDivisible(dividend, divisor);
    this.auditLog.push({
      dividend,
      divisor,
      result,
      timestamp: new Date(),
    });
    return result;
  }

  override getFacadeName(): string {
    return `${AuditTrailDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return AuditTrailDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getResolutionStrategyDescription(): string {
    return `Audit-trail wrapper around: ${this.wrappedFacade.getResolutionStrategyDescription()}`;
  }

  override getDecoratorName(): string {
    return AuditTrailDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return AuditTrailDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getAuditLog(): readonly typeof this.auditLog[number][] {
    return [...this.auditLog];
  }

  clearAuditLog(): void {
    this.auditLog.length = 0;
  }
}
