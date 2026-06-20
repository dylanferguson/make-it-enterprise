import { AbstractBaseRemainderComputationStrategyResolverLocator } from "../../abstracts/AbstractBaseRemainderComputationStrategyResolverLocator.js";
import type { IRemainderComputationSupervisor } from "../../contracts/IRemainderComputationSupervisor.js";
import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";
import type { IRemainderOperatorStrategySelector } from "../../contracts/IRemainderOperatorStrategySelector.js";
import { StandardRemainderOperatorDelegationServiceImpl } from "../services/StandardRemainderOperatorDelegationServiceImpl.js";
import { ValidationRemainderOperatorDelegationServiceDecoratorImpl } from "../decorators/ValidationRemainderOperatorDelegationServiceDecoratorImpl.js";
import { CachingRemainderOperatorDelegationServiceDecoratorImpl } from "../decorators/CachingRemainderOperatorDelegationServiceDecoratorImpl.js";
import { AuditTrailRemainderOperatorDelegationServiceDecoratorImpl } from "../decorators/AuditTrailRemainderOperatorDelegationServiceDecoratorImpl.js";
import { StandardRemainderComputationSupervisorImpl } from "../supervisors/StandardRemainderComputationSupervisorImpl.js";
import { DefaultRemainderOperatorStrategySelectorImpl } from "../selectors/DefaultRemainderOperatorStrategySelectorImpl.js";
import { ModuloArithmeticStrategyProviderImpl } from "../providers/ModuloArithmeticStrategyProviderImpl.js";
import { ModuloEvaluationStrategyFactoryBeanFactory } from "../factories/ModuloEvaluationStrategyFactoryBean.js";
import { FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory } from "../factories/FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.js";

export class DefaultRemainderComputationStrategyResolverLocatorImpl extends AbstractBaseRemainderComputationStrategyResolverLocator {
  private static readonly LOCATOR_NAME = "DefaultRemainderComputationStrategyResolverLocator";
  private static readonly LOCATOR_VERSION = "1.0.0-ENTERPRISE-LOCATOR";

  private static instance: DefaultRemainderComputationStrategyResolverLocatorImpl | null = null;

  static getInstance(): DefaultRemainderComputationStrategyResolverLocatorImpl {
    if (DefaultRemainderComputationStrategyResolverLocatorImpl.instance === null) {
      DefaultRemainderComputationStrategyResolverLocatorImpl.instance =
        new DefaultRemainderComputationStrategyResolverLocatorImpl();
    }
    return DefaultRemainderComputationStrategyResolverLocatorImpl.instance;
  }

  static resetInstance(): void {
    DefaultRemainderComputationStrategyResolverLocatorImpl.instance = null;
  }

  override doInitialize(): {
    supervisor: IRemainderComputationSupervisor;
    delegationService: IRemainderOperatorDelegationService;
    strategySelector: IRemainderOperatorStrategySelector;
  } {
    FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory.createResolver();

    const moduloEvaluationStrategyFactoryBean =
      ModuloEvaluationStrategyFactoryBeanFactory.createFactoryBean(
        "DefaultRemainderComputationStrategyResolverLocatorStrategyBean",
        undefined,
        true,
      );
    const evaluationStrategyProvider = moduloEvaluationStrategyFactoryBean.createProvider();
    const arithmeticStrategyProvider = new ModuloArithmeticStrategyProviderImpl(evaluationStrategyProvider);
    const remainderStrategySelector = new DefaultRemainderOperatorStrategySelectorImpl(arithmeticStrategyProvider);

    const baseDelegationService = new StandardRemainderOperatorDelegationServiceImpl();
    const validationDecoratedService = new ValidationRemainderOperatorDelegationServiceDecoratorImpl(baseDelegationService);
    const cachingDecoratedService = new CachingRemainderOperatorDelegationServiceDecoratorImpl(validationDecoratedService);
    const auditTrailDecoratedService = new AuditTrailRemainderOperatorDelegationServiceDecoratorImpl(cachingDecoratedService);

    const remainderSupervisor = new StandardRemainderComputationSupervisorImpl(auditTrailDecoratedService);

    console.debug(
      `[${DefaultRemainderComputationStrategyResolverLocatorImpl.LOCATOR_NAME}] ` +
      `Initialized: supervisor=[${remainderSupervisor.getSupervisorName()}], ` +
      `delegationService=[${auditTrailDecoratedService.getDelegationServiceName()}], ` +
      `strategySelector=[${remainderStrategySelector.getSelectorName()}]`,
    );

    return {
      supervisor: remainderSupervisor,
      delegationService: auditTrailDecoratedService,
      strategySelector: remainderStrategySelector,
    };
  }

  override getLocatorName(): string {
    return DefaultRemainderComputationStrategyResolverLocatorImpl.LOCATOR_NAME;
  }

  override getLocatorVersion(): string {
    return DefaultRemainderComputationStrategyResolverLocatorImpl.LOCATOR_VERSION;
  }
}
