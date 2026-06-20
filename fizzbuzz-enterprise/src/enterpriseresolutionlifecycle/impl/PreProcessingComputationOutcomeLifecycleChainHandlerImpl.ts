import type { IComputationOutcomeLifecycleVisitor } from "../contracts/IComputationOutcomeLifecycleVisitor.js";
import { AbstractBaseComputationOutcomeLifecycleChainHandlerImpl } from "../abstracts/AbstractBaseComputationOutcomeLifecycleChainHandlerImpl.js";

export class PreProcessingComputationOutcomeLifecycleChainHandlerImpl
  extends AbstractBaseComputationOutcomeLifecycleChainHandlerImpl
{
  constructor() {
    super(
      "PreProcessingComputationOutcomeLifecycleChainHandler",
      "1.0.0-CHAIN-PRE",
      100,
    );
  }

  handleLifecycleEvent(
    eventType: string,
    value: number,
    currentResult: string | null,
    visitor: IComputationOutcomeLifecycleVisitor,
  ): string | null {
    if (eventType === "PRE_COMPUTE") {
      return this.propagateToNext(eventType, value, `${value}`, visitor);
    }
    return this.propagateToNext(eventType, value, currentResult, visitor);
  }

  isHandlerActive(): boolean {
    return true;
  }
}
