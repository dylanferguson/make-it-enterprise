import type { IJmsMessageConsumer } from "../contracts/IJmsMessageConsumer.js";
import type { IJmsDestination } from "../contracts/IJmsDestination.js";
import type { IJmsMessage } from "../contracts/IJmsMessage.js";
import type { IJmsMessageListener } from "../contracts/IJmsMessageListener.js";

export abstract class AbstractBaseJmsMessageConsumer implements IJmsMessageConsumer {
  private readonly consumerName: string;
  private readonly consumerVersion: string;
  private readonly destination: IJmsDestination;
  private readonly messageSelector: string | null;
  private messageListener: IJmsMessageListener | null;
  private closed: boolean;
  protected messageBuffer: IJmsMessage[];

  constructor(consumerName: string, consumerVersion: string, destination: IJmsDestination, messageSelector: string | null) {
    this.consumerName = consumerName;
    this.consumerVersion = consumerVersion;
    this.destination = destination;
    this.messageSelector = messageSelector;
    this.messageListener = null;
    this.closed = false;
    this.messageBuffer = [];
  }

  abstract receive(): IJmsMessage | null;
  abstract receiveWithTimeout(timeout: number): IJmsMessage | null;
  abstract receiveNoWait(): IJmsMessage | null;

  getConsumerName(): string { return this.consumerName; }
  getConsumerVersion(): string { return this.consumerVersion; }
  getDestination(): IJmsDestination { return this.destination; }
  getMessageSelector(): string | null { return this.messageSelector; }

  setMessageListener(listener: IJmsMessageListener): void { this.messageListener = listener; }
  getMessageListener(): IJmsMessageListener | null { return this.messageListener; }

  close(): void {
    this.closed = true;
    this.messageBuffer = [];
  }
}
