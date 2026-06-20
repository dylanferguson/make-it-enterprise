import type { IEnterpriseFizzBuzzResolutionDirective } from "./IEnterpriseFizzBuzzResolutionDirective.js";

export interface IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler {
  handleDirectiveResolution(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
  ): string;
  handleRangeDirectiveResolution(
    directive: IEnterpriseFizzBuzzResolutionDirective,
    innerResolver: (value: number) => string,
    start: number,
    end: number,
  ): readonly string[];
  setNext(
    handler: IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler,
  ): IEnterpriseFizzBuzzDirectiveResolutionMediationChainHandler;
  getHandlerName(): string;
  getHandlerPriority(): number;
}
