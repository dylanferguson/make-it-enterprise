import type { IEnterpriseComputationStrategySelectionContext } from "../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";

export abstract class AbstractBaseEnterpriseComputationStrategySelectionContext
  implements IEnterpriseComputationStrategySelectionContext
{
  protected readonly request: IFizzBuzzComputationRequest;
  protected readonly selectionContextId: string;
  protected readonly selectionProfile: string;
  protected selectedStrategyName: string | null = null;
  protected selectionDurationMs: number = 0;
  protected readonly metadata: Map<string, unknown> = new Map();

  constructor(
    request: IFizzBuzzComputationRequest,
    selectionContextId: string,
    selectionProfile: string = "STANDARD",
  ) {
    this.request = request;
    this.selectionContextId = selectionContextId;
    this.selectionProfile = selectionProfile;
  }

  abstract getRequestedValue(): number;

  getRequest(): IFizzBuzzComputationRequest {
    return this.request;
  }

  getSelectionContextId(): string {
    return this.selectionContextId;
  }

  getSelectionProfile(): string {
    return this.selectionProfile;
  }

  setSelectedStrategyName(strategyName: string): void {
    this.selectedStrategyName = strategyName;
  }

  getSelectedStrategyName(): string | null {
    return this.selectedStrategyName;
  }

  setSelectionDurationMs(durationMs: number): void {
    this.selectionDurationMs = durationMs;
  }

  getSelectionDurationMs(): number {
    return this.selectionDurationMs;
  }

  getContextMetadata(): Map<string, unknown> {
    return this.metadata;
  }

  setContextMetadata(key: string, value: unknown): void {
    this.metadata.set(key, value);
  }
}
