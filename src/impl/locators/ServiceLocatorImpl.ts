import { AbstractBaseServiceLocator } from "../../abstracts/AbstractBaseServiceLocator.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import type { IFizzBuzzStrategyFactory } from "../../contracts/IFizzBuzzStrategyFactory.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IRangeCalculator } from "../../contracts/IRangeCalculator.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";
import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";
import type { IStrategyRegistry } from "../../contracts/IStrategyRegistry.js";
import type { IFizzBuzzSessionManager } from "../../contracts/IFizzBuzzSessionManager.js";
import type { IResultPostProcessorChain } from "../../contracts/IResultPostProcessorChain.js";
import { ModuloDivisibilityEvaluatorImpl } from "../evaluators/ModuloDivisibilityEvaluatorImpl.js";
import { FizzBuzzOutputFormatterImpl } from "../formatters/FizzBuzzOutputFormatterImpl.js";
import { FizzBuzzStrategyFactoryImpl } from "../factories/FizzBuzzStrategyFactoryImpl.js";
import { FizzBuzzHandlerChain } from "../handlers/FizzBuzzHandlerChain.js";
import { CompositeValueResolverImpl } from "../resolvers/CompositeValueResolverImpl.js";
import { FizzBuzzRangeCalculatorImpl } from "../calculators/FizzBuzzRangeCalculatorImpl.js";
import { ModuloArithmeticStrategyProviderImpl } from "../providers/ModuloArithmeticStrategyProviderImpl.js";
import { ModuloEvaluationStrategyFactoryBeanFactory } from "../factories/ModuloEvaluationStrategyFactoryBean.js";
import { DivisibilityCheckVisitor } from "../visitors/DivisibilityCheckVisitor.js";
import { StrategyRegistryImpl } from "../registry/StrategyRegistryImpl.js";
import { FizzBuzzConfigurationContext } from "../configuration/FizzBuzzConfigurationContext.js";
import { ValueResolverDecoratorChainBuilder } from "../builders/ValueResolverDecoratorChainBuilder.js";
import { FizzBuzzSessionManagerFactoryImpl } from "../factories/FizzBuzzSessionManagerFactoryImpl.js";
import { AuditTrailSessionInterceptor } from "../interceptors/AuditTrailSessionInterceptor.js";
import { SessionManagedResolverProxy } from "../proxies/SessionManagedResolverProxy.js";
import { ResultPostProcessorChainImpl } from "../postprocessors/ResultPostProcessorChainImpl.js";
import { ValidatingResultPostProcessorImpl } from "../postprocessors/ValidatingResultPostProcessorImpl.js";
import { FizzBuzzEnterpriseResultValidatorImpl } from "../validators/FizzBuzzEnterpriseResultValidatorImpl.js";

export class ServiceLocatorImpl extends AbstractBaseServiceLocator {
  private configurationContext: ReturnType<FizzBuzzConfigurationContext["build"]> | null = null;
  private moduloEvaluationStrategyFactoryBean: ReturnType<
    typeof ModuloEvaluationStrategyFactoryBeanFactory.createFactoryBean
  > | null = null;

  override initialize(): void {
    this.moduloEvaluationStrategyFactoryBean =
      ModuloEvaluationStrategyFactoryBeanFactory.createFactoryBean(
        "FizzBuzzServiceLocatorModuloEvaluationStrategyFactoryBean",
      );
    const evaluationStrategyProvider: IModuloEvaluationStrategyProvider =
      this.moduloEvaluationStrategyFactoryBean.createProvider();
    const strategyProvider: IModuloArithmeticStrategyProvider =
      new ModuloArithmeticStrategyProviderImpl(evaluationStrategyProvider);
    const registry: IStrategyRegistry = new StrategyRegistryImpl();
    const visitor = new DivisibilityCheckVisitor(strategyProvider);
    const outputFormatter: IFizzBuzzOutputFormatter = new FizzBuzzOutputFormatterImpl();
    const evaluator: IDivisibilityEvaluator = new ModuloDivisibilityEvaluatorImpl(strategyProvider);
    const strategyFactory: IFizzBuzzStrategyFactory = new FizzBuzzStrategyFactoryImpl(visitor, outputFormatter);

    const handlerChain = new FizzBuzzHandlerChain(strategyFactory, outputFormatter);
    const baseResolver = new CompositeValueResolverImpl(handlerChain.getHead());

    const resolverDecoratorChain = new ValueResolverDecoratorChainBuilder();
    const decoratedResolver: ICompositeValueResolver = resolverDecoratorChain
      .withCaching(true)
      .withLogging(false)
      .withValidation(true)
      .withMetrics(true)
      .build(baseResolver);

    const sessionFactory = new FizzBuzzSessionManagerFactoryImpl();
    const sessionManager: IFizzBuzzSessionManager = sessionFactory.createSessionManager();
    sessionManager.registerInterceptor(new AuditTrailSessionInterceptor());

    const postProcessorChain: IResultPostProcessorChain = new ResultPostProcessorChainImpl();
    postProcessorChain.addPostProcessor(
      new ValidatingResultPostProcessorImpl(new FizzBuzzEnterpriseResultValidatorImpl()),
    );

    const valueResolver: ICompositeValueResolver = new SessionManagedResolverProxy(
      decoratedResolver,
      sessionManager,
      postProcessorChain,
    );

    const rangeCalculator: IRangeCalculator = new FizzBuzzRangeCalculatorImpl(valueResolver);

    const configBuilder = new FizzBuzzConfigurationContext();
    this.configurationContext = configBuilder
      .withDivisibilityEvaluator(evaluator)
      .withOutputFormatter(outputFormatter)
      .withStrategyFactory(strategyFactory)
      .withValueResolver(valueResolver)
      .withRangeCalculator(rangeCalculator)
      .withModuloArithmeticStrategyProvider(strategyProvider)
      .withStrategyRegistry(registry)
      .withApplicationVersion("2.0.0-ENTERPRISE")
      .withApplicationName("FizzBuzzEnterpriseEdition")
      .build();
  }

  override getDivisibilityEvaluator(): IDivisibilityEvaluator {
    this.ensureInitialized();
    return this.configurationContext!.getDivisibilityEvaluator();
  }

  override getOutputFormatter(): IFizzBuzzOutputFormatter {
    this.ensureInitialized();
    return this.configurationContext!.getOutputFormatter();
  }

  override getStrategyFactory(): IFizzBuzzStrategyFactory {
    this.ensureInitialized();
    return this.configurationContext!.getStrategyFactory();
  }

  override getValueResolver(): ICompositeValueResolver {
    this.ensureInitialized();
    return this.configurationContext!.getValueResolver();
  }

  override getRangeCalculator(): IRangeCalculator {
    this.ensureInitialized();
    return this.configurationContext!.getRangeCalculator();
  }

  override getModuloEvaluationStrategyProvider(): IModuloEvaluationStrategyProvider {
    this.ensureInitialized();
    if (this.moduloEvaluationStrategyFactoryBean === null) {
      throw new Error(
        "ModuloEvaluationStrategyFactoryBean not initialized in ServiceLocatorImpl",
      );
    }
    return this.moduloEvaluationStrategyFactoryBean.createProvider();
  }
}
