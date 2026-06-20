import type { IEnterpriseComputationResolutionAdapter } from "./IEnterpriseComputationResolutionAdapter.js";

export interface IEnterpriseComputationResolutionAdapterRegistry {
  registerAdapter(adapter: IEnterpriseComputationResolutionAdapter): void;
  unregisterAdapter(adapterName: string): boolean;
  getAdapter(adapterName: string): IEnterpriseComputationResolutionAdapter | null;
  getAdaptersByDivisor(divisor: number): readonly IEnterpriseComputationResolutionAdapter[];
  getRegisteredAdapters(): readonly IEnterpriseComputationResolutionAdapter[];
  getRegisteredAdapterNames(): readonly string[];
  getAdapterCount(): number;
  getRegistryName(): string;
  getRegistryVersion(): string;
  clearRegistry(): void;
}
