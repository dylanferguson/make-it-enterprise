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

      FizzBuzzEnterpriseServiceFactoryBeanFactory.instance = new FizzBuzzEnterpriseService(
        daoWrappingResolver,
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

  constructor(
    valueResolver: ICompositeValueResolver,
  ) {
    this.valueResolver = valueResolver;
  }

  resolveValue(value: number): string {
    return this.valueResolver.resolve(value);
  }

  calculateRange(start: number, end: number): readonly string[] {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => this.resolveValue(start + index));
  }
}
