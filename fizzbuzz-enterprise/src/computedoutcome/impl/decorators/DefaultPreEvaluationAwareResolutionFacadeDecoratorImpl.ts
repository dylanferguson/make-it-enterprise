import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandChain } from "../../contracts/index.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandRegistry } from "../../contracts/index.js";
import { AbstractBasePreEvaluationAwareResolutionFacadeDecorator } from "../../abstracts/AbstractBasePreEvaluationAwareResolutionFacadeDecorator.js";

export class DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl
  extends AbstractBasePreEvaluationAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "DefaultPreEvaluationAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-PRE-EVAL-DECORATOR";
  private static readonly FACADE_NAME_PREFIX = "PreEvaluationAware";

  private preEvaluationCount: number = 0;
  private preEvaluationHitCount: number = 0;

  constructor(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    preEvaluationCommandChain: IEnterpriseComputedOutcomePreEvaluationCommandChain,
    preEvaluationCommandRegistry: IEnterpriseComputedOutcomePreEvaluationCommandRegistry,
  ) {
    super(decoratedFacade, preEvaluationCommandChain, preEvaluationCommandRegistry);
  }

  override resolveValue(value: number): string {
    this.assertValidValue(value);
    this.preEvaluationCount++;
    if (this.preEvaluationEnabled) {
      const preEvaluated = this.preEvaluationCommandChain.evaluate(value);
      if (preEvaluated !== null) {
        this.preEvaluationHitCount++;
        console.debug(
          `[${DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME} v${DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION}] ` +
          `Pre-evaluation resolved value [${value}] -> [${preEvaluated}] ` +
          `(hitRate=[${this.getPreEvaluationHitRate()}%], ` +
          `decoratorChain=[${this.decoratedFacade.getFacadeName()}])`,
        );
        return preEvaluated;
      }
    }
    return this.decoratedFacade.resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.assertValidValue(start);
    this.assertValidValue(end);
    if (end < start) {
      throw new Error(
        `[${DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}] ` +
        `Range end [${end}] must be >= start [${start}]`,
      );
    }
    if (this.preEvaluationEnabled) {
      const results: string[] = [];
      for (let i = start; i <= end; i++) {
        results.push(this.resolveValue(i));
      }
      return results;
    }
    return this.decoratedFacade.resolveRange(start, end);
  }

  override getFacadeName(): string {
    return `${DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl.FACADE_NAME_PREFIX}::${this.decoratedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorName(): string {
    return DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getPreEvaluationCount(): number {
    return this.preEvaluationCount;
  }

  getPreEvaluationHitCount(): number {
    return this.preEvaluationHitCount;
  }

  getPreEvaluationHitRate(): string {
    if (this.preEvaluationCount === 0) return "0.00";
    return ((this.preEvaluationHitCount / this.preEvaluationCount) * 100).toFixed(2);
  }
}
