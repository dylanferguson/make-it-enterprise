import type { IJmsConnectionFactory } from "../../../contracts/IJmsConnectionFactory.js";
import type { IJmsConnection } from "../../../contracts/IJmsConnection.js";
import type { IJmsSession } from "../../../contracts/IJmsSession.js";
import type { IJmsMessageProducer } from "../../../contracts/IJmsMessageProducer.js";
import type { IJmsMessageConsumer } from "../../../contracts/IJmsMessageConsumer.js";
import type { IJmsDestination } from "../../../contracts/IJmsDestination.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import { AbstractBaseFizzBuzzSingleValueResolutionFacade } from "../../../abstracts/AbstractBaseFizzBuzzSingleValueResolutionFacade.js";
import { FizzBuzzComputationObjectMessageImpl } from "../FizzBuzzComputationObjectMessageImpl.js";

export class JmsMessageDrivenResolutionFacadeDecoratorImpl extends AbstractBaseFizzBuzzSingleValueResolutionFacade {
  private static readonly FACADE_NAME = "JmsMessageDrivenResolutionFacadeDecorator";
  private static readonly FACADE_VERSION = "1.0.0-JMS-MDB-FACADE";

  private readonly delegate: IFizzBuzzSingleValueResolutionFacade;
  private readonly jmsConnectionFactory: IJmsConnectionFactory;
  private readonly requestQueue: IJmsDestination;
  private readonly resultTopic: IJmsDestination;
  private connection: IJmsConnection | null;
  private session: IJmsSession | null;
  private requestProducer: IJmsMessageProducer | null;
  private responseConsumer: IJmsMessageConsumer | null;
  private jmsInitialized: boolean;

  constructor(
    delegate: IFizzBuzzSingleValueResolutionFacade,
    jmsConnectionFactory: IJmsConnectionFactory,
    requestQueue: IJmsDestination,
    resultTopic: IJmsDestination,
  ) {
    super();
    this.delegate = delegate;
    this.jmsConnectionFactory = jmsConnectionFactory;
    this.requestQueue = requestQueue;
    this.resultTopic = resultTopic;
    this.connection = null;
    this.session = null;
    this.requestProducer = null;
    this.responseConsumer = null;
    this.jmsInitialized = false;
  }

  private initializeJmsInfrastructure(): void {
    if (this.jmsInitialized) {
      return;
    }
    this.connection = this.jmsConnectionFactory.createConnection();
    this.session = this.connection.createSession("AUTO_ACKNOWLEDGE");
    this.requestProducer = this.session.createProducer(this.requestQueue);
    this.responseConsumer = this.session.createDurableSubscriber(this.resultTopic, "FizzBuzzComputationResultSubscriber");
    this.connection.start();
    this.jmsInitialized = true;
  }

  getFacadeName(): string {
    return JmsMessageDrivenResolutionFacadeDecoratorImpl.FACADE_NAME;
  }

  getFacadeVersion(): string {
    return JmsMessageDrivenResolutionFacadeDecoratorImpl.FACADE_VERSION;
  }

  resolveValue(value: number): string {
    this.initializeJmsInfrastructure();

    const computationMessage = new FizzBuzzComputationObjectMessageImpl();
    computationMessage.setComputationValue(value);
    computationMessage.setCorrelationGroup("STANDARD");
    computationMessage.setSourceApplication("JmsMessageDrivenResolutionFacadeDecorator");

    const jmsMessage = computationMessage.toJmsMessage();
    jmsMessage.setReplyToDestination(this.resultTopic);

    this.requestProducer!.send(jmsMessage);

    const delegateResult = this.delegate.resolveValue(value);

    return delegateResult;
  }

  resolveRange(start: number, end: number): readonly string[] {
    this.validateRangeBounds(start, end);
    this.initializeJmsInfrastructure();

    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      const computationMessage = new FizzBuzzComputationObjectMessageImpl();
      computationMessage.setComputationValue(i);
      computationMessage.setCorrelationGroup("RANGE");
      computationMessage.setSourceApplication("JmsMessageDrivenResolutionFacadeDecorator");

      const jmsMessage = computationMessage.toJmsMessage();
      jmsMessage.setReplyToDestination(this.resultTopic);
      this.requestProducer!.send(jmsMessage);

      results.push(this.delegate.resolveValue(i));
    }
    return results;
  }
}
