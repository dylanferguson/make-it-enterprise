import type { IEnterpriseNamingContext } from "./IEnterpriseNamingContext.js";
import type { IFactoryBeanFactory } from "./IFactoryBeanFactory.js";
import type { IEnterpriseInterceptor } from "./IEnterpriseInterceptor.js";
import type { IFizzBuzzManagementMBean } from "./IFizzBuzzManagementMBean.js";
import type { IFizzBuzzDao } from "./IFizzBuzzDao.js";
import type { IFizzBuzzSpecification } from "./IFizzBuzzSpecification.js";
import type { IFizzBuzzValueTransferObjectFactory } from "./IFizzBuzzValueTransferObjectFactory.js";
import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";
import type { IServiceLocator } from "./IServiceLocator.js";
import type { IFizzBuzzSessionManager } from "./IFizzBuzzSessionManager.js";
import type { IDivisibilityEvaluator } from "./IDivisibilityEvaluator.js";
import type { IRangeCalculator } from "./IRangeCalculator.js";
import type { IResultTransformer } from "./IResultTransformer.js";
import type { IHealthCheckAggregator } from "./IHealthCheckAggregator.js";
import type { ISloMetricsCollector } from "./ISloMetricsCollector.js";
import type { IResultPostProcessorChain } from "./IResultPostProcessorChain.js";

export interface IEnterpriseApplicationContext {
  getServiceLocator(): IServiceLocator;
  getNamingContext(): IEnterpriseNamingContext;
  getFactoryBeanFactory(): IFactoryBeanFactory;
  getManagementMBean(): IFizzBuzzManagementMBean;
  getFizzBuzzDao(): IFizzBuzzDao;
  getValueResolver(): ICompositeValueResolver;
  getRangeCalculator(): IRangeCalculator;
  getDivisibilityEvaluator(): IDivisibilityEvaluator;
  getSessionManager(): IFizzBuzzSessionManager;
  getHealthCheckAggregator(): IHealthCheckAggregator;
  getSloMetricsCollector(): ISloMetricsCollector;
  getResultPostProcessorChain(): IResultPostProcessorChain;
  getInterceptors(): readonly IEnterpriseInterceptor[];
  getResultTransformers(): readonly IResultTransformer[];
  getDivisibleByThreeSpecification(): IFizzBuzzSpecification;
  getDivisibleByFiveSpecification(): IFizzBuzzSpecification;
  getDivisibleByFifteenSpecification(): IFizzBuzzSpecification;
  getTransferObjectFactory(): IFizzBuzzValueTransferObjectFactory;
  getApplicationName(): string;
  getApplicationVersion(): string;
}
