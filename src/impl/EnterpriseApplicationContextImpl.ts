import type { IEnterpriseApplicationContext } from "../contracts/IEnterpriseApplicationContext.js";
import type { IServiceLocator } from "../contracts/IServiceLocator.js";
import type { IEnterpriseNamingContext } from "../contracts/IEnterpriseNamingContext.js";
import type { IFactoryBeanFactory } from "../contracts/IFactoryBeanFactory.js";
import type { IFizzBuzzManagementMBean } from "../contracts/IFizzBuzzManagementMBean.js";
import type { IFizzBuzzDao } from "../contracts/IFizzBuzzDao.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";
import type { IFizzBuzzValueTransferObjectFactory } from "../contracts/IFizzBuzzValueTransferObjectFactory.js";
import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";
import type { IRangeCalculator } from "../contracts/IRangeCalculator.js";
import type { IDivisibilityEvaluator } from "../contracts/IDivisibilityEvaluator.js";
import type { IFizzBuzzSessionManager } from "../contracts/IFizzBuzzSessionManager.js";
import type { IEnterpriseInterceptor } from "../contracts/IEnterpriseInterceptor.js";
import type { IResultTransformer } from "../contracts/IResultTransformer.js";
import type { IHealthCheckAggregator } from "../contracts/IHealthCheckAggregator.js";
import type { ISloMetricsCollector } from "../contracts/ISloMetricsCollector.js";
import type { IResultPostProcessorChain } from "../contracts/IResultPostProcessorChain.js";
import { DivisibleBySpecification } from "./specifications/DivisibleBySpecification.js";
import { AlwaysTrueSpecification } from "./specifications/AlwaysTrueSpecification.js";
import { FizzBuzzValueTransferObjectFactoryImpl } from "./factories/FizzBuzzValueTransferObjectFactoryImpl.js";
import { FizzBuzzDaoImpl } from "./dao/FizzBuzzDaoImpl.js";
import { EnterpriseNamingContextImpl } from "./naming/EnterpriseNamingContextImpl.js";
import { FizzBuzzManagementMBeanImpl } from "./management/FizzBuzzManagementMBeanImpl.js";
import { FactoryBeanFactoryImpl } from "./factories/FactoryBeanFactoryImpl.js";
import { LoggingEnterpriseInterceptor } from "./interceptors/enterprise/LoggingEnterpriseInterceptor.js";
import { TimingEnterpriseInterceptor } from "./interceptors/enterprise/TimingEnterpriseInterceptor.js";
import { NormalizingResultTransformerImpl } from "./transformers/NormalizingResultTransformerImpl.js";
import { FizzBuzzSessionManagerImpl } from "./session/FizzBuzzSessionManagerImpl.js";
import { AuditTrailSessionInterceptor } from "./interceptors/AuditTrailSessionInterceptor.js";
import { ValidatingResultPostProcessorImpl } from "./postprocessors/ValidatingResultPostProcessorImpl.js";
import { FizzBuzzEnterpriseResultValidatorImpl } from "./validators/FizzBuzzEnterpriseResultValidatorImpl.js";
import { ResultPostProcessorChainImpl } from "./postprocessors/ResultPostProcessorChainImpl.js";
import { ModuloDivisibilityEvaluatorImpl } from "./evaluators/ModuloDivisibilityEvaluatorImpl.js";
import { FizzBuzzOutputFormatterImpl } from "./formatters/FizzBuzzOutputFormatterImpl.js";
import { FizzBuzzStrategyFactoryImpl } from "./factories/FizzBuzzStrategyFactoryImpl.js";
import type { ServiceLocatorImpl } from "./locators/ServiceLocatorImpl.js";

export class EnterpriseApplicationContextImpl implements IEnterpriseApplicationContext {
  private readonly applicationName: string;
  private readonly applicationVersion: string;
  private readonly serviceLocator: ServiceLocatorImpl;
  private readonly namingContext: EnterpriseNamingContextImpl;
  private readonly factoryBeanFactory: FactoryBeanFactoryImpl;
  private readonly managementMBean: FizzBuzzManagementMBeanImpl;
  private readonly fizzBuzzDao: FizzBuzzDaoImpl;
  private readonly transferObjectFactory: FizzBuzzValueTransferObjectFactoryImpl;
  private readonly interceptors: IEnterpriseInterceptor[];
  private readonly resultTransformers: IResultTransformer[];
  private readonly divisibleByThreeSpec: DivisibleBySpecification;
  private readonly divisibleByFiveSpec: DivisibleBySpecification;
  private readonly divisibleByFifteenSpec: IFizzBuzzSpecification;
  private readonly sessionManager: FizzBuzzSessionManagerImpl;
  private readonly healthCheckAggregator: IHealthCheckAggregator;
  private readonly sloMetricsCollector: ISloMetricsCollector;
  private readonly resultPostProcessorChain: ResultPostProcessorChainImpl;

  constructor(
    serviceLocator: ServiceLocatorImpl,
    healthCheckAggregator: IHealthCheckAggregator,
    sloMetricsCollector: ISloMetricsCollector,
    applicationName: string = "FizzBuzzEnterpriseEdition",
    applicationVersion: string = "2.0.0-ENTERPRISE",
  ) {
    this.applicationName = applicationName;
    this.applicationVersion = applicationVersion;
    this.serviceLocator = serviceLocator;
    this.healthCheckAggregator = healthCheckAggregator;
    this.sloMetricsCollector = sloMetricsCollector;
    this.namingContext = new EnterpriseNamingContextImpl();
    this.factoryBeanFactory = new FactoryBeanFactoryImpl();
    this.fizzBuzzDao = new FizzBuzzDaoImpl();
    this.transferObjectFactory = new FizzBuzzValueTransferObjectFactoryImpl();
    this.interceptors = [
      new LoggingEnterpriseInterceptor(),
      new TimingEnterpriseInterceptor(),
    ];
    this.resultTransformers = [new NormalizingResultTransformerImpl()];

    this.sessionManager = new FizzBuzzSessionManagerImpl();
    this.sessionManager.registerInterceptor(new AuditTrailSessionInterceptor());

    this.resultPostProcessorChain = new ResultPostProcessorChainImpl();
    this.resultPostProcessorChain.addPostProcessor(
      new ValidatingResultPostProcessorImpl(new FizzBuzzEnterpriseResultValidatorImpl()),
    );

    const evaluator = serviceLocator.getDivisibilityEvaluator();
    this.divisibleByThreeSpec = new DivisibleBySpecification(3, evaluator);
    this.divisibleByFiveSpec = new DivisibleBySpecification(5, evaluator);
    this.divisibleByFifteenSpec = this.divisibleByThreeSpec.and(this.divisibleByFiveSpec);

    this.managementMBean = new FizzBuzzManagementMBeanImpl(
      applicationName,
      applicationVersion,
      this.healthCheckAggregator,
      this.sloMetricsCollector,
    );

    this.namingContext.bind("java:comp/env/fizzbuzz/ServiceLocator", this.serviceLocator);
    this.namingContext.bind("java:comp/env/fizzbuzz/ManagementMBean", this.managementMBean);
    this.namingContext.bind("java:comp/env/fizzbuzz/FizzBuzzDao", this.fizzBuzzDao);
    this.namingContext.bind("java:comp/env/fizzbuzz/TransferObjectFactory", this.transferObjectFactory);
  }

  getServiceLocator(): IServiceLocator { return this.serviceLocator; }
  getNamingContext(): IEnterpriseNamingContext { return this.namingContext; }
  getFactoryBeanFactory(): IFactoryBeanFactory { return this.factoryBeanFactory; }
  getManagementMBean(): IFizzBuzzManagementMBean { return this.managementMBean; }
  getFizzBuzzDao(): IFizzBuzzDao { return this.fizzBuzzDao; }
  getTransferObjectFactory(): IFizzBuzzValueTransferObjectFactory { return this.transferObjectFactory; }
  getInterceptors(): readonly IEnterpriseInterceptor[] { return this.interceptors; }
  getResultTransformers(): readonly IResultTransformer[] { return this.resultTransformers; }
  getDivisibleByThreeSpecification(): IFizzBuzzSpecification { return this.divisibleByThreeSpec; }
  getDivisibleByFiveSpecification(): IFizzBuzzSpecification { return this.divisibleByFiveSpec; }
  getDivisibleByFifteenSpecification(): IFizzBuzzSpecification { return this.divisibleByFifteenSpec; }
  getApplicationName(): string { return this.applicationName; }
  getApplicationVersion(): string { return this.applicationVersion; }
  getValueResolver(): ICompositeValueResolver { return this.serviceLocator.getValueResolver(); }
  getRangeCalculator(): IRangeCalculator { return this.serviceLocator.getRangeCalculator(); }
  getDivisibilityEvaluator(): IDivisibilityEvaluator { return this.serviceLocator.getDivisibilityEvaluator(); }
  getSessionManager(): IFizzBuzzSessionManager { return this.sessionManager; }
  getHealthCheckAggregator(): IHealthCheckAggregator { return this.healthCheckAggregator; }
  getSloMetricsCollector(): ISloMetricsCollector { return this.sloMetricsCollector; }
  getResultPostProcessorChain(): IResultPostProcessorChain { return this.resultPostProcessorChain; }
}
