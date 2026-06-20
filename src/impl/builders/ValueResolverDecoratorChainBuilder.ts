import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import { CachingValueResolverDecorator } from "../../patterns/CachingValueResolverDecorator.js";
import { LoggingValueResolverDecorator } from "../../patterns/LoggingValueResolverDecorator.js";
import { ValidatingValueResolverDecorator } from "../../patterns/ValidatingValueResolverDecorator.js";
import { MetricsValueResolverDecorator } from "../../patterns/MetricsValueResolverDecorator.js";

export class ValueResolverDecoratorChainBuilder {
  private decorateWithCaching: boolean = false;
  private decorateWithLogging: boolean = false;
  private decorateWithValidation: boolean = false;
  private decorateWithMetrics: boolean = false;

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

  build(baseResolver: ICompositeValueResolver): ICompositeValueResolver {
    let resolver: ICompositeValueResolver = baseResolver;

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
