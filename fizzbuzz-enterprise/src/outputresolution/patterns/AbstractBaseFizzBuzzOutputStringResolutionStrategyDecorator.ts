import { AbstractBaseFizzBuzzOutputStringResolutionStrategy } from "../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategy.js";

export abstract class AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator
  extends AbstractBaseFizzBuzzOutputStringResolutionStrategy
{
  protected readonly decoratedStrategy: AbstractBaseFizzBuzzOutputStringResolutionStrategy;

  constructor(
    decoratedStrategy: AbstractBaseFizzBuzzOutputStringResolutionStrategy,
    decoratorName: string,
    decoratorVersion: string,
    decoratorPriority: number,
    decoratorIdentifier: string,
  ) {
    super(decoratorName, decoratorVersion, decoratorPriority, decoratorIdentifier);
    this.decoratedStrategy = decoratedStrategy;
  }

  override canResolve(value: number): boolean {
    return this.decoratedStrategy.canResolve(value);
  }

  override resolve(value: number): string {
    return this.decoratedStrategy.resolve(value);
  }
}
