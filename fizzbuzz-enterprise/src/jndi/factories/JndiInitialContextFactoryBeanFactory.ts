import type { IJndiInitialContext } from "../contracts/IJndiInitialContext.js";
import type { IJndiContextFactory } from "../contracts/IJndiContextFactory.js";
import { StandardJndiContextFactoryImpl } from "../impl/StandardJndiContextFactoryImpl.js";

export class JndiInitialContextFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "JndiInitialContextFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-JNDI-FACTORY-BEAN";

  private static contextFactory: IJndiContextFactory | null = null;
  private static initialContext: IJndiInitialContext | null = null;
  private static infrastructureInitialized = false;

  static getFactoryBeanName(): string {
    return JndiInitialContextFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return JndiInitialContextFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static initializeJndiInfrastructure(
    providerUrl: string = "localhost:1099",
    factoryInitial: string = "com.enterprise.fizzbuzz.jndi.StandardJndiContextFactoryImpl",
  ): IJndiInitialContext {
    JndiInitialContextFactoryBeanFactory.contextFactory = StandardJndiContextFactoryImpl.getInstance();
    const env: Record<string, string> = {
      "java.naming.provider.url": providerUrl,
      "java.naming.factory.initial": factoryInitial,
    };
    JndiInitialContextFactoryBeanFactory.initialContext =
      JndiInitialContextFactoryBeanFactory.contextFactory.getInitialContext(env);
    JndiInitialContextFactoryBeanFactory.infrastructureInitialized = true;
    return JndiInitialContextFactoryBeanFactory.initialContext;
  }

  static getContextFactory(): IJndiContextFactory | null {
    return JndiInitialContextFactoryBeanFactory.contextFactory;
  }

  static getInitialContext(): IJndiInitialContext | null {
    return JndiInitialContextFactoryBeanFactory.initialContext;
  }

  static isInfrastructureInitialized(): boolean {
    return JndiInitialContextFactoryBeanFactory.infrastructureInitialized;
  }

  static createContextFactoryBean(): IJndiContextFactory {
    if (JndiInitialContextFactoryBeanFactory.contextFactory === null) {
      JndiInitialContextFactoryBeanFactory.contextFactory = StandardJndiContextFactoryImpl.getInstance();
    }
    return JndiInitialContextFactoryBeanFactory.contextFactory;
  }
}
