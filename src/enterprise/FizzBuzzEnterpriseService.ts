import { EnterpriseApplicationContextImpl } from "../impl/EnterpriseApplicationContextImpl.js";
import { ServiceLocatorImpl } from "../impl/locators/ServiceLocatorImpl.js";
import { HealthCheckAggregatorImpl } from "../impl/health/HealthCheckAggregatorImpl.js";
import { SloMetricsCollectorImpl } from "../impl/slo/SloMetricsCollectorImpl.js";
import { FizzBuzzHealthIndicatorImpl } from "../impl/health/FizzBuzzHealthIndicatorImpl.js";
import { EnterpriseInterceptorChainImpl } from "../impl/interceptors/enterprise/EnterpriseInterceptorChainImpl.js";
import { RetryValueResolverDecorator } from "../patterns/RetryValueResolverDecorator.js";
import { FallbackValueResolverDecorator } from "../patterns/FallbackValueResolverDecorator.js";
import { SessionManagedResolverProxy } from "../impl/proxies/SessionManagedResolverProxy.js";
import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";
import type { IComputationEventNotificationBus } from "../contracts/IComputationEventNotificationBus.js";
import { XmlDeploymentDescriptorReaderImpl } from "../impl/descriptors/XmlDeploymentDescriptorReaderImpl.js";
import { DefaultStrategySelectorFactoryImpl } from "../impl/factories/DefaultStrategySelectorFactoryImpl.js";
import { FizzBuzzTransactionManagerImpl } from "../impl/transactions/FizzBuzzTransactionManagerImpl.js";
import { FizzBuzzServiceHomeImpl } from "../impl/homes/FizzBuzzServiceHomeImpl.js";
import { ModuloArithmeticStrategyProviderImpl } from "../impl/providers/ModuloArithmeticStrategyProviderImpl.js";
import { ComputationEventNotificationBusFactoryBeanFactory } from "../impl/factories/ComputationEventNotificationBusFactoryBean.js";
import { ValueResolvedComputationEventImpl } from "../impl/events/ValueResolvedComputationEventImpl.js";
import { RangeComputationCompletedEventImpl } from "../impl/events/RangeComputationCompletedEventImpl.js";

export class FizzBuzzEnterpriseServiceFactoryBeanFactory {
  private static instance: FizzBuzzEnterpriseService | null = null;

  static createEnterpriseService(): FizzBuzzEnterpriseService {
    if (FizzBuzzEnterpriseServiceFactoryBeanFactory.instance === null) {
      const serviceLocator = new ServiceLocatorImpl();
      const healthAggregator = new HealthCheckAggregatorImpl();
      const sloCollector = new SloMetricsCollectorImpl();
      const moduloProvider = serviceLocator.getModuloEvaluationStrategyProvider();
      const healthIndicator = new FizzBuzzHealthIndicatorImpl(moduloProvider);
      healthAggregator.registerIndicator(healthIndicator);

      const deploymentDescriptorReader = new XmlDeploymentDescriptorReaderImpl(
        moduloProvider,
      );
      const strategyProvider =
        serviceLocator.getModuloArithmeticStrategyProvider() as ModuloArithmeticStrategyProviderImpl;
      deploymentDescriptorReader.configureFromDescriptor(strategyProvider);

      const selectorFactory = new DefaultStrategySelectorFactoryImpl(strategyProvider);
      const strategySelector = selectorFactory.createSelector("DEFAULT");
      strategyProvider.setStrategySelector(strategySelector);

      const enterpriseContext = new EnterpriseApplicationContextImpl(
        serviceLocator,
        healthAggregator,
        sloCollector,
      );

      const baseResolver = serviceLocator.getValueResolver();
      const retryDecorator = new RetryValueResolverDecorator(baseResolver, 3, 0);
      const fallbackDecorator = new FallbackValueResolverDecorator(retryDecorator, baseResolver);

      const interceptorChain = new EnterpriseInterceptorChainImpl(
        [...enterpriseContext.getInterceptors()],
        fallbackDecorator,
      );

      const interceptorWrappedResolver: ICompositeValueResolver = {
        resolve: (value: number): string => interceptorChain.proceed(value),
      };

      const sessionManager = enterpriseContext.getSessionManager();
      const postProcessorChain = enterpriseContext.getResultPostProcessorChain();

      const sessionManagedResolver: ICompositeValueResolver = new SessionManagedResolverProxy(
        interceptorWrappedResolver,
        sessionManager,
        postProcessorChain,
      );

      const dao = enterpriseContext.getFizzBuzzDao();
      const mbean = enterpriseContext.getManagementMBean();

      const daoWrappingResolver: ICompositeValueResolver = {
        resolve(value: number): string {
          const existing = dao.findById(value);
          if (existing !== null && existing.hasResult()) {
            return existing.getResult()!;
          }
          const result = sessionManagedResolver.resolve(value);
          dao.save(value, result);
          mbean.incrementResolvedCount();
          const transformers = enterpriseContext.getResultTransformers();
          let transformed = result;
          for (const transformer of transformers) {
            transformed = transformer.transform(value, transformed);
          }
          return transformed;
        },
      };

      const eventBusFactoryBean = ComputationEventNotificationBusFactoryBeanFactory.createFactoryBean(
        enterpriseContext.getNamingContext(),
        sloCollector,
      );
      const eventBus: IComputationEventNotificationBus =
        eventBusFactoryBean.createNotificationBus();

      const transactionManager = new FizzBuzzTransactionManagerImpl();
      const serviceHome = new FizzBuzzServiceHomeImpl(
        daoWrappingResolver,
        transactionManager,
      );

      const managedBean = serviceHome.create();

      FizzBuzzEnterpriseServiceFactoryBeanFactory.instance = new FizzBuzzEnterpriseService(
        managedBean.getValueResolver(),
        eventBus,
        serviceHome,
        transactionManager,
        deploymentDescriptorReader,
        selectorFactory,
        strategySelector,
      );
    }
    return FizzBuzzEnterpriseServiceFactoryBeanFactory.instance;
  }

  static resetEnterpriseService(): void {
    FizzBuzzEnterpriseServiceFactoryBeanFactory.instance = null;
  }
}

export class FizzBuzzEnterpriseService {
  private readonly valueResolver: ICompositeValueResolver;
  private readonly eventBus: IComputationEventNotificationBus;
  private readonly serviceHome: object | null;
  private readonly transactionManager: object | null;
  private readonly deploymentDescriptorReader: object | null;
  private readonly selectorFactory: object | null;
  private readonly strategySelector: object | null;

  constructor(
    valueResolver: ICompositeValueResolver,
    eventBus: IComputationEventNotificationBus,
    serviceHome: object | null = null,
    transactionManager: object | null = null,
    deploymentDescriptorReader: object | null = null,
    selectorFactory: object | null = null,
    strategySelector: object | null = null,
  ) {
    this.valueResolver = valueResolver;
    this.eventBus = eventBus;
    this.serviceHome = serviceHome;
    this.transactionManager = transactionManager;
    this.deploymentDescriptorReader = deploymentDescriptorReader;
    this.selectorFactory = selectorFactory;
    this.strategySelector = strategySelector;
  }

  getEventBus(): IComputationEventNotificationBus {
    return this.eventBus;
  }

  resolveValue(value: number): string {
    const startTime = performance.now();
    const result = this.valueResolver.resolve(value);
    const durationMs = performance.now() - startTime;
    const event = new ValueResolvedComputationEventImpl(
      "FizzBuzzEnterpriseService",
      value,
      result,
      durationMs,
    );
    this.eventBus.publishEvent(event);
    return result;
  }

  calculateRange(start: number, end: number): readonly string[] {
    const rangeStartTime = performance.now();
    const length = end - start + 1;
    const results = Array.from({ length }, (_, index) => this.resolveValue(start + index));
    const totalDurationMs = performance.now() - rangeStartTime;
    const rangeEvent = new RangeComputationCompletedEventImpl(
      "FizzBuzzEnterpriseService",
      start,
      end,
      results.length,
      totalDurationMs,
    );
    this.eventBus.publishEvent(rangeEvent);
    return results;
  }
}
