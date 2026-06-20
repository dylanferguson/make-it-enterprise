import type { IJmsDestination } from "./IJmsDestination.js";
import type { IJmsMessageProducer } from "./IJmsMessageProducer.js";
import type { IJmsMessageConsumer } from "./IJmsMessageConsumer.js";
import type { IJmsMessage } from "./IJmsMessage.js";
import type { JmsAcknowledgementMode } from "./JmsTypes.js";

export interface IJmsSession {
  getSessionName(): string;
  getSessionVersion(): string;
  getAcknowledgementMode(): JmsAcknowledgementMode;
  isTransacted(): boolean;
  createProducer(destination: IJmsDestination): IJmsMessageProducer;
  createConsumer(destination: IJmsDestination): IJmsMessageConsumer;
  createConsumerWithSelector(destination: IJmsDestination, messageSelector: string): IJmsMessageConsumer;
  createDurableSubscriber(topic: IJmsDestination, subscriptionName: string): IJmsMessageConsumer;
  createQueue(queueName: string): IJmsDestination;
  createTopic(topicName: string): IJmsDestination;
  createTextMessage(body: string): IJmsMessage;
  createObjectMessage(body: object): IJmsMessage;
  createBytesMessage(): IJmsMessage;
  createMapMessage(): IJmsMessage;
  commit(): void;
  rollback(): void;
  recover(): void;
  close(): void;
  getMessageListener(): IJmsMessageConsumer | null;
  run(): void;
}
