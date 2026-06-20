import type { IFizzBuzzStrategyResolutionChainHandler } from "../contracts/IFizzBuzzStrategyResolutionChainHandler.js";

export abstract class AbstractBaseFizzBuzzStrategyResolutionChainHandler
  implements IFizzBuzzStrategyResolutionChainHandler
{
  protected nextHandler: IFizzBuzzStrategyResolutionChainHandler | null = null;
  protected readonly handlerName: string;
  protected readonly handlerPriority: number;

  constructor(handlerName: string, handlerPriority: number) {
    this.handlerName = handlerName;
    this.handlerPriority = handlerPriority;
  }

  setNext(
    handler: IFizzBuzzStrategyResolutionChainHandler,
  ): IFizzBuzzStrategyResolutionChainHandler {
    this.nextHandler = handler;
    return handler;
  }

  abstract handleStrategyResolution(
    value: number,
  ): { resolved: boolean; strategyType: string; divisor: number | null };

  getHandlerName(): string {
    return this.handlerName;
  }

  getHandlerPriority(): number {
    return this.handlerPriority;
  }

  protected proceedToNext(
    value: number,
  ): { resolved: boolean; strategyType: string; divisor: number | null } {
    if (this.nextHandler === null) {
      return { resolved: false, strategyType: "UNRESOLVED", divisor: null };
    }
    return this.nextHandler.handleStrategyResolution(value);
  }
}
