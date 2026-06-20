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
import type { IFizzBuzzComputationBridge } from "../contracts/IFizzBuzzComputationBridge.js";
import type { IFizzBuzzComputationMediator } from "../contracts/IFizzBuzzComputationMediator.js";
import type { IPipeline } from "../contracts/IPipeline.js";
import { XmlDeploymentDescriptorReaderImpl } from "../impl/descriptors/XmlDeploymentDescriptorReaderImpl.js";
import { DefaultStrategySelectorFactoryImpl } from "../impl/factories/DefaultStrategySelectorFactoryImpl.js";
import { FizzBuzzTransactionManagerImpl } from "../impl/transactions/FizzBuzzTransactionManagerImpl.js";
import { FizzBuzzServiceHomeImpl } from "../impl/homes/FizzBuzzServiceHomeImpl.js";
import { ModuloArithmeticStrategyProviderImpl } from "../impl/providers/ModuloArithmeticStrategyProviderImpl.js";
import { ComputationEventNotificationBusFactoryBeanFactory } from "../impl/factories/ComputationEventNotificationBusFactoryBean.js";
import { ValueResolvedComputationEventImpl } from "../impl/events/ValueResolvedComputationEventImpl.js";
import { RangeComputationCompletedEventImpl } from "../impl/events/RangeComputationCompletedEventImpl.js";
import { FizzBuzzComputationBridgeFactoryBeanFactory, FizzBuzzComputationBridgeType } from "../impl/factories/FizzBuzzComputationBridgeFactoryBean.js";
import { FizzBuzzComputationMediatorFactoryBeanFactory } from "../impl/factories/FizzBuzzComputationMediatorFactoryBean.js";
import { FizzBuzzStrategyFlyweightFactoryBean } from "../impl/factories/FizzBuzzStrategyFlyweightFactoryBean.js";
import { FizzBuzzLifecycleManagerFactoryBean } from "../impl/factories/FizzBuzzLifecycleManagerFactoryBean.js";
import { FizzBuzzContainerManagedBeanImpl } from "../impl/lifecycle/FizzBuzzContainerManagedBeanImpl.js";
import { FizzBuzzResolverLifecycleManagedBeanImpl } from "../impl/lifecycle/FizzBuzzResolverLifecycleManagedBeanImpl.js";
import { FizzBuzzResourceAdapterFactoryBean } from "../impl/factories/FizzBuzzResourceAdapterFactoryBean.js";
import { FizzBuzzResourceAdapterImpl } from "../impl/resource/FizzBuzzResourceAdapterImpl.js";
import { FizzBuzzManagedConnectionFactoryImpl } from "../impl/resource/FizzBuzzResourceAdapterImpl.js";
import { FizzBuzzPropertyPlaceholderConfigurerImpl } from "../impl/config/FizzBuzzPropertyPlaceholderConfigurerImpl.js";
import type { ILifecycleManager } from "../contracts/ILifecycleManager.js";
import type { IResourceAdapter } from "../contracts/IResourceAdapter.js";
import { EnterpriseFizzBuzzPipelineFactoryBeanFactory, FizzBuzzPipelineConfigurationProfile } from "../impl/factories/EnterpriseFizzBuzzPipelineFactoryBean.js";

export class FizzBuzzEnterpriseServiceFactoryBeanFactory {
  private static instance: FizzBuzzEnterpriseService | null = null;
  private static lifecycleManager: ILifecycleManager | null = null;
  private static resourceAdapter: IResourceAdapter | null = null;
  private static propertyConfigurer: FizzBuzzPropertyPlaceholderConfigurerImpl | null = null;

  static createEnterpriseService(): FizzBuzzEnterpriseService {
    if (FizzBuzzEnterpriseServiceFactoryBeanFactory.instance === null) {
      FizzBuzzEnterpriseServiceFactoryBeanFactory.propertyConfigurer = new FizzBuzzPropertyPlaceholderConfigurerImpl();

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

      const rangeCalculator = serviceLocator.getRangeCalculator();

      const flyweightFactory = FizzBuzzStrategyFlyweightFactoryBean.createFlyweightFactory();

      const bridgeFactoryBean = FizzBuzzComputationBridgeFactoryBeanFactory.createFactoryBean(
        FizzBuzzComputationBridgeType.MODULO_DELEGATING,
        managedBean.getValueResolver(),
        rangeCalculator,
      );
      bridgeFactoryBean.setStrategyFlyweightFactory(flyweightFactory);
      const bridge: IFizzBuzzComputationBridge = bridgeFactoryBean.createBridge();

      const mediatorFactoryBean = FizzBuzzComputationMediatorFactoryBeanFactory.createFactoryBean(
        bridge,
        eventBus,
        enterpriseContext.getSessionManager(),
        transactionManager,
        sloCollector,
      );
      const mediator: IFizzBuzzComputationMediator = mediatorFactoryBean.createMediator();

      const pipelineFactoryBean = EnterpriseFizzBuzzPipelineFactoryBeanFactory.createFactoryBean(
        mediator,
        eventBus,
        [...enterpriseContext.getInterceptors()],
        fallbackDecorator,
        enterpriseContext.getResultPostProcessorChain(),
        FizzBuzzPipelineConfigurationProfile.FULL,
      );
      const pipeline: IPipeline<number, string> = pipelineFactoryBean.createPipeline();

      FizzBuzzEnterpriseServiceFactoryBeanFactory.instance = new FizzBuzzEnterpriseService(
        mediator,
        eventBus,
        pipeline,
        serviceHome,
        transactionManager,
        deploymentDescriptorReader,
        selectorFactory,
        strategySelector,
      );

      FizzBuzzEnterpriseServiceFactoryBeanFactory.initializeEnterpriseInfrastructure(
        enterpriseContext,
        FizzBuzzEnterpriseServiceFactoryBeanFactory.instance,
      );
    }
    return FizzBuzzEnterpriseServiceFactoryBeanFactory.instance;
  }

  private static initializeEnterpriseInfrastructure(
    enterpriseContext: EnterpriseApplicationContextImpl,
    service: FizzBuzzEnterpriseService,
  ): void {
    FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager =
      FizzBuzzLifecycleManagerFactoryBean.createLifecycleManager();

    const containerBean = new FizzBuzzContainerManagedBeanImpl(enterpriseContext);
    FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager.registerManagedBean(containerBean);

    const resolver = enterpriseContext.getValueResolver();
    const resolverBean = new FizzBuzzResolverLifecycleManagedBeanImpl(resolver);
    FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager.registerManagedBean(resolverBean);

    FizzBuzzEnterpriseServiceFactoryBeanFactory.resourceAdapter =
      FizzBuzzResourceAdapterFactoryBean.createResourceAdapter();
    const mcf = new FizzBuzzManagedConnectionFactoryImpl();
    FizzBuzzEnterpriseServiceFactoryBeanFactory.resourceAdapter.registerManagedConnectionFactory(mcf);
    FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager.registerManagedBean(
      FizzBuzzEnterpriseServiceFactoryBeanFactory.resourceAdapter as FizzBuzzResourceAdapterImpl,
    );

    FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager.initializeAll();
    FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager.startAll();

    const appName = FizzBuzzEnterpriseServiceFactoryBeanFactory.propertyConfigurer!
      .resolvePlaceholderOrDefault("fizzbuzz.application.name", "FizzBuzzEnterpriseEdition");
    const appVersion = FizzBuzzEnterpriseServiceFactoryBeanFactory.propertyConfigurer!
      .resolvePlaceholderOrDefault("fizzbuzz.application.version", "2.0.0-ENTERPRISE");
    const cacheEnabled = FizzBuzzEnterpriseServiceFactoryBeanFactory.propertyConfigurer!
      .resolvePlaceholderOrDefault("fizzbuzz.cache.enabled", "true");

    FizzBuzzEnterpriseServiceFactoryBeanFactory.instance!.setConfiguration(
      appName,
      appVersion,
      cacheEnabled === "true",
    );

    console.debug(
      `[EnterpriseInfrastructure] Lifecycle initialized: ${FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager.getManagedBeanNames().length} beans`,
    );
    console.debug(
      `[EnterpriseInfrastructure] Resource adapter: ${FizzBuzzEnterpriseServiceFactoryBeanFactory.resourceAdapter.getResourceAdapterName()}`,
    );
    console.debug(
      `[EnterpriseInfrastructure] Config: appName=${appName}, version=${appVersion}, cache=${cacheEnabled}`,
    );
  }

  static resetEnterpriseService(): void {
    if (FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager !== null) {
      FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager.stopAll();
      FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager.destroyAll();
      FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager = null;
    }
    if (FizzBuzzEnterpriseServiceFactoryBeanFactory.resourceAdapter !== null) {
      FizzBuzzResourceAdapterFactoryBean.resetResourceAdapter();
      FizzBuzzEnterpriseServiceFactoryBeanFactory.resourceAdapter = null;
    }
    FizzBuzzEnterpriseServiceFactoryBeanFactory.propertyConfigurer = null;
    FizzBuzzEnterpriseServiceFactoryBeanFactory.instance = null;
  }

  static getLifecycleManager(): ILifecycleManager | null {
    return FizzBuzzEnterpriseServiceFactoryBeanFactory.lifecycleManager;
  }

  static getResourceAdapter(): IResourceAdapter | null {
    return FizzBuzzEnterpriseServiceFactoryBeanFactory.resourceAdapter;
  }
}

export class FizzBuzzEnterpriseService {
  private readonly mediator: IFizzBuzzComputationMediator;
  private readonly eventBus: IComputationEventNotificationBus;
  private readonly pipeline: IPipeline<number, string> | null;
  private readonly serviceHome: object | null;
  private readonly transactionManager: object | null;
  private readonly deploymentDescriptorReader: object | null;
  private readonly selectorFactory: object | null;
  private readonly strategySelector: object | null;
  private configuredApplicationName: string = "FizzBuzzEnterpriseEdition";
  private configuredApplicationVersion: string = "2.0.0-ENTERPRISE";
  private cacheEnabled: boolean = true;

  constructor(
    mediator: IFizzBuzzComputationMediator,
    eventBus: IComputationEventNotificationBus,
    pipeline: IPipeline<number, string> | null = null,
    serviceHome: object | null = null,
    transactionManager: object | null = null,
    deploymentDescriptorReader: object | null = null,
    selectorFactory: object | null = null,
    strategySelector: object | null = null,
  ) {
    this.mediator = mediator;
    this.eventBus = eventBus;
    this.pipeline = pipeline;
    this.serviceHome = serviceHome;
    this.transactionManager = transactionManager;
    this.deploymentDescriptorReader = deploymentDescriptorReader;
    this.selectorFactory = selectorFactory;
    this.strategySelector = strategySelector;
  }

  setConfiguration(
    applicationName: string,
    applicationVersion: string,
    cacheEnabled: boolean,
  ): void {
    this.configuredApplicationName = applicationName;
    this.configuredApplicationVersion = applicationVersion;
    this.cacheEnabled = cacheEnabled;
  }

  getEventBus(): IComputationEventNotificationBus {
    return this.eventBus;
  }

  getMediator(): IFizzBuzzComputationMediator {
    return this.mediator;
  }

  resolveValue(value: number): string {
    const startTime = performance.now();
    const result = this.pipeline !== null
      ? this.pipeline.execute(value)
      : this.mediator.mediateValueResolution(value);
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
    let results: readonly string[];
    if (this.pipeline !== null) {
      const mutableResults: string[] = [];
      for (let i = start; i <= end; i++) {
        mutableResults.push(this.pipeline.execute(i));
      }
      results = mutableResults;
    } else {
      results = this.mediator.mediateRangeCalculation(start, end);
    }
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
