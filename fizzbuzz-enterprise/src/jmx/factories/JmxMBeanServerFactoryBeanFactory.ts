import type { IJmxMBeanServer } from "../contracts/IJmxMBeanServer.js";
import { ConcurrentHashMapBackedJmxMBeanServerImpl } from "../impl/ConcurrentHashMapBackedJmxMBeanServerImpl.js";

export class JmxMBeanServerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "JmxMBeanServerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-JMX-SERVER-FACTORY-BEAN";

  private static mbeanServerSingleton: IJmxMBeanServer | null = null;

  static createMBeanServer(): IJmxMBeanServer {
    if (JmxMBeanServerFactoryBeanFactory.mbeanServerSingleton === null) {
      JmxMBeanServerFactoryBeanFactory.mbeanServerSingleton =
        new ConcurrentHashMapBackedJmxMBeanServerImpl();
    }
    return JmxMBeanServerFactoryBeanFactory.mbeanServerSingleton;
  }

  static getMBeanServer(): IJmxMBeanServer | null {
    return JmxMBeanServerFactoryBeanFactory.mbeanServerSingleton;
  }

  static isMBeanServerInitialized(): boolean {
    return JmxMBeanServerFactoryBeanFactory.mbeanServerSingleton !== null;
  }

  static resetMBeanServer(): void {
    JmxMBeanServerFactoryBeanFactory.mbeanServerSingleton = null;
  }

  static getFactoryBeanName(): string {
    return JmxMBeanServerFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return JmxMBeanServerFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
