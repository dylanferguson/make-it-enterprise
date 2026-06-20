import type { IJmsMessageProducer } from "../../contracts/IJmsMessageProducer.js";
import type { IJmsDestination } from "../../contracts/IJmsDestination.js";
import type { IJmsMessage } from "../../contracts/IJmsMessage.js";
import type { JmsDeliveryMode } from "../../contracts/JmsTypes.js";
import { AbstractBaseJmsMessageProducer } from "../../abstracts/AbstractBaseJmsMessageProducer.js";

export class EnterpriseJmsMessageProducerImpl extends AbstractBaseJmsMessageProducer {
  private sentMessageCount: number;
  private lastSentMessage: IJmsMessage | null;
  private lastSentTimestamp: number;

  constructor(producerName: string, producerVersion: string, destination: IJmsDestination) {
    super(producerName, producerVersion, destination);
    this.sentMessageCount = 0;
    this.lastSentMessage = null;
    this.lastSentTimestamp = 0;
  }

  override send(message: IJmsMessage): void {
    message.setDestination(this.getDestination());
    message.setDeliveryMode(this.getDeliveryMode());
    message.setPriority(this.getPriority());
    if (this.getTimeToLive() > 0) {
      message.setExpiration(Date.now() + this.getTimeToLive());
    }
    this.sentMessageCount++;
    this.lastSentMessage = message;
    this.lastSentTimestamp = Date.now();
  }

  override sendToDestination(destination: IJmsDestination, message: IJmsMessage): void {
    message.setDestination(destination);
    message.setDeliveryMode(this.getDeliveryMode());
    message.setPriority(this.getPriority());
    this.sentMessageCount++;
    this.lastSentMessage = message;
    this.lastSentTimestamp = Date.now();
  }

  override sendWithDeliveryMode(
    destination: IJmsDestination,
    message: IJmsMessage,
    deliveryMode: JmsDeliveryMode,
    priority: number,
    timeToLive: number,
  ): void {
    message.setDestination(destination);
    message.setDeliveryMode(deliveryMode);
    message.setPriority(priority);
    if (timeToLive > 0) {
      message.setExpiration(Date.now() + timeToLive);
    }
    this.sentMessageCount++;
    this.lastSentMessage = message;
    this.lastSentTimestamp = Date.now();
  }

  getSentMessageCount(): number { return this.sentMessageCount; }
  getLastSentMessage(): IJmsMessage | null { return this.lastSentMessage; }
  getLastSentTimestamp(): number { return this.lastSentTimestamp; }
}
