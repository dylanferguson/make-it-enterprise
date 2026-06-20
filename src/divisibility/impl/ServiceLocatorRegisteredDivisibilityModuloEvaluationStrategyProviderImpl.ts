import { AbstractBaseDivisibilityModuloEvaluationStrategyProvider } from "../abstracts/AbstractBaseDivisibilityModuloEvaluationStrategyProvider.js";
import type { IDivisibilityModuloEvaluationFactoryBean } from "../contracts/IDivisibilityModuloEvaluationFactoryBean.js";
import type { IDivisibilityModuloEvaluationChainHandler } from "../contracts/IDivisibilityModuloEvaluationChainHandler.js";
import { RemainderComputationStrategyProviderFactoryBeanFactory } from "../../operators/impl/factories/RemainderComputationStrategyProviderFactoryBeanFactory.js";
import type { IRemainderComputationStrategyProvider } from "../../operators/contracts/IRemainderComputationStrategyProvider.js";

export class ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl
  extends AbstractBaseDivisibilityModuloEvaluationStrategyProvider
{
  private static readonly PROVIDER_NAME = "ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProvider";
  private static readonly PROVIDER_VERSION = "1.1.0-ENTERPRISE-STRATEGY-PROVIDER-FALLBACK";

  private resolutionCount: number = 0;
  private static remainderProvider: IRemainderComputationStrategyProvider | null = null;

  constructor() {
    super(
      ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl.PROVIDER_NAME,
      ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl.PROVIDER_VERSION,
    );
  }

  private ensureRemainderProvider(): IRemainderComputationStrategyProvider {
    if (ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl.remainderProvider === null) {
      ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl.remainderProvider =
        RemainderComputationStrategyProviderFactoryBeanFactory.createProvider();
    }
    return ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl.remainderProvider;
  }

  override resolveStrategyProvider(dividend: number, divisor: number, context: string | null): number {
    this.resolutionCount++;
    this.ensureRegistry();
    const factoryBean = this.resolveFactoryBean(divisor);
    if (factoryBean !== null) {
      const handler = factoryBean.createChainHandler();
      return handler.handleModuloEvaluation(dividend, divisor, context);
    }
    const chainHandler = this.resolveFromRegistry(divisor);
    if (chainHandler !== null) {
      return chainHandler.handleModuloEvaluation(dividend, divisor, context);
    }
    const provider = this.ensureRemainderProvider();
    return provider.resolveRemainder(dividend, divisor);
  }

  override resolveFactoryBean(divisor: number): IDivisibilityModuloEvaluationFactoryBean | null {
    this.ensureRegistry();
    const factoryBeanName = this.registry!.resolveFactoryBeanName(divisor);
    if (factoryBeanName === null) {
      return null;
    }
    return this.registry!.getFactoryBeanInstance(factoryBeanName);
  }

  override resolveChainHandler(divisor: number): IDivisibilityModuloEvaluationChainHandler | null {
    this.ensureRegistry();
    return this.resolveFromRegistry(divisor);
  }

  override getRegisteredDivisors(): readonly number[] {
    this.ensureRegistry();
    return this.registry!.getRegisteredDivisors();
  }

  getResolutionCount(): number {
    return this.resolutionCount;
  }

  private ensureRegistry(): void {
    if (this.registry === null) {
      throw new Error(
        `[${ServiceLocatorRegisteredDivisibilityModuloEvaluationStrategyProviderImpl.PROVIDER_NAME}] ` +
        `Registry not initialized. Call initializeRegistry() or setRegistry() before resolving strategies.`,
      );
    }
  }
}
