import type { IJmsDestination } from "./IJmsDestination.js";
import type { JmsDeliveryMode, JmsAcknowledgementMode, JmsMessageType, JmsDestinationType } from "./JmsTypes.js";

export type { JmsDeliveryMode, JmsAcknowledgementMode, JmsMessageType, JmsDestinationType };

export interface IJmsMessage {
  getMessageId(): string;
  setMessageId(id: string): void;
  getCorrelationId(): string;
  setCorrelationId(correlationId: string): void;
  getDestination(): IJmsDestination | null;
  setDestination(destination: IJmsDestination): void;
  getReplyToDestination(): IJmsDestination | null;
  setReplyToDestination(destination: IJmsDestination): void;
  getDeliveryMode(): JmsDeliveryMode;
  setDeliveryMode(mode: JmsDeliveryMode): void;
  getTimestamp(): number;
  setTimestamp(timestamp: number): void;
  getExpiration(): number;
  setExpiration(expiration: number): void;
  getPriority(): number;
  setPriority(priority: number): void;
  getRedeliveryCount(): number;
  setRedeliveryCount(count: number): void;
  getType(): JmsMessageType;
  acknowledge(): void;
  clearBody(): void;
  clearProperties(): void;
  propertyExists(name: string): boolean;
  getStringProperty(name: string): string | null;
  setStringProperty(name: string, value: string): void;
  getIntProperty(name: string): number | null;
  setIntProperty(name: string, value: number): void;
  getBooleanProperty(name: string): boolean | null;
  setBooleanProperty(name: string, value: boolean): void;
}
