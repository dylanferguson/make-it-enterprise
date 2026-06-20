import type { IComputationOutcomeLifecycleChainHandler } from "../contracts/IComputationOutcomeLifecycleChainHandler.js";
import type { IComputationOutcomeLifecycleVisitor } from "../contracts/IComputationOutcomeLifecycleVisitor.js";

export abstract class AbstractBaseComputationOutcomeLifecycleChainHandlerImpl
  implements IComputationOutcomeLifecycleChainHandler
{
  private readonly _handlerName: string;
  private readonly _handlerVersion: string;
  private readonly _handlerPriority: number;
  private _nextHandler: IComputationOutcomeLifecycleChainHandler | null = null;

  constructor(
    handlerName: string,
    handlerVersion: string,
    handlerPriority: number,
  ) {
    this._handlerName = handlerName;
    this._handlerVersion = handlerVersion;
    this._handlerPriority = handlerPriority;
  }

  getHandlerName(): string {
    return this._handlerName;
  }

  getHandlerVersion(): string {
    return this._handlerVersion;
  }

  getHandlerPriority(): number {
    return this._handlerPriority;
  }

  setNextHandler(handler: IComputationOutcomeLifecycleChainHandler | null): void {
    this._nextHandler = handler;
  }

  getNextHandler(): IComputationOutcomeLifecycleChainHandler | null {
    return this._nextHandler;
  }

  abstract handleLifecycleEvent(
    eventType: string,
    value: number,
    currentResult: string | null,
    visitor: IComputationOutcomeLifecycleVisitor,
  ): string | null;

  abstract isHandlerActive(): boolean;

  protected propagateToNext(
    eventType: string,
    value: number,
    currentResult: string | null,
    visitor: IComputationOutcomeLifecycleVisitor,
  ): string | null {
    if (this._nextHandler !== null) {
      return this._nextHandler.handleLifecycleEvent(eventType, value, currentResult, visitor);
    }
    return currentResult;
  }
}
