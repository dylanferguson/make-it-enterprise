import type { IEnterpriseComputationResolutionAdapter } from "./IEnterpriseComputationResolutionAdapter.js";

export interface IEnterpriseComputationResolutionAdapterChainHandler {
  setNextHandler(handler: IEnterpriseComputationResolutionAdapterChainHandler): void;
  getNextHandler(): IEnterpriseComputationResolutionAdapterChainHandler | null;
  handleResolution(value: number, adapters: readonly IEnterpriseComputationResolutionAdapter[]): string | null;
  getHandlerName(): string;
  getHandlerVersion(): string;
  getHandlerOrder(): number;
}
