import type { IJndiContextFactory } from "../contracts/IJndiContextFactory.js";
import type { IJndiInitialContext } from "../contracts/IJndiInitialContext.js";
import { StandardJndiInitialContextImpl } from "../impl/StandardJndiInitialContextImpl.js";

export class StandardJndiContextFactoryImpl implements IJndiContextFactory {
  private static readonly FACTORY_NAME = "StandardJndiContextFactory";
  private static readonly FACTORY_VERSION = "1.0.0-JNDI-CONTEXT-FACTORY";

  private static instance: StandardJndiContextFactoryImpl | null = null;

  static getInstance(): StandardJndiContextFactoryImpl {
    if (StandardJndiContextFactoryImpl.instance === null) {
      StandardJndiContextFactoryImpl.instance = new StandardJndiContextFactoryImpl();
    }
    return StandardJndiContextFactoryImpl.instance;
  }

  private constructor() {}

  getContextFactoryName(): string {
    return StandardJndiContextFactoryImpl.FACTORY_NAME;
  }

  getContextFactoryVersion(): string {
    return StandardJndiContextFactoryImpl.FACTORY_VERSION;
  }

  getInitialContext(environment: Record<string, string>): IJndiInitialContext {
    const context = new StandardJndiInitialContextImpl();
    const providerUrl = environment["java.naming.provider.url"] ?? "localhost:1099";
    const factoryInitial = environment["java.naming.factory.initial"]
      ?? "com.enterprise.fizzbuzz.jndi.StandardJndiContextFactoryImpl";
    console.debug(
      `[${this.getContextFactoryName()}] Creating initial JNDI context: ` +
      `factory=[${factoryInitial}], providerUrl=[${providerUrl}]`,
    );
    return context;
  }
}
