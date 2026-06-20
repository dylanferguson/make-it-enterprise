import { AbstractBaseEnterpriseComputationStrategySelectionFacade } from "../../abstracts/AbstractBaseEnterpriseComputationStrategySelectionFacade.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export class EnterpriseComputationStrategySelectionFacadeImpl
  extends AbstractBaseEnterpriseComputationStrategySelectionFacade
{
  private static readonly FACADE_NAME = "EnterpriseComputationStrategySelectionFacade";
  private static readonly FACADE_VERSION = "1.0.0-SELECTION-FACADE";
  private static readonly SELECTION_FACADE_NAME = "EnterpriseComputationStrategySelectionFacade";
  private static readonly SELECTION_FACADE_VERSION = "1.0.0-STRATEGY-SELECTION-FACADE";

  private readonly delegate: IFizzBuzzSingleValueResolutionFacade;

  constructor(delegate: IFizzBuzzSingleValueResolutionFacade) {
    super();
    this.delegate = delegate;
  }

  override resolveValue(value: number): string {
    this.validateResolutionValue(value);
    return this.delegate.resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.validateRangeBounds(start, end);
    return this.delegate.resolveRange(start, end);
  }

  override getFacadeName(): string {
    return EnterpriseComputationStrategySelectionFacadeImpl.FACADE_NAME;
  }

  override getFacadeVersion(): string {
    return EnterpriseComputationStrategySelectionFacadeImpl.FACADE_VERSION;
  }

  override getSelectionFacadeName(): string {
    return EnterpriseComputationStrategySelectionFacadeImpl.SELECTION_FACADE_NAME;
  }

  override getSelectionFacadeVersion(): string {
    return EnterpriseComputationStrategySelectionFacadeImpl.SELECTION_FACADE_VERSION;
  }

  getDelegate(): IFizzBuzzSingleValueResolutionFacade {
    return this.delegate;
  }
}
