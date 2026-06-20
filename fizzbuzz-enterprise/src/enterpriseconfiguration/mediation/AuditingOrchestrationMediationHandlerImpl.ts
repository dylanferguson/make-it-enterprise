import { AbstractBaseOrchestrationMediationHandlerImpl } from "./AbstractBaseOrchestrationMediationHandlerImpl.js";

export class AuditingOrchestrationMediationHandlerImpl extends AbstractBaseOrchestrationMediationHandlerImpl {
  private auditCount: number = 0;

  constructor() {
    super("AuditingOrchestrationMediationHandlerImpl", "1.0.0-AUDIT-HANDLER", 100, true);
  }

  handle(value: number, next: (v: number) => string): string {
    this.auditCount++;
    const result = this.handleNext(value, next);
    console.debug(
      `[AuditingOrchestrationMediationHandler v${this.getHandlerVersion()}] ` +
      `Audit trail: value=[${value}], result=[${result}], totalAudited=[${this.auditCount}]`,
    );
    return result;
  }

  getAuditCount(): number { return this.auditCount; }
}
