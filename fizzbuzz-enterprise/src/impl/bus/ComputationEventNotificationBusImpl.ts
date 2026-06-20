import { AbstractBaseComputationEventNotificationBus } from "../../abstracts/AbstractBaseComputationEventNotificationBus.js";
import type { IComputationEvent } from "../../contracts/IComputationEvent.js";

export class ComputationEventNotificationBusImpl extends AbstractBaseComputationEventNotificationBus {
  private static readonly BUS_NAME = "ComputationEventNotificationBus";
  private static readonly BUS_VERSION = "1.0.0-ENTERPRISE";

  constructor() {
    super(
      ComputationEventNotificationBusImpl.BUS_NAME,
      ComputationEventNotificationBusImpl.BUS_VERSION,
    );
  }

  override publishEvent(event: IComputationEvent): void {
    console.debug(
      `[${this.getBusName()}:${this.getBusVersion()}] Publishing event [${event.getEventType()}] ` +
      `seq=${event.getEventSequenceNumber()} source=${event.getSourceIdentifier()}`,
    );
    this.dispatchToMatchingListeners(event);
  }
}
