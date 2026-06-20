import type { IEnterpriseFizzBuzzResolutionAuditTrailVisitor, AuditTrailEntry } from "../contracts/IEnterpriseFizzBuzzResolutionAuditTrailVisitor.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResolutionAuditTrailVisitor
  implements IEnterpriseFizzBuzzResolutionAuditTrailVisitor
{
  protected readonly auditTrail: AuditTrailEntry[] = [];

  abstract getVisitorName(): string;
  abstract getVisitorVersion(): string;

  abstract visitResolution(value: number, strategyName: string, result: string): void;
  abstract visitSpecificationEvaluation(divisor: number, value: number, satisfied: boolean): void;
  abstract visitModuloArithmeticInvocation(dividend: number, divisor: number, remainder: number): void;

  getAuditTrail(): readonly AuditTrailEntry[] {
    return [...this.auditTrail];
  }

  clearAuditTrail(): void {
    this.auditTrail.length = 0;
  }

  protected recordEntry(eventType: AuditTrailEntry["eventType"], details: Record<string, unknown>): void {
    this.auditTrail.push({
      eventType,
      timestamp: Date.now(),
      details,
    });
  }
}
