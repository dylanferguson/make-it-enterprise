import type { IComputationProtocolContext } from "./IComputationProtocolContext.js";

export interface IEnterpriseRemainderComputationProtocolLayer {
  processLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number;
  setNextLayer(layer: IEnterpriseRemainderComputationProtocolLayer): IEnterpriseRemainderComputationProtocolLayer;
  getLayerIdentifier(): string;
  getLayerNumber(): number;
  getLayerDescription(): string;
  isLayerEnabled(): boolean;
}
