import type { IJmsMessage } from "../contracts/IJmsMessage.js";
import type { IJmsDestination } from "../contracts/IJmsDestination.js";
import type { JmsDeliveryMode, JmsMessageType } from "../contracts/JmsTypes.js";

export abstract class AbstractBaseJmsMessage implements IJmsMessage {
  private readonly messageType: JmsMessageType;
  private messageId: string;
  private correlationId: string;
  private destination: IJmsDestination | null;
  private replyToDestination: IJmsDestination | null;
  private deliveryMode: JmsDeliveryMode;
  private timestamp: number;
  private expiration: number;
  private priority: number;
  private redeliveryCount: number;
  private acknowledged: boolean;
  protected properties: Map<string, string | number | boolean>;
  private static messageCounter = 0;

  constructor(messageType: JmsMessageType) {
    this.messageType = messageType;
    this.messageId = `ID:${AbstractBaseJmsMessage.messageCounter++}`;
    this.correlationId = "";
    this.destination = null;
    this.replyToDestination = null;
    this.deliveryMode = "PERSISTENT";
    this.timestamp = Date.now();
    this.expiration = 0;
    this.priority = 4;
    this.redeliveryCount = 0;
    this.acknowledged = false;
    this.properties = new Map();
  }

  abstract getType(): JmsMessageType;

  getMessageId(): string { return this.messageId; }
  setMessageId(id: string): void { this.messageId = id; }
  getCorrelationId(): string { return this.correlationId; }
  setCorrelationId(correlationId: string): void { this.correlationId = correlationId; }
  getDestination(): IJmsDestination | null { return this.destination; }
  setDestination(destination: IJmsDestination): void { this.destination = destination; }
  getReplyToDestination(): IJmsDestination | null { return this.replyToDestination; }
  setReplyToDestination(destination: IJmsDestination): void { this.replyToDestination = destination; }
  getDeliveryMode(): JmsDeliveryMode { return this.deliveryMode; }
  setDeliveryMode(mode: JmsDeliveryMode): void { this.deliveryMode = mode; }
  getTimestamp(): number { return this.timestamp; }
  setTimestamp(timestamp: number): void { this.timestamp = timestamp; }
  getExpiration(): number { return this.expiration; }
  setExpiration(expiration: number): void { this.expiration = expiration; }
  getPriority(): number { return this.priority; }
  setPriority(priority: number): void { this.priority = priority; }
  getRedeliveryCount(): number { return this.redeliveryCount; }
  setRedeliveryCount(count: number): void { this.redeliveryCount = count; }

  acknowledge(): void {
    this.acknowledged = true;
  }

  clearBody(): void {
  }

  clearProperties(): void {
    this.properties.clear();
  }

  propertyExists(name: string): boolean {
    return this.properties.has(name);
  }

  getStringProperty(name: string): string | null {
    const value = this.properties.get(name);
    return typeof value === "string" ? value : null;
  }

  setStringProperty(name: string, value: string): void {
    this.properties.set(name, value);
  }

  getIntProperty(name: string): number | null {
    const value = this.properties.get(name);
    return typeof value === "number" ? value : null;
  }

  setIntProperty(name: string, value: number): void {
    this.properties.set(name, value);
  }

  getBooleanProperty(name: string): boolean | null {
    const value = this.properties.get(name);
    return typeof value === "boolean" ? value : null;
  }

  setBooleanProperty(name: string, value: boolean): void {
    this.properties.set(name, value);
  }
}
