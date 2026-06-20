import type { IEnterpriseMessagePropertyConfigurationSource } from "./IEnterpriseMessagePropertyConfigurationSource.js";

export interface IMessagePropertyResolutionChain {
  resolveProperty(propertyKey: string): string;
  resolvePropertyWithFallback(propertyKey: string, defaultValue: string): string;
  registerSource(source: IEnterpriseMessagePropertyConfigurationSource): void;
  getChainName(): string;
  getChainVersion(): string;
  getRegisteredSourceNames(): readonly string[];
}
