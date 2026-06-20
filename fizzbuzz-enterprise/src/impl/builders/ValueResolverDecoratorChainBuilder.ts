import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IComputationPolicyDecisionPoint } from "../../contracts/IComputationPolicyDecisionPoint.js";
import { CachingValueResolverDecorator } from "../../patterns/CachingValueResolverDecorator.js";
import { LoggingValueResolverDecorator } from "../../patterns/LoggingValueResolverDecorator.js";
import { ValidatingValueResolverDecorator } from "../../patterns/ValidatingValueResolverDecorator.js";
import { MetricsValueResolverDecorator } from "../../patterns/MetricsValueResolverDecorator.js";
import { PolicyEnforcingValueResolverDecorator } from "../../patterns/PolicyEnforcingValueResolverDecorator.js";
import { ComputationPolicyDecisionPointFactoryBeanFactory } from "../factories/ComputationPolicyDecisionPointFactoryBeanFactory.js";

export class ValueResolverDecoratorChainBuilder {
  private decorateWithCaching: boolean = false;
  private decorateWithLogging: boolean = false;
  private decorateWithValidation: boolean = false;
  private decorateWithMetrics: boolean = false;
  private decorateWithPolicyEnforcement: boolean = false;
  private policyDecisionPoint: IComputationPolicyDecisionPoint | null = null;

  withCaching(enabled: boolean = true): this {
    this.decorateWithCaching = enabled;
    return this;
  }

  withLogging(enabled: boolean = true): this {
    this.decorateWithLogging = enabled;
    return this;
  }

  withValidation(enabled: boolean = true): this {
    this.decorateWithValidation = enabled;
    return this;
  }

  withMetrics(enabled: boolean = true): this {
    this.decorateWithMetrics = enabled;
    return this;
  }

  withPolicyEnforcement(
    enabled: boolean = true,
    decisionPoint?: IComputationPolicyDecisionPoint,
  ): this {
    this.decorateWithPolicyEnforcement = enabled;
    if (decisionPoint !== undefined) {
      this.policyDecisionPoint = decisionPoint;
    }
    return this;
  }

  build(baseResolver: ICompositeValueResolver): ICompositeValueResolver {
    let resolver: ICompositeValueResolver = baseResolver;

    if (this.decorateWithPolicyEnforcement) {
      const decisionPoint =
        this.policyDecisionPoint ??
        ComputationPolicyDecisionPointFactoryBeanFactory.createSingletonDecisionPoint();
      resolver = new PolicyEnforcingValueResolverDecorator(resolver, decisionPoint);
    }
    if (this.decorateWithMetrics) {
      resolver = new MetricsValueResolverDecorator(resolver);
    }
    if (this.decorateWithCaching) {
      resolver = new CachingValueResolverDecorator(resolver);
    }
    if (this.decorateWithValidation) {
      resolver = new ValidatingValueResolverDecorator(resolver);
    }
    if (this.decorateWithLogging) {
      resolver = new LoggingValueResolverDecorator(resolver);
    }

    return resolver;
  }
}
