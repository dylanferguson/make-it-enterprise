import type { IEnterpriseOutputCompositeStrategyProvider } from "../contracts/IEnterpriseOutputCompositeStrategyProvider.js";
import type { IEnterpriseOutputCompositeRegistry } from "../contracts/IEnterpriseOutputCompositeRegistry.js";

export abstract class AbstractBaseEnterpriseOutputCompositeStrategyProvider
  implements IEnterpriseOutputCompositeStrategyProvider
{
  private static readonly PROVIDER_FRAMEWORK_VERSION = "1.0.0-PROVIDER-FRAMEWORK";

  protected readonly providerName: string;
  protected readonly providerVersion: string;
  protected readonly compositeSeparator: string;
  protected compositeResolutionEnabled: boolean;
  protected registry: IEnterpriseOutputCompositeRegistry | null = null;

  constructor(
    providerName: string,
    providerVersion: string,
    compositeSeparator: string,
    compositeResolutionEnabled: boolean,
  ) {
    this.providerName = providerName;
    this.providerVersion = providerVersion;
    this.compositeSeparator = compositeSeparator;
    this.compositeResolutionEnabled = compositeResolutionEnabled;
  }

  abstract resolveCompositeOutput(value: number): string;

  getProviderName(): string {
    return this.providerName;
  }

  getProviderVersion(): string {
    return this.providerVersion;
  }

  getCompositeSeparator(): string {
    return this.compositeSeparator;
  }

  isCompositeResolutionEnabled(): boolean {
    return this.compositeResolutionEnabled;
  }

  setCompositeResolutionEnabled(enabled: boolean): void {
    this.compositeResolutionEnabled = enabled;
  }

  setRegistry(registry: IEnterpriseOutputCompositeRegistry): void {
    this.registry = registry;
  }

  getRegistry(): IEnterpriseOutputCompositeRegistry | null {
    return this.registry;
  }

  protected getProviderFrameworkVersion(): string {
    return AbstractBaseEnterpriseOutputCompositeStrategyProvider.PROVIDER_FRAMEWORK_VERSION;
  }
}
