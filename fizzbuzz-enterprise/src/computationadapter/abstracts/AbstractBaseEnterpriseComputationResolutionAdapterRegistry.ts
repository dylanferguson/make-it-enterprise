import type { IEnterpriseComputationResolutionAdapter } from "../contracts/IEnterpriseComputationResolutionAdapter.js";
import type { IEnterpriseComputationResolutionAdapterRegistry } from "../contracts/IEnterpriseComputationResolutionAdapterRegistry.js";

export abstract class AbstractBaseEnterpriseComputationResolutionAdapterRegistry
  implements IEnterpriseComputationResolutionAdapterRegistry
{
  protected readonly registryName: string;
  protected readonly registryVersion: string;
  protected readonly adapters: Map<string, IEnterpriseComputationResolutionAdapter>;

  constructor(registryName: string, registryVersion: string) {
    this.registryName = registryName;
    this.registryVersion = registryVersion;
    this.adapters = new Map<string, IEnterpriseComputationResolutionAdapter>();
  }

  registerAdapter(adapter: IEnterpriseComputationResolutionAdapter): void {
    this.adapters.set(adapter.getAdapterName(), adapter);
  }

  unregisterAdapter(adapterName: string): boolean {
    return this.adapters.delete(adapterName);
  }

  getAdapter(adapterName: string): IEnterpriseComputationResolutionAdapter | null {
    return this.adapters.get(adapterName) ?? null;
  }

  getAdaptersByDivisor(divisor: number): readonly IEnterpriseComputationResolutionAdapter[] {
    return Array.from(this.adapters.values()).filter(
      (a) => a.getAdapterDivisor() === divisor,
    );
  }

  getRegisteredAdapters(): readonly IEnterpriseComputationResolutionAdapter[] {
    return Array.from(this.adapters.values());
  }

  getRegisteredAdapterNames(): readonly string[] {
    return Array.from(this.adapters.keys());
  }

  getAdapterCount(): number {
    return this.adapters.size;
  }

  getRegistryName(): string {
    return this.registryName;
  }

  getRegistryVersion(): string {
    return this.registryVersion;
  }

  abstract clearRegistry(): void;
}
