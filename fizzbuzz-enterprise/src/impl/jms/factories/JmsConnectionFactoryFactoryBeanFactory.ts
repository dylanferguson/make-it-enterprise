import type { IJmsConnectionFactory } from "../../../contracts/IJmsConnectionFactory.js";
import { AbstractBaseFactoryBeanFactoryRegistry } from "../../../abstracts/AbstractBaseFactoryBeanFactoryRegistry.js";
import { EnterpriseJmsConnectionFactoryImpl } from "../EnterpriseJmsConnectionFactoryImpl.js";

export class JmsConnectionFactoryFactoryBeanFactory extends AbstractBaseFactoryBeanFactoryRegistry {
  private static readonly FACTORY_BEAN_NAME = "JmsConnectionFactoryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-JMS-CF-FBF";

  private static connectionFactory: IJmsConnectionFactory | null = null;

  static createConnectionFactory(): IJmsConnectionFactory {
    if (JmsConnectionFactoryFactoryBeanFactory.connectionFactory === null) {
      JmsConnectionFactoryFactoryBeanFactory.connectionFactory = new EnterpriseJmsConnectionFactoryImpl();
    }
    return JmsConnectionFactoryFactoryBeanFactory.connectionFactory!;
  }

  static getConnectionFactory(): IJmsConnectionFactory | null {
    return JmsConnectionFactoryFactoryBeanFactory.connectionFactory;
  }

  static resetConnectionFactory(): void {
    JmsConnectionFactoryFactoryBeanFactory.connectionFactory = null;
  }

  getFactoryBeanName(): string { return JmsConnectionFactoryFactoryBeanFactory.FACTORY_BEAN_NAME; }
  getFactoryBeanVersion(): string { return JmsConnectionFactoryFactoryBeanFactory.FACTORY_BEAN_VERSION; }

  registerDelegateFactoryBean(jndiName: string, factoryBean: { createDelegate(): any }): void {}
  resolveDelegateFactoryBean(jndiName: string): { createDelegate(): any } | null { return null; }
  getRegisteredFactoryBeanNames(): readonly string[] { return []; }
  getRegistryName(): string { return JmsConnectionFactoryFactoryBeanFactory.FACTORY_BEAN_NAME; }
  getRegistryVersion(): string { return JmsConnectionFactoryFactoryBeanFactory.FACTORY_BEAN_VERSION; }
}
