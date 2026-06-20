import type { IJmsSession } from "../contracts/IJmsSession.js";
import type { IJmsDestination } from "../contracts/IJmsDestination.js";
import type { IJmsMessageProducer } from "../contracts/IJmsMessageProducer.js";
import type { IJmsMessageConsumer } from "../contracts/IJmsMessageConsumer.js";
import type { IJmsMessage } from "../contracts/IJmsMessage.js";
import type { JmsAcknowledgementMode } from "../contracts/JmsTypes.js";

export abstract class AbstractBaseJmsSession implements IJmsSession {
  private readonly sessionName: string;
  private readonly sessionVersion: string;
  private readonly acknowledgementMode: JmsAcknowledgementMode;
  private readonly transacted: boolean;
  private closed: boolean;
  protected producers: IJmsMessageProducer[];
  protected consumers: IJmsMessageConsumer[];

  constructor(sessionName: string, sessionVersion: string, acknowledgementMode: JmsAcknowledgementMode, transacted: boolean) {
    this.sessionName = sessionName;
    this.sessionVersion = sessionVersion;
    this.acknowledgementMode = acknowledgementMode;
    this.transacted = transacted;
    this.closed = false;
    this.producers = [];
    this.consumers = [];
  }

  abstract createProducer(destination: IJmsDestination): IJmsMessageProducer;
  abstract createConsumer(destination: IJmsDestination): IJmsMessageConsumer;
  abstract createConsumerWithSelector(destination: IJmsDestination, messageSelector: string): IJmsMessageConsumer;
  abstract createDurableSubscriber(topic: IJmsDestination, subscriptionName: string): IJmsMessageConsumer;
  abstract createQueue(queueName: string): IJmsDestination;
  abstract createTopic(topicName: string): IJmsDestination;
  abstract createTextMessage(body: string): IJmsMessage;
  abstract createObjectMessage(body: object): IJmsMessage;
  abstract createBytesMessage(): IJmsMessage;
  abstract createMapMessage(): IJmsMessage;

  getSessionName(): string { return this.sessionName; }
  getSessionVersion(): string { return this.sessionVersion; }
  getAcknowledgementMode(): JmsAcknowledgementMode { return this.acknowledgementMode; }
  isTransacted(): boolean { return this.transacted; }

  commit(): void {
    if (!this.transacted) {
      throw new Error("Cannot commit a non-transacted session");
    }
  }

  rollback(): void {
    if (!this.transacted) {
      throw new Error("Cannot rollback a non-transacted session");
    }
  }

  recover(): void {
  }

  close(): void {
    this.closed = true;
    for (const producer of this.producers) {
      producer.close();
    }
    for (const consumer of this.consumers) {
      consumer.close();
    }
    this.producers = [];
    this.consumers = [];
  }

  getMessageListener(): IJmsMessageConsumer | null { return null; }
  run(): void {}
}
