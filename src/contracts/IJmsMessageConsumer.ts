import type { IJmsDestination } from "./IJmsDestination.js";
import type { IJmsMessage } from "./IJmsMessage.js";
import type { IJmsMessageListener } from "./IJmsMessageListener.js";

export interface IJmsMessageConsumer {
  getConsumerName(): string;
  getConsumerVersion(): string;
  getDestination(): IJmsDestination;
  getMessageSelector(): string | null;
  receive(): IJmsMessage | null;
  receiveWithTimeout(timeout: number): IJmsMessage | null;
  receiveNoWait(): IJmsMessage | null;
  setMessageListener(listener: IJmsMessageListener): void;
  getMessageListener(): IJmsMessageListener | null;
  close(): void;
}
