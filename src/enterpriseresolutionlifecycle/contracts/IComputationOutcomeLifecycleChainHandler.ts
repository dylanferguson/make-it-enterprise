import type { IComputationOutcomeLifecycleVisitor } from "./IComputationOutcomeLifecycleVisitor.js";

export interface IComputationOutcomeLifecycleChainHandler {
  getHandlerName(): string;
  getHandlerVersion(): string;
  getHandlerPriority(): number;
  setNextHandler(handler: IComputationOutcomeLifecycleChainHandler | null): void;
  getNextHandler(): IComputationOutcomeLifecycleChainHandler | null;
  handleLifecycleEvent(
    eventType: string,
    value: number,
    currentResult: string | null,
    visitor: IComputationOutcomeLifecycleVisitor,
  ): string | null;
  isHandlerActive(): boolean;
}
