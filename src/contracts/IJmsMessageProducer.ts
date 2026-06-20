import type { IJmsDestination } from "./IJmsDestination.js";
import type { IJmsMessage } from "./IJmsMessage.js";
import type { JmsDeliveryMode } from "./IJmsMessage.js";

export interface IJmsMessageProducer {
  getProducerName(): string;
  getProducerVersion(): string;
  getDestination(): IJmsDestination;
  setDeliveryMode(deliveryMode: JmsDeliveryMode): void;
  getDeliveryMode(): JmsDeliveryMode;
  setPriority(priority: number): void;
  getPriority(): number;
  setTimeToLive(timeToLive: number): void;
  getTimeToLive(): number;
  setDisableMessageId(disable: boolean): void;
  getDisableMessageId(): boolean;
  setDisableMessageTimestamp(disable: boolean): void;
  getDisableMessageTimestamp(): boolean;
  send(message: IJmsMessage): void;
  sendToDestination(destination: IJmsDestination, message: IJmsMessage): void;
  sendWithDeliveryMode(destination: IJmsDestination, message: IJmsMessage, deliveryMode: JmsDeliveryMode, priority: number, timeToLive: number): void;
  close(): void;
}
