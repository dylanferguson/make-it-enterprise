import { AbstractBaseComputationEventListener } from "../../abstracts/AbstractBaseComputationEventListener.js";
import type { IComputationEvent } from "../../contracts/IComputationEvent.js";
import type { ISloMetricsCollector } from "../../contracts/ISloMetricsCollector.js";

export class SloMetricsComputationEventListenerImpl extends AbstractBaseComputationEventListener {
  private static readonly LISTENER_NAME = "SloMetricsComputationEventListener";
  private static readonly LISTENER_PRIORITY = 75;

  private readonly sloMetricsCollector: ISloMetricsCollector;

  constructor(sloMetricsCollector: ISloMetricsCollector) {
    super();
    this.sloMetricsCollector = sloMetricsCollector;
  }

  override onEvent(event: IComputationEvent): void {
    this.logEventReceived(event);
    const payload = event.getEventPayload();
    if (event.getEventType() === "VALUE_RESOLVED") {
      const inputValue = payload["inputValue"] as number;
      const resolvedResult = payload["resolvedResult"] as string;
      const durationMs = payload["resolutionDurationMs"] as number;
      this.sloMetricsCollector.recordResolveOperation(durationMs, true);
    }
  }

  override getListenerName(): string {
    return SloMetricsComputationEventListenerImpl.LISTENER_NAME;
  }

  override getListenerPriority(): number {
    return SloMetricsComputationEventListenerImpl.LISTENER_PRIORITY;
  }

  override supportsEventType(eventType: string): boolean {
    return eventType === "VALUE_RESOLVED" || eventType === "RANGE_COMPUTATION_COMPLETED";
  }
}
