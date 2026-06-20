import type { IJmsMessageProducer } from "../contracts/IJmsMessageProducer.js";
import type { IJmsDestination } from "../contracts/IJmsDestination.js";
import type { IJmsMessage } from "../contracts/IJmsMessage.js";
import type { JmsDeliveryMode } from "../contracts/JmsTypes.js";

export abstract class AbstractBaseJmsMessageProducer implements IJmsMessageProducer {
  private readonly producerName: string;
  private readonly producerVersion: string;
  private readonly destination: IJmsDestination;
  private deliveryMode: JmsDeliveryMode;
  private priority: number;
  private timeToLive: number;
  private disableMessageId: boolean;
  private disableMessageTimestamp: boolean;
  private closed: boolean;

  constructor(producerName: string, producerVersion: string, destination: IJmsDestination) {
    this.producerName = producerName;
    this.producerVersion = producerVersion;
    this.destination = destination;
    this.deliveryMode = "PERSISTENT";
    this.priority = 4;
    this.timeToLive = 0;
    this.disableMessageId = false;
    this.disableMessageTimestamp = false;
    this.closed = false;
  }

  abstract send(message: IJmsMessage): void;
  abstract sendToDestination(destination: IJmsDestination, message: IJmsMessage): void;
  abstract sendWithDeliveryMode(destination: IJmsDestination, message: IJmsMessage, deliveryMode: JmsDeliveryMode, priority: number, timeToLive: number): void;

  getProducerName(): string { return this.producerName; }
  getProducerVersion(): string { return this.producerVersion; }
  getDestination(): IJmsDestination { return this.destination; }
  setDeliveryMode(deliveryMode: JmsDeliveryMode): void { this.deliveryMode = deliveryMode; }
  getDeliveryMode(): JmsDeliveryMode { return this.deliveryMode; }
  setPriority(priority: number): void { this.priority = priority; }
  getPriority(): number { return this.priority; }
  setTimeToLive(timeToLive: number): void { this.timeToLive = timeToLive; }
  getTimeToLive(): number { return this.timeToLive; }
  setDisableMessageId(disable: boolean): void { this.disableMessageId = disable; }
  getDisableMessageId(): boolean { return this.disableMessageId; }
  setDisableMessageTimestamp(disable: boolean): void { this.disableMessageTimestamp = disable; }
  getDisableMessageTimestamp(): boolean { return this.disableMessageTimestamp; }

  close(): void {
    this.closed = true;
  }
}
