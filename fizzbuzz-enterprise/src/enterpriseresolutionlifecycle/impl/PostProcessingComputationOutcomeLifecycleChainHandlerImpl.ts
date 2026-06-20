import type { IComputationOutcomeLifecycleVisitor } from "../contracts/IComputationOutcomeLifecycleVisitor.js";
import { AbstractBaseComputationOutcomeLifecycleChainHandlerImpl } from "../abstracts/AbstractBaseComputationOutcomeLifecycleChainHandlerImpl.js";

export class PostProcessingComputationOutcomeLifecycleChainHandlerImpl
  extends AbstractBaseComputationOutcomeLifecycleChainHandlerImpl
{
  constructor() {
    super(
      "PostProcessingComputationOutcomeLifecycleChainHandler",
      "1.0.0-CHAIN-POST",
      300,
    );
  }

  handleLifecycleEvent(
    eventType: string,
    value: number,
    currentResult: string | null,
    visitor: IComputationOutcomeLifecycleVisitor,
  ): string | null {
    return this.propagateToNext(eventType, value, currentResult, visitor);
  }

  isHandlerActive(): boolean {
    return true;
  }
}
