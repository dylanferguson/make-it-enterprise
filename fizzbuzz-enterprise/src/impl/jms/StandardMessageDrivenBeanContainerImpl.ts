import { AbstractBaseMessageDrivenBeanContainer, AbstractBaseMessageDrivenContext, AbstractBaseJmsTransactionConfiguration } from "../../abstracts/AbstractBaseMessageDrivenBean.js";
import type { IMessageDrivenBean } from "../../contracts/IMessageDrivenBean.js";
import type { IJmsTransactionConfiguration } from "../../contracts/IMessageDrivenBean.js";
import { EnterpriseJmsMessageConsumerImpl } from "./EnterpriseJmsMessageConsumerImpl.js";
import { FizzBuzzComputationMessageDrivenBeanImpl } from "./FizzBuzzComputationMessageDrivenBeanImpl.js";

export class StandardMessageDrivenBeanContainerImpl extends AbstractBaseMessageDrivenBeanContainer {
  private static readonly CONTAINER_NAME = "StandardMessageDrivenBeanContainer";
  private static readonly CONTAINER_VERSION = "1.0.0-MDB-CONTAINER";

  private messageConsumers: Map<string, EnterpriseJmsMessageConsumerImpl>;
  private deliveryThreadActive: boolean;
  private deliveryInterval: number;

  constructor(deliveryInterval?: number) {
    super(
      StandardMessageDrivenBeanContainerImpl.CONTAINER_NAME,
      StandardMessageDrivenBeanContainerImpl.CONTAINER_VERSION,
      new StandardJmsTransactionConfigurationImpl(),
    );
    this.messageConsumers = new Map();
    this.deliveryThreadActive = false;
    this.deliveryInterval = deliveryInterval ?? 100;
  }

  override deployMessageDrivenBean(bean: IMessageDrivenBean): void {
    const beanName = bean.getBeanName();
    if (this.deployedBeans.has(beanName)) {
      return;
    }
    bean.ejbCreate();
    this.deployedBeans.set(beanName, bean);

    const context = new StandardMessageDrivenContextImpl(
      `MDBContext-${beanName}`,
      this,
      new StandardJmsTransactionConfigurationImpl(),
    );
    bean.setMessageDrivenContext(context);
  }

  override undeployMessageDrivenBean(beanName: string): void {
    const bean = this.deployedBeans.get(beanName);
    if (bean !== undefined) {
      bean!.ejbRemove();
      this.deployedBeans.delete(beanName);
    }
  }

  override initializeContainer(): void {
    this.setRunning(true);
    this.deliveryThreadActive = true;
  }

  override shutdownContainer(): void {
    this.deliveryThreadActive = false;
    this.setRunning(false);
    for (const beanName of Array.from(this.deployedBeans.keys())) {
      this.undeployMessageDrivenBean(beanName);
    }
  }

  registerConsumer(beanName: string, consumer: EnterpriseJmsMessageConsumerImpl): void {
    this.messageConsumers.set(beanName, consumer);
  }

  deliverMessages(): void {
    if (!this.deliveryThreadActive) {
      return;
    }
    for (const [beanName, consumer] of this.messageConsumers.entries()) {
      const bean = this.deployedBeans.get(beanName);
      if (bean === undefined) {
        continue;
      }
      const message = consumer.receiveNoWait();
      while (message !== null) {
        bean!.onMessage(message);
      }
    }
  }

  getDeliveredMessageCount(): number {
    let count = 0;
    for (const bean of this.deployedBeans.values()) {
      if (bean instanceof FizzBuzzComputationMessageDrivenBeanImpl) {
        count += bean.getProcessedMessageCount();
      }
    }
    return count;
  }
}

export class StandardJmsTransactionConfigurationImpl extends AbstractBaseJmsTransactionConfiguration {
  constructor() {
    super(
      "StandardJmsTransactionConfiguration",
      "1.0.0-JMS-TX-CONFIG",
      true,
      "AUTO_ACKNOWLEDGE",
      30000,
      true,
      "Required",
    );
  }
}

export class StandardMessageDrivenContextImpl extends AbstractBaseMessageDrivenContext {
  constructor(contextName: string, container: StandardMessageDrivenBeanContainerImpl, transactionConfig: StandardJmsTransactionConfigurationImpl) {
    super(contextName, container, transactionConfig);
  }
}
