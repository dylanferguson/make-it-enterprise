import { AbstractBaseEnterpriseComputationStrategySelectionContext } from "../../abstracts/AbstractBaseEnterpriseComputationStrategySelectionContext.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";

export class EnterpriseComputationStrategySelectionContextImpl extends AbstractBaseEnterpriseComputationStrategySelectionContext {
  private static readonly CONTEXT_NAME = "EnterpriseComputationStrategySelectionContext";
  private static readonly CONTEXT_VERSION = "1.0.0-CONTEXT-IMPL";

  constructor(
    request: IFizzBuzzComputationRequest,
    selectionContextId: string,
    selectionProfile: string = "STANDARD",
  ) {
    super(request, selectionContextId, selectionProfile);
  }

  override getRequestedValue(): number {
    return this.request.getRequestedValue();
  }

  getContextName(): string {
    return EnterpriseComputationStrategySelectionContextImpl.CONTEXT_NAME;
  }

  getContextVersion(): string {
    return EnterpriseComputationStrategySelectionContextImpl.CONTEXT_VERSION;
  }
}
