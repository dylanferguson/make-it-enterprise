import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";

export interface IEnterpriseComputationStrategySelectionContext {
  getRequest(): IFizzBuzzComputationRequest;
  getRequestedValue(): number;
  getSelectionContextId(): string;
  getSelectionProfile(): string;
  setSelectedStrategyName(strategyName: string): void;
  getSelectedStrategyName(): string | null;
  setSelectionDurationMs(durationMs: number): void;
  getSelectionDurationMs(): number;
  getContextMetadata(): Map<string, unknown>;
  setContextMetadata(key: string, value: unknown): void;
}
