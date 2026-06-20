import { AbstractBaseComputationEventListener } from "../../abstracts/AbstractBaseComputationEventListener.js";
import type { IComputationEvent } from "../../contracts/IComputationEvent.js";
import type { IEnterpriseNamingContext } from "../../contracts/IEnterpriseNamingContext.js";

export class AuditTrailComputationEventListenerImpl extends AbstractBaseComputationEventListener {
  private static readonly LISTENER_NAME = "AuditTrailComputationEventListener";
  private static readonly LISTENER_PRIORITY = 50;

  private readonly namingContext: IEnterpriseNamingContext;
  private readonly auditLog: IComputationEvent[] = [];

  constructor(namingContext: IEnterpriseNamingContext) {
    super();
    this.namingContext = namingContext;
  }

  override onEvent(event: IComputationEvent): void {
    this.logEventReceived(event);
    this.auditLog.push(event);
    try {
      this.namingContext.bind(
        `java:comp/env/fizzbuzz/audit/event_${event.getEventSequenceNumber()}`,
        event,
      );
    } catch {
      console.debug(
        `[${this.getListenerName()}] Audit bind skipped for seq=${event.getEventSequenceNumber()}`,
      );
    }
  }

  getAuditLogSize(): number {
    return this.auditLog.length;
  }

  getAuditEvents(): readonly IComputationEvent[] {
    return [...this.auditLog];
  }

  override getListenerName(): string {
    return AuditTrailComputationEventListenerImpl.LISTENER_NAME;
  }

  override getListenerPriority(): number {
    return AuditTrailComputationEventListenerImpl.LISTENER_PRIORITY;
  }

  override supportsEventType(eventType: string): boolean {
    return true;
  }
}
