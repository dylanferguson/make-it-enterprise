import type { IModuloEvaluationStrategyFactoryBeanRegistry } from "../../contracts/IModuloEvaluationStrategyFactoryBeanRegistry.js";
import type { IEnterpriseServiceLocatorRegistrationBean } from "../../contracts/IEnterpriseServiceLocatorRegistrationBean.js";
import type { IModuloOperationChainHandler } from "../../contracts/IModuloOperationChainHandler.js";
import { InMemoryModuloEvaluationStrategyFactoryBeanRegistryImpl } from "../registry/InMemoryModuloEvaluationStrategyFactoryBeanRegistryImpl.js";
import { ProgrammaticModuloRegistrationBeanImpl } from "../registry/ProgrammaticModuloRegistrationBeanImpl.js";
import { ModuloOperationChainBuilder } from "../modulo/ModuloOperationChainBuilder.js";

export class AbstractBaseDivisibilityStrategyProviderResolver {
  private static readonly RESOLVER_NAME = "AbstractBaseDivisibilityStrategyProviderResolver";
  private static readonly RESOLVER_VERSION = "2.0.0-ENTERPRISE-RESOLVER";

  private chainHandler: IModuloOperationChainHandler | null = null;
  private registry: IModuloEvaluationStrategyFactoryBeanRegistry | null = null;
  private initialized = false;

  initialize(): void {
    if (!this.initialized) {
      this.registry = new InMemoryModuloEvaluationStrategyFactoryBeanRegistryImpl();
      const registrationBean: IEnterpriseServiceLocatorRegistrationBean =
        new ProgrammaticModuloRegistrationBeanImpl();
      registrationBean.registerFactoryBeans(this.registry);
      const chainBuilder = new ModuloOperationChainBuilder();
      this.chainHandler = chainBuilder
        .withProtocolStack(true)
        .build();
      this.initialized = true;
      console.debug(
        `[${AbstractBaseDivisibilityStrategyProviderResolver.RESOLVER_NAME}] Initialized with ${this.registry.getRegisteredDivisors().length} registered factory beans`,
      );
    }
  }

  resolveModuloResult(
    dividend: number,
    divisor: number,
    computationContext: string | null,
  ): number {
    this.ensureInitialized();
    const factoryBeanName = this.registry!.resolveFactoryBeanName(divisor);
    if (factoryBeanName !== null) {
      console.debug(
        `[${AbstractBaseDivisibilityStrategyProviderResolver.RESOLVER_NAME}] Resolved factory bean [${factoryBeanName}] for divisor=${divisor}`,
      );
    }
    return this.chainHandler!.handleModulo(dividend, divisor, computationContext);
  }

  getRegistry(): IModuloEvaluationStrategyFactoryBeanRegistry | null {
    return this.registry;
  }

  getChainHandler(): IModuloOperationChainHandler | null {
    return this.chainHandler;
  }

  getResolverName(): string {
    return AbstractBaseDivisibilityStrategyProviderResolver.RESOLVER_NAME;
  }

  getResolverVersion(): string {
    return AbstractBaseDivisibilityStrategyProviderResolver.RESOLVER_VERSION;
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error(
        `[${AbstractBaseDivisibilityStrategyProviderResolver.RESOLVER_NAME}] Not initialized. Call initialize() before resolving.`,
      );
    }
  }
}

export class FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory {
  private static instance: AbstractBaseDivisibilityStrategyProviderResolver | null = null;

  static createResolver(): AbstractBaseDivisibilityStrategyProviderResolver {
    if (FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.instance === null) {
      const resolver = new AbstractBaseDivisibilityStrategyProviderResolver();
      resolver.initialize();
      FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.instance = resolver;
      console.debug(
        "[FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory] Resolver created and initialized",
      );
    }
    return FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.instance!;
  }

  static resetResolver(): void {
    FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.instance = null;
  }

  static isInitialized(): boolean {
    return FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.instance !== null;
  }
}
