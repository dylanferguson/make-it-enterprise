import { AbstractBaseJmsMessageConsumer } from "../../abstracts/AbstractBaseJmsMessageConsumer.js";
import type { IJmsDestination } from "../../contracts/IJmsDestination.js";
import type { IJmsMessage } from "../../contracts/IJmsMessage.js";

export class EnterpriseJmsMessageConsumerImpl extends AbstractBaseJmsMessageConsumer {
  private receivedMessageCount: number;

  constructor(consumerName: string, consumerVersion: string, destination: IJmsDestination, messageSelector: string | null) {
    super(consumerName, consumerVersion, destination, messageSelector);
    this.receivedMessageCount = 0;
  }

  override receive(): IJmsMessage | null {
    if (this.messageBuffer.length === 0) {
      return null;
    }
    this.receivedMessageCount++;
    return this.messageBuffer.shift() ?? null;
  }

  override receiveWithTimeout(timeout: number): IJmsMessage | null {
    if (this.messageBuffer.length === 0) {
      return null;
    }
    this.receivedMessageCount++;
    return this.messageBuffer.shift() ?? null;
  }

  override receiveNoWait(): IJmsMessage | null {
    if (this.messageBuffer.length === 0) {
      return null;
    }
    this.receivedMessageCount++;
    return this.messageBuffer.shift() ?? null;
  }

  deliverMessage(message: IJmsMessage): void {
    if (this.getMessageListener()) {
      this.getMessageListener()!.onMessage(message);
    } else {
      this.messageBuffer.push(message);
    }
  }

  getReceivedMessageCount(): number { return this.receivedMessageCount; }
}
