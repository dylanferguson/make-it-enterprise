import type { IMessagePropertyResolutionChain } from "../contracts/IMessagePropertyResolutionChain.js";
import type { IEnterpriseMessagePropertyConfigurationSource } from "../contracts/IEnterpriseMessagePropertyConfigurationSource.js";

export abstract class AbstractBaseMessagePropertyResolutionChain implements IMessagePropertyResolutionChain {
  protected readonly sources: IEnterpriseMessagePropertyConfigurationSource[] = [];

  abstract getChainName(): string;
  abstract getChainVersion(): string;

  registerSource(source: IEnterpriseMessagePropertyConfigurationSource): void {
    this.sources.push(source);
    this.sources.sort((a, b) => b.getSourcePriority() - a.getSourcePriority());
  }

  resolveProperty(propertyKey: string): string {
    for (const source of this.sources) {
      const value = source.getPropertyValue(propertyKey);
      if (value !== null) {
        return value;
      }
    }
    throw new Error(
      `[${this.getChainName()}] Unresolvable property key: ${propertyKey}. No source in the resolution chain could provide a value.`,
    );
  }

  resolvePropertyWithFallback(propertyKey: string, defaultValue: string): string {
    for (const source of this.sources) {
      const value = source.getPropertyValue(propertyKey);
      if (value !== null) {
        return value;
      }
    }
    return defaultValue;
  }

  getRegisteredSourceNames(): readonly string[] {
    return this.sources.map((s) => s.getSourceName());
  }
}
