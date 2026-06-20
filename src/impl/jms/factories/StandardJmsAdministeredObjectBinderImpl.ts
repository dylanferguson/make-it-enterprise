import type { IJmsConnectionFactory } from "../../../contracts/IJmsConnectionFactory.js";
import type { IJmsDestination } from "../../../contracts/IJmsDestination.js";
import type { IEnterpriseNamingContext } from "../../../contracts/IEnterpriseNamingContext.js";
import { AbstractBaseJmsAdministeredObjectBinder } from "../../../abstracts/AbstractBaseJmsAdministeredObjectBinder.js";
import { EnterpriseJmsConnectionFactoryImpl } from "../EnterpriseJmsConnectionFactoryImpl.js";
import { EnterpriseJmsQueueImpl } from "../EnterpriseJmsQueueImpl.js";
import { EnterpriseJmsTopicImpl } from "../EnterpriseJmsTopicImpl.js";

export class StandardJmsAdministeredObjectBinderImpl extends AbstractBaseJmsAdministeredObjectBinder {
  private static readonly BINDER_NAME = "StandardJmsAdministeredObjectBinder";
  private static readonly BINDER_VERSION = "1.0.0-JMS-BINDER";

  private static readonly FIZZBUZZ_COMPUTATION_REQUEST_QUEUE_JNDI = "jms/queue/FizzBuzzComputationRequestQueue";
  private static readonly FIZZBUZZ_COMPUTATION_RESULT_TOPIC_JNDI = "jms/topic/FizzBuzzComputationResultTopic";
  private static readonly FIZZBUZZ_JMS_CONNECTION_FACTORY_JNDI = "jms/FizzBuzzConnectionFactory";
  private static readonly FIZZBUZZ_COMPUTATION_REQUEST_QUEUE_NAME = "FizzBuzzComputationRequestQueue";
  private static readonly FIZZBUZZ_COMPUTATION_RESULT_TOPIC_NAME = "FizzBuzzComputationResultTopic";

  constructor() {
    super(StandardJmsAdministeredObjectBinderImpl.BINDER_NAME, StandardJmsAdministeredObjectBinderImpl.BINDER_VERSION);
  }

  override initializeJmsAdministeredObjects(namingContext: IEnterpriseNamingContext): void {
    if (this.isInitialized()) {
      return;
    }

    const connectionFactory = new EnterpriseJmsConnectionFactoryImpl();
    connectionFactory.setClientId("FizzBuzzEnterpriseJmsClient");

    const requestQueue = new EnterpriseJmsQueueImpl(
      StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_COMPUTATION_REQUEST_QUEUE_NAME,
      StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_COMPUTATION_REQUEST_QUEUE_JNDI,
      "Enterprise FizzBuzz Computation Request Queue for JMS-based asynchronous computation processing",
    );

    const resultTopic = new EnterpriseJmsTopicImpl(
      StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_COMPUTATION_RESULT_TOPIC_NAME,
      StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_COMPUTATION_RESULT_TOPIC_JNDI,
      "Enterprise FizzBuzz Computation Result Topic for JMS-based asynchronous result notification",
    );

    this.bindConnectionFactory(StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_JMS_CONNECTION_FACTORY_JNDI, connectionFactory);
    this.bindQueue(StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_COMPUTATION_REQUEST_QUEUE_JNDI, requestQueue);
    this.bindTopic(StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_COMPUTATION_RESULT_TOPIC_JNDI, resultTopic);

    this.setInitialized(true);
  }

  getComputationRequestQueueJndiName(): string {
    return StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_COMPUTATION_REQUEST_QUEUE_JNDI;
  }

  getComputationResultTopicJndiName(): string {
    return StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_COMPUTATION_RESULT_TOPIC_JNDI;
  }

  getConnectionFactoryJndiName(): string {
    return StandardJmsAdministeredObjectBinderImpl.FIZZBUZZ_JMS_CONNECTION_FACTORY_JNDI;
  }
}
