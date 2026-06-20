import { AbstractBaseServiceLocator } from "../../abstracts/AbstractBaseServiceLocator.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import type { IFizzBuzzStrategyFactory } from "../../contracts/IFizzBuzzStrategyFactory.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IRangeCalculator } from "../../contracts/IRangeCalculator.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";
import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";
import type { IRemainderComputationSupervisor } from "../../contracts/IRemainderComputationSupervisor.js";
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
import { DivisibilityStrategyProviderFactoryBean } from "../factories/DivisibilityStrategyProviderFactoryBean.js";
import type { IDivisibilityStrategyProvider } from "../../contracts/IDivisibilityStrategyProvider.js";
import { FizzBuzzEnterpriseServiceComponentValidatorImpl } from "../validators/FizzBuzzEnterpriseServiceComponentValidatorImpl.js";
import type { IEnterpriseServiceComponentValidator } from "../../contracts/IEnterpriseServiceComponentValidator.js";
import { StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean } from "../factories/StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean.js";
import { SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory } from "../factories/SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.js";
import { FizzBuzzExpressionRuleSetFactoryBeanFactory } from "../factories/FizzBuzzExpressionRuleSetFactoryBeanFactory.js";
import type { IFizzBuzzExpressionEvaluator } from "../../contracts/IFizzBuzzExpressionEvaluator.js";

export class ServiceLocatorImpl extends AbstractBaseServiceLocator {
  private configurationContext: ReturnType<FizzBuzzConfigurationContext["build"]> | null = null;
  private moduloEvaluationStrategyFactoryBean: ReturnType<
    typeof ModuloEvaluationStrategyFactoryBeanFactory.createFactoryBean
  > | null = null;
  private moduloArithmeticStrategyProvider: ModuloArithmeticStrategyProviderImpl | null = null;
  private remainderComputationSupervisor: IRemainderComputationSupervisor | null = null;

  override initialize(): void {
    this.remainderComputationSupervisor =
      SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.createSingletonSupervisedDecoratedDelegationService();
    this.moduloEvaluationStrategyFactoryBean =
      ModuloEvaluationStrategyFactoryBeanFactory.createFactoryBean(
        "FizzBuzzServiceLocatorModuloEvaluationStrategyFactoryBean",
        this.remainderComputationSupervisor,
      );
    const evaluationStrategyProvider: IModuloEvaluationStrategyProvider =
      this.moduloEvaluationStrategyFactoryBean.createProvider();
    this.moduloArithmeticStrategyProvider = new ModuloArithmeticStrategyProviderImpl(evaluationStrategyProvider);
    const strategyProvider: IModuloArithmeticStrategyProvider = this.moduloArithmeticStrategyProvider;
    const registry: IStrategyRegistry = new StrategyRegistryImpl();
    const visitor = new DivisibilityCheckVisitor(strategyProvider);
    const outputFormatter: IFizzBuzzOutputFormatter = new FizzBuzzOutputFormatterImpl();
    const evaluator: IDivisibilityEvaluator = new ModuloDivisibilityEvaluatorImpl(strategyProvider);

    const divisibilityStrategyProvider: IDivisibilityStrategyProvider =
      DivisibilityStrategyProviderFactoryBean.createProvider(visitor, strategyProvider);
    const componentValidator: IEnterpriseServiceComponentValidator =
      new FizzBuzzEnterpriseServiceComponentValidatorImpl();
    const templateMethodFrameworkProvider =
      StandardModuloOperationTemplateMethodFrameworkProviderFactoryBean.createFrameworkProvider();

    const expressionEvaluator: IFizzBuzzExpressionEvaluator =
      FizzBuzzExpressionRuleSetFactoryBeanFactory.createExpressionEvaluator(outputFormatter);

    const strategyFactoryImpl = new FizzBuzzStrategyFactoryImpl(visitor, outputFormatter);
    strategyFactoryImpl.setDivisibilityStrategyProvider(divisibilityStrategyProvider);
    strategyFactoryImpl.setComponentValidator(componentValidator);
    strategyFactoryImpl.setExpressionEvaluator(expressionEvaluator);
    const strategyFactory: IFizzBuzzStrategyFactory = strategyFactoryImpl;

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

  override getModuloArithmeticStrategyProvider(): IModuloArithmeticStrategyProvider {
    this.ensureInitialized();
    if (this.moduloArithmeticStrategyProvider === null) {
      throw new Error(
        "ModuloArithmeticStrategyProvider not initialized in ServiceLocatorImpl",
      );
    }
    return this.moduloArithmeticStrategyProvider;
  }

  override getRemainderComputationSupervisor(): IRemainderComputationSupervisor {
    this.ensureInitialized();
    if (this.remainderComputationSupervisor === null) {
      throw new Error(
        "RemainderComputationSupervisor not initialized in ServiceLocatorImpl",
      );
    }
    return this.remainderComputationSupervisor;
  }
}
