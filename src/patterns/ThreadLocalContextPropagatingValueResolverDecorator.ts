import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export class ThreadLocalContextPropagatingValueResolverDecorator implements ICompositeValueResolver {
  private static readonly GLOBAL_INSTANCE_COUNTER = new Map<string, number>();
  private static readonly EVALUATION_DEPTH_KEY = "FizzBuzzEvaluationDepth";
  private static readonly CONTEXT_CORRELATION_KEY = "FizzBuzzContextCorrelation";

  private readonly decorated: ICompositeValueResolver;
  private readonly decoratorId: string;
  private readonly threadLocalEvaluationDepth: Map<string, number> = new Map();

  constructor(decorated: ICompositeValueResolver) {
    this.decorated = decorated;
    const currentCount = ThreadLocalContextPropagatingValueResolverDecorator.GLOBAL_INSTANCE_COUNTER.get(
      "ThreadLocalContextPropagatingValueResolverDecorator",
    ) ?? 0;
    ThreadLocalContextPropagatingValueResolverDecorator.GLOBAL_INSTANCE_COUNTER.set(
      "ThreadLocalContextPropagatingValueResolverDecorator",
      currentCount + 1,
    );
    this.decoratorId = `ThreadLocalContextPropagatingDecorator:${currentCount + 1}`;
  }

  resolve(value: number): string {
    const depth = this.threadLocalEvaluationDepth.get(ThreadLocalContextPropagatingValueResolverDecorator.EVALUATION_DEPTH_KEY) ?? 0;
    this.threadLocalEvaluationDepth.set(
      ThreadLocalContextPropagatingValueResolverDecorator.EVALUATION_DEPTH_KEY,
      depth + 1,
    );
    this.threadLocalEvaluationDepth.set(
      `${ThreadLocalContextPropagatingValueResolverDecorator.CONTEXT_CORRELATION_KEY}:${value}`,
      Date.now(),
    );
    try {
      return this.decorated.resolve(value);
    } finally {
      this.threadLocalEvaluationDepth.set(
        ThreadLocalContextPropagatingValueResolverDecorator.EVALUATION_DEPTH_KEY,
        depth,
      );
      this.threadLocalEvaluationDepth.delete(
        `${ThreadLocalContextPropagatingValueResolverDecorator.CONTEXT_CORRELATION_KEY}:${value}`,
      );
    }
  }

  getDecoratorId(): string {
    return this.decoratorId;
  }

  getCurrentEvaluationDepth(): number {
    return this.threadLocalEvaluationDepth.get(
      ThreadLocalContextPropagatingValueResolverDecorator.EVALUATION_DEPTH_KEY,
    ) ?? 0;
  }

  getDecoratedResolver(): ICompositeValueResolver {
    return this.decorated;
  }
}
