import { AbstractBaseEnterpriseNamingContext } from "../../abstracts/AbstractBaseEnterpriseNamingContext.js";
import type { IServiceLocator } from "../../contracts/IServiceLocator.js";
import { ServiceLocatorFactory } from "../factories/ServiceLocatorFactoryImpl.js";

export class EnterpriseNamingContextImpl extends AbstractBaseEnterpriseNamingContext {
  private static readonly SERVICE_LOCATOR_JNDI_NAME = "java:comp/env/fizzbuzz/ServiceLocator";

  constructor(contextName: string = "FizzBuzzEnterpriseNamingContext") {
    super(contextName);
  }

  override lookup(name: string): unknown {
    this.assertBound(name);
    const value = this.bindings.get(name);
    if (value === undefined) {
      throw new Error(`[${this.contextName}] Binding not found for: ${name}`);
    }
    return value;
  }

  override lookupServiceLocator(): IServiceLocator {
    const bound = this.bindings.get(EnterpriseNamingContextImpl.SERVICE_LOCATOR_JNDI_NAME);
    if (bound instanceof Function) {
      return ServiceLocatorFactory.createServiceLocator();
    }
    if (bound !== undefined) {
      return bound as IServiceLocator;
    }
    return ServiceLocatorFactory.createServiceLocator();
  }

  override bind(name: string, value: unknown): void {
    this.bindings.set(name, value);
    console.debug(`[${this.contextName}] Bound: ${name}`);
  }

  override unbind(name: string): boolean {
    const existed = this.bindings.has(name);
    this.bindings.delete(name);
    if (existed) {
      console.debug(`[${this.contextName}] Unbound: ${name}`);
    }
    return existed;
  }

  override listBoundNames(): readonly string[] {
    return Array.from(this.bindings.keys());
  }

  override getNamingContextName(): string {
    return this.contextName;
  }
}
