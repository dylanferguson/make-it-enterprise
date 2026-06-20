import { AbstractBaseSessionInterceptor } from "../../abstracts/AbstractBaseSessionInterceptor.js";

interface AuditTrailEntry {
  value: number;
  result: string | null;
  sessionId: string;
  phase: string;
  timestamp: Date;
}

export class AuditTrailSessionInterceptor extends AbstractBaseSessionInterceptor {
  private readonly auditLog: AuditTrailEntry[] = [];

  override getInterceptorName(): string {
    return "AuditTrailSessionInterceptor";
  }

  override getInterceptorPriority(): number {
    return 100;
  }

  override onBeforeResolve(value: number, sessionId: string): void {
    this.auditLog.push({
      value,
      result: null,
      sessionId,
      phase: "BEFORE_RESOLVE",
      timestamp: new Date(),
    });
  }

  override onAfterResolve(value: number, result: string, sessionId: string): void {
    this.auditLog.push({
      value,
      result,
      sessionId,
      phase: "AFTER_RESOLVE",
      timestamp: new Date(),
    });
    console.debug(
      this.formatLogMessage(this.getInterceptorName(), sessionId, `Resolved ${value} -> ${result}`),
    );
  }

  override onError(value: number, error: Error, sessionId: string): void {
    this.auditLog.push({
      value,
      result: null,
      sessionId,
      phase: "ERROR",
      timestamp: new Date(),
    });
    console.debug(
      this.formatLogMessage(this.getInterceptorName(), sessionId, `Error resolving ${value}: ${error.message}`),
    );
  }

  getAuditLog(): readonly AuditTrailEntry[] {
    return this.auditLog;
  }

  clearAuditLog(): void {
    this.auditLog.length = 0;
  }

  getAuditLogSize(): number {
    return this.auditLog.length;
  }
}
