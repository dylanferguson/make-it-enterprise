import { AbstractBaseFizzBuzzOutputStringResolutionStrategy } from "../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategy.js";
import { AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator } from "./AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator.js";

export class LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl
  extends AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator
{
  private static readonly DECORATOR_NAME = "LoggingFizzBuzzOutputStringResolutionStrategyDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-LOGGING-OUTPUT-DECORATOR";
  private static readonly DECORATOR_PRIORITY = -40;
  private static readonly RESOLVED_IDENTIFIER = "LOGGING_OUTPUT_STRATEGY_DECORATOR";
  private static invocationCounter = 0;

  constructor(decoratedStrategy: AbstractBaseFizzBuzzOutputStringResolutionStrategy) {
    super(
      decoratedStrategy,
      LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_NAME,
      LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_VERSION,
      LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_PRIORITY,
      LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.RESOLVED_IDENTIFIER,
    );
  }

  override resolve(value: number): string {
    LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.invocationCounter++;
    const invocationId = LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.invocationCounter;
    console.debug(
      `[${LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_NAME}] ` +
      `Invocation #${invocationId}: resolving output string for value=${value}`,
    );
    const result = this.decoratedStrategy.resolve(value);
    console.debug(
      `[${LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_NAME}] ` +
      `Invocation #${invocationId}: resolved result="${result}" for value=${value}`,
    );
    return result;
  }

  static getInvocationCount(): number {
    return LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.invocationCounter;
  }

  static resetInvocationCount(): void {
    LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.invocationCounter = 0;
  }
}
