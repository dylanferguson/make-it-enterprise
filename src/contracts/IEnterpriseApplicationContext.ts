import type { IEnterpriseNamingContext } from "../contracts/IEnterpriseNamingContext.js";
import type { IFactoryBeanFactory } from "../contracts/IFactoryBeanFactory.js";
import type { IEnterpriseInterceptor } from "../contracts/IEnterpriseInterceptor.js";
import type { IFizzBuzzManagementMBean } from "../contracts/IFizzBuzzManagementMBean.js";
import type { IFizzBuzzDao } from "../contracts/IFizzBuzzDao.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";
import type { IFizzBuzzValueTransferObjectFactory } from "../contracts/IFizzBuzzValueTransferObjectFactory.js";
import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";
import type { IServiceLocator } from "../contracts/IServiceLocator.js";
import type { IFizzBuzzSessionManager } from "../contracts/IFizzBuzzSessionManager.js";
import type { IDivisibilityEvaluator } from "../contracts/IDivisibilityEvaluator.js";
import type { IRangeCalculator } from "../contracts/IRangeCalculator.js";
import type { IResultTransformer } from "../contracts/IResultTransformer.js";
import type { IHealthCheckAggregator } from "../contracts/IHealthCheckAggregator.js";
import type { ISloMetricsCollector } from "../contracts/ISloMetricsCollector.js";
import type { IResultPostProcessorChain } from "../contracts/IResultPostProcessorChain.js";

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
