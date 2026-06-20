import { AbstractBaseEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator } from "../abstracts/AbstractBaseEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityOrchestrationInvoker } from "../contracts/IEnterpriseDivisibilityOrchestrationInvoker.js";

export class StandardEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "StandardEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-ORCHESTRATION-DECORATOR";

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    invoker: IEnterpriseDivisibilityOrchestrationInvoker,
    decoratorEnabled: boolean = true,
  ) {
    super(
      StandardEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME,
      StandardEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION,
      wrappedFacade,
      invoker,
      decoratorEnabled,
    );
  }

  override resolveValue(value: number): string {
    if (this.isDecoratorEnabled()) {
      return this.getInvoker().invoke(value);
    }
    return this.getWrappedFacade().resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    const result: string[] = [];
    for (let i = start; i <= end; i++) {
      result.push(this.resolveValue(i));
    }
    return result;
  }
}
