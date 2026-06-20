import type { IModuloArithmeticStrategyProvider } from "./IModuloArithmeticStrategyProvider.js";

export interface IDeploymentDescriptorEntry {
  getBeanName(): string;
  getBeanClassName(): string;
  getInitParameters(): Record<string, string>;
  getReferenceNames(): readonly string[];
}

export interface IDeploymentDescriptorReader {
  readDescriptor(): readonly IDeploymentDescriptorEntry[];
  getDescriptorName(): string;
  getDescriptorVersion(): string;
  configureFromDescriptor(provider: IModuloArithmeticStrategyProvider): void;
}
