import type { IJmsConnectionFactory } from "../../../contracts/IJmsConnectionFactory.js";
import type { IJmsDestination } from "../../../contracts/IJmsDestination.js";
import type { IEnterpriseNamingContext } from "../../../contracts/IEnterpriseNamingContext.js";
import { AbstractBaseFactoryBeanFactoryRegistry } from "../../../abstracts/AbstractBaseFactoryBeanFactoryRegistry.js";
import { EnterpriseJmsConnectionFactoryImpl } from "../EnterpriseJmsConnectionFactoryImpl.js";
import { EnterpriseJmsQueueImpl } from "../EnterpriseJmsQueueImpl.js";
import { EnterpriseJmsTopicImpl } from "../EnterpriseJmsTopicImpl.js";
import { StandardMessageDrivenBeanContainerImpl } from "../StandardMessageDrivenBeanContainerImpl.js";
import { FizzBuzzComputationMessageDrivenBeanImpl } from "../FizzBuzzComputationMessageDrivenBeanImpl.js";
import { StandardJmsAdministeredObjectBinderImpl } from "./StandardJmsAdministeredObjectBinderImpl.js";

export class JmsInfrastructureFactoryBeanFactory extends AbstractBaseFactoryBeanFactoryRegistry {
  private static readonly FACTORY_BEAN_NAME = "JmsInfrastructureFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-JMS-INFRA-FBF";

  private static jmsConnectionFactory: EnterpriseJmsConnectionFactoryImpl | null = null;
  private static requestQueue: EnterpriseJmsQueueImpl | null = null;
  private static resultTopic: EnterpriseJmsTopicImpl | null = null;
  private static mdbContainer: StandardMessageDrivenBeanContainerImpl | null = null;
  private static computationMdb: FizzBuzzComputationMessageDrivenBeanImpl | null = null;
  private static administeredObjectBinder: StandardJmsAdministeredObjectBinderImpl | null = null;
  private static initialized = false;

  static initializeJmsInfrastructure(namingContext: IEnterpriseNamingContext): boolean {
    if (JmsInfrastructureFactoryBeanFactory.initialized) {
      return false;
    }

    const binder = new StandardJmsAdministeredObjectBinderImpl();
    binder.initializeJmsAdministeredObjects(namingContext);
    JmsInfrastructureFactoryBeanFactory.administeredObjectBinder = binder;

    JmsInfrastructureFactoryBeanFactory.jmsConnectionFactory =
      binder.lookupConnectionFactory(binder.getConnectionFactoryJndiName()) as EnterpriseJmsConnectionFactoryImpl ?? new EnterpriseJmsConnectionFactoryImpl();

    JmsInfrastructureFactoryBeanFactory.requestQueue =
      binder.lookupQueue(binder.getComputationRequestQueueJndiName()) as EnterpriseJmsQueueImpl ?? null;

    JmsInfrastructureFactoryBeanFactory.resultTopic =
      binder.lookupTopic(binder.getComputationResultTopicJndiName()) as EnterpriseJmsTopicImpl ?? null;

    if (!JmsInfrastructureFactoryBeanFactory.requestQueue) {
      JmsInfrastructureFactoryBeanFactory.requestQueue = new EnterpriseJmsQueueImpl(
        "FizzBuzzComputationRequestQueue",
        "jms/queue/FizzBuzzComputationRequestQueue",
        "Enterprise FizzBuzz Computation Request Queue",
      );
    }

    if (!JmsInfrastructureFactoryBeanFactory.resultTopic) {
      JmsInfrastructureFactoryBeanFactory.resultTopic = new EnterpriseJmsTopicImpl(
        "FizzBuzzComputationResultTopic",
        "jms/topic/FizzBuzzComputationResultTopic",
        "Enterprise FizzBuzz Computation Result Topic",
      );
    }

    const mdbContainer = new StandardMessageDrivenBeanContainerImpl(50);
    JmsInfrastructureFactoryBeanFactory.mdbContainer = mdbContainer;

    const mdb = new FizzBuzzComputationMessageDrivenBeanImpl();
    JmsInfrastructureFactoryBeanFactory.computationMdb = mdb;

    mdbContainer.deployMessageDrivenBean(mdb);
    mdbContainer.initializeContainer();

    JmsInfrastructureFactoryBeanFactory.initialized = true;
    return true;
  }

  static setMdbComputationCallback(callback: (value: number) => string): void {
    if (JmsInfrastructureFactoryBeanFactory.computationMdb !== null) {
      JmsInfrastructureFactoryBeanFactory.computationMdb.setComputationCallback(callback);
    }
  }

  static getConnectionFactory(): EnterpriseJmsConnectionFactoryImpl | null {
    return JmsInfrastructureFactoryBeanFactory.jmsConnectionFactory;
  }

  static getRequestQueue(): EnterpriseJmsQueueImpl | null {
    return JmsInfrastructureFactoryBeanFactory.requestQueue;
  }

  static getResultTopic(): EnterpriseJmsTopicImpl | null {
    return JmsInfrastructureFactoryBeanFactory.resultTopic;
  }

  static getMdbContainer(): StandardMessageDrivenBeanContainerImpl | null {
    return JmsInfrastructureFactoryBeanFactory.mdbContainer;
  }

  static getComputationMdb(): FizzBuzzComputationMessageDrivenBeanImpl | null {
    return JmsInfrastructureFactoryBeanFactory.computationMdb;
  }

  static getAdministeredObjectBinder(): StandardJmsAdministeredObjectBinderImpl | null {
    return JmsInfrastructureFactoryBeanFactory.administeredObjectBinder;
  }

  static isInitialized(): boolean {
    return JmsInfrastructureFactoryBeanFactory.initialized;
  }

  static resetInfrastructure(): void {
    if (JmsInfrastructureFactoryBeanFactory.mdbContainer !== null) {
      JmsInfrastructureFactoryBeanFactory.mdbContainer.shutdownContainer();
      JmsInfrastructureFactoryBeanFactory.mdbContainer = null;
    }
    JmsInfrastructureFactoryBeanFactory.computationMdb = null;
    JmsInfrastructureFactoryBeanFactory.jmsConnectionFactory = null;
    JmsInfrastructureFactoryBeanFactory.requestQueue = null;
    JmsInfrastructureFactoryBeanFactory.resultTopic = null;
    JmsInfrastructureFactoryBeanFactory.administeredObjectBinder = null;
    JmsInfrastructureFactoryBeanFactory.initialized = false;
  }

  getFactoryBeanName(): string { return JmsInfrastructureFactoryBeanFactory.FACTORY_BEAN_NAME; }
  getFactoryBeanVersion(): string { return JmsInfrastructureFactoryBeanFactory.FACTORY_BEAN_VERSION; }

  registerDelegateFactoryBean(jndiName: string, factoryBean: { createDelegate(): any }): void {
  }
  resolveDelegateFactoryBean(jndiName: string): { createDelegate(): any } | null {
    return null;
  }
  getRegisteredFactoryBeanNames(): readonly string[] {
    return [];
  }
  getRegistryName(): string { return JmsInfrastructureFactoryBeanFactory.FACTORY_BEAN_NAME; }
  getRegistryVersion(): string { return JmsInfrastructureFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}
