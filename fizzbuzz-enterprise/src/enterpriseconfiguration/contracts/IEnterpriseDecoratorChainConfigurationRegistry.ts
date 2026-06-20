import type { IEnterpriseConfigurationDescriptor } from "./IEnterpriseConfigurationDescriptor.js";

export interface IEnterpriseDecoratorChainConfigurationRegistry {
  isDecoratorEnabled(decoratorName: string): boolean;
  getDecoratorChainOrder(): readonly string[];
  setDecoratorEnabled(decoratorName: string, enabled: boolean): void;
  reloadConfigurationFromDescriptor(descriptor: IEnterpriseConfigurationDescriptor): void;
  getRegistryName(): string;
  getRegistryVersion(): string;
  getRegisteredDecoratorCount(): number;
  getRegisteredDecoratorNames(): readonly string[];
  getConfigurationProfileName(): string;
}
