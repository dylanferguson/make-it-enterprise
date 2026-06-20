import type { IEnterpriseRemainderComputationProtocolLayer } from "./IEnterpriseRemainderComputationProtocolLayer.js";
import type { IEnterpriseRemainderComputationProtocolStack } from "./IEnterpriseRemainderComputationProtocolStack.js";

export interface IEnterpriseRemainderComputationProtocolStackBuilder {
  withLayer(layer: IEnterpriseRemainderComputationProtocolLayer): IEnterpriseRemainderComputationProtocolStackBuilder;
  withLayerAtPosition(layer: IEnterpriseRemainderComputationProtocolLayer, position: number): IEnterpriseRemainderComputationProtocolStackBuilder;
  withoutLayer(layerNumber: number): IEnterpriseRemainderComputationProtocolStackBuilder;
  withLayers(layers: readonly IEnterpriseRemainderComputationProtocolLayer[]): IEnterpriseRemainderComputationProtocolStackBuilder;
  build(): IEnterpriseRemainderComputationProtocolStack;
  getBuilderName(): string;
  getBuilderVersion(): string;
  reset(): void;
}
