import type { IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler } from "../contracts/IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler.js";
import type { IEnterpriseFizzBuzzResolutionDirective } from "../contracts/IEnterpriseFizzBuzzResolutionDirective.js";

export abstract class AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler
  implements IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler
{
  protected readonly handlerName: string;
  protected readonly handlerPriority: number;
  protected nextHandler: IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler | null;

  constructor(handlerName: string, handlerPriority: number = 0) {
    this.handlerName = handlerName;
    this.handlerPriority = handlerPriority;
    this.nextHandler = null;
  }

  abstract handleDirectiveResolution(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
  ): string;

  abstract handleRangeDirectiveResolution(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
    start: number,
    end: number,
  ): readonly string[];

  setNext(
    handler: IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler,
  ): IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler {
    this.nextHandler = handler;
    return handler;
  }

  getHandlerName(): string {
    return this.handlerName;
  }

  getHandlerPriority(): number {
    return this.handlerPriority;
  }

  protected proceedToNext(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
  ): string {
    if (this.nextHandler !== null) {
      return this.nextHandler.handleDirectiveResolution(directive, innerResolver);
    }
    return innerResolver(directive.getDirectiveValue());
  }

  protected proceedToNextRange(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
    start: number,
    end: number,
  ): readonly string[] {
    if (this.nextHandler !== null) {
      return this.nextHandler.handleRangeDirectiveResolution(directive, innerResolver, start, end);
    }
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(innerResolver(i));
    }
    return results;
  }
}
