import type { IEnterpriseRemainderComputationProtocolStack } from "./IEnterpriseRemainderComputationProtocolStack.js";

export interface IEnterpriseRemainderComputationProtocolStackFactory {
  createProtocolStack(): IEnterpriseRemainderComputationProtocolStack;
  createProtocolStackWithCustomLayers(layerIdentifiers: readonly string[]): IEnterpriseRemainderComputationProtocolStack;
  getFactoryName(): string;
  getFactoryVersion(): string;
  getSupportedLayerIdentifiers(): readonly string[];
}
