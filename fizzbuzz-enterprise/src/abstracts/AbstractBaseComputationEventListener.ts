import type { IComputationEvent } from "../contracts/IComputationEvent.js";
import type { IComputationEventListener } from "../contracts/IComputationEventListener.js";

export abstract class AbstractBaseComputationEventListener
  implements IComputationEventListener
{
  abstract onEvent(event: IComputationEvent): void;
  abstract getListenerName(): string;
  abstract getListenerPriority(): number;
  abstract supportsEventType(eventType: string): boolean;

  protected logEventReceived(event: IComputationEvent): void {
    console.debug(
      `[${this.getListenerName()}] Received event [${event.getEventType()}] ` +
      `seq=${event.getEventSequenceNumber()} source=${event.getSourceIdentifier()}`,
    );
  }
}
