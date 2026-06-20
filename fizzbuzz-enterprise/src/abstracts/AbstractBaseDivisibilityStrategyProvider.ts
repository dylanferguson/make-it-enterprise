import type { IDivisibilityStrategyProvider } from "../contracts/IDivisibilityStrategyProvider.js";
import type { IDivisibilityStrategyResolutionHandler } from "../contracts/IDivisibilityStrategyResolutionHandler.js";

export abstract class AbstractBaseDivisibilityStrategyProvider
  implements IDivisibilityStrategyProvider
{
  protected readonly resolutionHandlers: IDivisibilityStrategyResolutionHandler[] = [];

  abstract checkDivisibility(
    dividend: number,
    divisor: number,
    evaluationContext: object | null,
  ): boolean;
  abstract getProviderName(): string;
  abstract getProviderVersion(): string;

  registerResolutionHandler(handler: IDivisibilityStrategyResolutionHandler): void {
    const index = this.resolutionHandlers.findIndex(
      (h) => h.getHandlerPriority() > handler.getHandlerPriority(),
    );
    if (index === -1) {
      this.resolutionHandlers.push(handler);
    } else {
      this.resolutionHandlers.splice(index, 0, handler);
    }
    this.buildHandlerChain();
  }

  protected buildHandlerChain(): void {
    for (let i = 0; i < this.resolutionHandlers.length - 1; i++) {
      const current = this.resolutionHandlers[i];
      const next = this.resolutionHandlers[i + 1];
      if (current !== undefined && next !== undefined) {
        current.setNext(next);
      }
    }
  }

  protected getResolvedHandlers(): readonly IDivisibilityStrategyResolutionHandler[] {
    return this.resolutionHandlers;
  }
}
