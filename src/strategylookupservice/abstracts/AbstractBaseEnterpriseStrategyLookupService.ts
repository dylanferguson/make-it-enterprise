import type { IEnterpriseStrategyLookupService } from "../contracts/IEnterpriseStrategyLookupService.js";

export abstract class AbstractBaseEnterpriseStrategyLookupService
  implements IEnterpriseStrategyLookupService
{
  protected abstract readonly lookupServiceName: string;
  protected abstract readonly lookupServiceVersion: string;
  protected readonly providerRegistry: Map<string, { provider: object; version: string }> = new Map();

  abstract resolveStrategyProvider(strategyName: string, version?: string): object;

  registerStrategyProvider(strategyName: string, provider: object, version: string): void {
    const existing = this.providerRegistry.get(strategyName);
    if (existing !== undefined) {
      console.debug(
        `[${this.lookupServiceName}:${this.lookupServiceVersion}] ` +
        `Overriding existing strategy provider: strategy=[${strategyName}], ` +
        `oldVersion=[${existing.version}], newVersion=[${version}]`,
      );
    }
    this.providerRegistry.set(strategyName, { provider, version });
  }

  getRegisteredStrategyNames(): readonly string[] {
    return Array.from(this.providerRegistry.keys());
  }

  getLookupServiceName(): string {
    return this.lookupServiceName;
  }

  getLookupServiceVersion(): string {
    return this.lookupServiceVersion;
  }

  isStrategyRegistered(strategyName: string): boolean {
    return this.providerRegistry.has(strategyName);
  }

  getStrategyProviderCount(): number {
    return this.providerRegistry.size;
  }
}
