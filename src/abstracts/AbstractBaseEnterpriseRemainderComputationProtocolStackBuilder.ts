import type { IEnterpriseRemainderComputationProtocolLayer } from "../contracts/IEnterpriseRemainderComputationProtocolLayer.js";
import type { IEnterpriseRemainderComputationProtocolStack } from "../contracts/IEnterpriseRemainderComputationProtocolStack.js";
import type { IEnterpriseRemainderComputationProtocolStackBuilder } from "../contracts/IEnterpriseRemainderComputationProtocolStackBuilder.js";

export abstract class AbstractBaseEnterpriseRemainderComputationProtocolStackBuilder
  implements IEnterpriseRemainderComputationProtocolStackBuilder
{
  protected readonly layers: Map<number, IEnterpriseRemainderComputationProtocolLayer> = new Map();

  abstract getBuilderName(): string;
  abstract getBuilderVersion(): string;
  abstract build(): IEnterpriseRemainderComputationProtocolStack;

  withLayer(layer: IEnterpriseRemainderComputationProtocolLayer): IEnterpriseRemainderComputationProtocolStackBuilder {
    this.layers.set(layer.getLayerNumber(), layer);
    return this;
  }

  withLayerAtPosition(
    layer: IEnterpriseRemainderComputationProtocolLayer,
    position: number,
  ): IEnterpriseRemainderComputationProtocolStackBuilder {
    this.layers.set(position, layer);
    return this;
  }

  withoutLayer(layerNumber: number): IEnterpriseRemainderComputationProtocolStackBuilder {
    this.layers.delete(layerNumber);
    return this;
  }

  withLayers(layers: readonly IEnterpriseRemainderComputationProtocolLayer[]): IEnterpriseRemainderComputationProtocolStackBuilder {
    for (const layer of layers) {
      this.layers.set(layer.getLayerNumber(), layer);
    }
    return this;
  }

  reset(): void {
    this.layers.clear();
  }

  protected getSortedLayers(): IEnterpriseRemainderComputationProtocolLayer[] {
    return Array.from(this.layers.values()).sort((a, b) => b.getLayerNumber() - a.getLayerNumber());
  }
}
