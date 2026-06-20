import { AbstractBaseFizzBuzzOutputStringResolutionStrategy } from "../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategy.js";
import { AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator } from "./AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator.js";

export class MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl
  extends AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator
{
  private static readonly DECORATOR_NAME = "MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-METRICS-OUTPUT-DECORATOR";
  private static readonly DECORATOR_PRIORITY = -30;
  private static readonly RESOLVED_IDENTIFIER = "METRICS_COLLECTING_OUTPUT_STRATEGY_DECORATOR";

  private static totalResolutionTime = 0;
  private static totalResolutions = 0;

  constructor(decoratedStrategy: AbstractBaseFizzBuzzOutputStringResolutionStrategy) {
    super(
      decoratedStrategy,
      MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_NAME,
      MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_VERSION,
      MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_PRIORITY,
      MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.RESOLVED_IDENTIFIER,
    );
  }

  override resolve(value: number): string {
    const startTime = performance.now();
    try {
      const result = this.decoratedStrategy.resolve(value);
      return result;
    } finally {
      const elapsed = performance.now() - startTime;
      MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.totalResolutionTime += elapsed;
      MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.totalResolutions++;
    }
  }

  static getAverageResolutionTimeMs(): number {
    if (MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.totalResolutions === 0) {
      return 0;
    }
    return MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.totalResolutionTime /
      MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.totalResolutions;
  }

  static getTotalResolutions(): number {
    return MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.totalResolutions;
  }

  static resetMetrics(): void {
    MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.totalResolutionTime = 0;
    MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.totalResolutions = 0;
  }
}
