import type { IDivisibilityValidationEnforcementGate } from "../../contracts/IDivisibilityValidationEnforcementGate.js";
import { AbstractBaseDivisibilityValidationEnforcementGateFactoryBean } from "../../abstracts/AbstractBaseDivisibilityValidationEnforcementGateFactoryBean.js";
import { DefaultDivisibilityValidationEnforcementGateImpl } from "./DefaultDivisibilityValidationEnforcementGateImpl.js";
import { LoggingDivisibilityValidationEnforcementGateDecoratorImpl } from "./decorators/LoggingDivisibilityValidationEnforcementGateDecoratorImpl.js";
import { CachingDivisibilityValidationEnforcementGateDecoratorImpl } from "./decorators/CachingDivisibilityValidationEnforcementGateDecoratorImpl.js";
import { MetricsCollectingDivisibilityValidationEnforcementGateDecoratorImpl } from "./decorators/MetricsCollectingDivisibilityValidationEnforcementGateDecoratorImpl.js";
import { PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl } from "./decorators/PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.js";
import { SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl } from "./decorators/SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.js";
import { CompositeDivisibilityValidationEnforcementSpecificationProviderImpl } from "./CompositeDivisibilityValidationEnforcementSpecificationProviderImpl.js";
import { DefaultValidationEnforcementMetricsCollectorImpl } from "./DefaultValidationEnforcementMetricsCollectorImpl.js";

export class DefaultDivisibilityValidationEnforcementGateFactoryBeanImpl
  extends AbstractBaseDivisibilityValidationEnforcementGateFactoryBean
{
  private static readonly FACTORY_BEAN_NAME = "DefaultDivisibilityValidationEnforcementGateFactoryBeanImpl";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-GATE-FACTORY-BEAN";

  constructor(validationProfile: string = "STANDARD_STRICT") {
    super(validationProfile);
  }

  override getFactoryBeanName(): string {
    return DefaultDivisibilityValidationEnforcementGateFactoryBeanImpl.FACTORY_BEAN_NAME;
  }

  override getFactoryBeanVersion(): string {
    return DefaultDivisibilityValidationEnforcementGateFactoryBeanImpl.FACTORY_BEAN_VERSION;
  }

  override createGate(): IDivisibilityValidationEnforcementGate {
    const resolvedSpecProvider = this.specificationProvider
      ?? new CompositeDivisibilityValidationEnforcementSpecificationProviderImpl();
    const resolvedMetricsCollector = this.metricsCollector
      ?? new DefaultValidationEnforcementMetricsCollectorImpl();

    const coreGate = new DefaultDivisibilityValidationEnforcementGateImpl();

    const policyDecorator = new PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl(
      coreGate,
      resolvedMetricsCollector,
    );

    const loggingDecorator = new LoggingDivisibilityValidationEnforcementGateDecoratorImpl(
      policyDecorator,
    );

    const specificationDecorator = new SpecificationEnforcingDivisibilityValidationEnforcementGateDecoratorImpl(
      loggingDecorator,
      resolvedSpecProvider,
      resolvedMetricsCollector,
    );

    const cachingDecorator = new CachingDivisibilityValidationEnforcementGateDecoratorImpl(
      specificationDecorator,
    );

    const metricsDecorator = new MetricsCollectingDivisibilityValidationEnforcementGateDecoratorImpl(
      cachingDecorator,
      resolvedMetricsCollector,
    );

    return metricsDecorator;
  }
}
