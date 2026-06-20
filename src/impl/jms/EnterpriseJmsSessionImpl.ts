import { AbstractBaseJmsSession } from "../../abstracts/AbstractBaseJmsSession.js";
import type { IJmsDestination } from "../../contracts/IJmsDestination.js";
import type { IJmsMessageProducer } from "../../contracts/IJmsMessageProducer.js";
import type { IJmsMessageConsumer } from "../../contracts/IJmsMessageConsumer.js";
import type { IJmsMessage } from "../../contracts/IJmsMessage.js";
import type { JmsAcknowledgementMode } from "../../contracts/IJmsMessage.js";
import { EnterpriseJmsQueueImpl } from "./EnterpriseJmsQueueImpl.js";
import { EnterpriseJmsTopicImpl } from "./EnterpriseJmsTopicImpl.js";
import { EnterpriseJmsMessageProducerImpl } from "./EnterpriseJmsMessageProducerImpl.js";
import { EnterpriseJmsMessageConsumerImpl } from "./EnterpriseJmsMessageConsumerImpl.js";
import { EnterpriseJmsTextMessageImpl } from "./EnterpriseJmsTextMessageImpl.js";
import { EnterpriseJmsObjectMessageImpl } from "./EnterpriseJmsObjectMessageImpl.js";

export class EnterpriseJmsSessionImpl extends AbstractBaseJmsSession {
  constructor(sessionName: string, sessionVersion: string, acknowledgementMode: JmsAcknowledgementMode, transacted: boolean) {
    super(sessionName, sessionVersion, acknowledgementMode, transacted);
  }

  override createProducer(destination: IJmsDestination): IJmsMessageProducer {
    const producer = new EnterpriseJmsMessageProducerImpl(
      `Producer-${this.producers.length + 1}`,
      "1.0.0-ENTERPRISE-JMS-PRODUCER",
      destination,
    );
    this.producers.push(producer);
    return producer;
  }

  override createConsumer(destination: IJmsDestination): IJmsMessageConsumer {
    const consumer = new EnterpriseJmsMessageConsumerImpl(
      `Consumer-${this.consumers.length + 1}`,
      "1.0.0-ENTERPRISE-JMS-CONSUMER",
      destination,
      null,
    );
    this.consumers.push(consumer);
    return consumer;
  }

  override createConsumerWithSelector(destination: IJmsDestination, messageSelector: string): IJmsMessageConsumer {
    const consumer = new EnterpriseJmsMessageConsumerImpl(
      `SelectorConsumer-${this.consumers.length + 1}`,
      "1.0.0-ENTERPRISE-JMS-SEL-CONSUMER",
      destination,
      messageSelector,
    );
    this.consumers.push(consumer);
    return consumer;
  }

  override createDurableSubscriber(topic: IJmsDestination, subscriptionName: string): IJmsMessageConsumer {
    const consumer = new EnterpriseJmsMessageConsumerImpl(
      `DurableSubscriber-${subscriptionName}`,
      "1.0.0-ENTERPRISE-JMS-DURABLE",
      topic,
      null,
    );
    this.consumers.push(consumer);
    return consumer;
  }

  override createQueue(queueName: string): IJmsDestination {
    return new EnterpriseJmsQueueImpl(
      queueName,
      `jms/queue/${queueName}`,
      `Enterprise JMS Queue: ${queueName}`,
    );
  }

  override createTopic(topicName: string): IJmsDestination {
    return new EnterpriseJmsTopicImpl(
      topicName,
      `jms/topic/${topicName}`,
      `Enterprise JMS Topic: ${topicName}`,
    );
  }

  override createTextMessage(body: string): IJmsMessage {
    return new EnterpriseJmsTextMessageImpl(body);
  }

  override createObjectMessage(body: object): IJmsMessage {
    return new EnterpriseJmsObjectMessageImpl(body);
  }

  override createBytesMessage(): IJmsMessage {
    return new EnterpriseJmsTextMessageImpl("");
  }

  override createMapMessage(): IJmsMessage {
    return new EnterpriseJmsTextMessageImpl("");
  }
}
