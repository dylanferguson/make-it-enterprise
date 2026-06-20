import { AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../abstracts/AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityHandler } from "../../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";

export class DefaultResolutionStrategyChainHandlerImpl
  extends AbstractBaseFizzBuzzResolutionStrategyChainOfResponsibilityHandler
  implements IFizzBuzzResolutionStrategyChainOfResponsibilityHandler
{
  private static readonly HANDLER_NAME = "DefaultResolutionStrategyChainHandler";
  private static readonly HANDLER_PRIORITY = 0;

  override canHandle(_value: number): boolean {
    return true;
  }

  override handleResolution(
    value: number,
    innerResolver: (value: number) => string,
    _context: string | null,
  ): string | null {
    return innerResolver(value);
  }

  override getHandlerName(): string {
    return DefaultResolutionStrategyChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return DefaultResolutionStrategyChainHandlerImpl.HANDLER_PRIORITY;
  }
}
