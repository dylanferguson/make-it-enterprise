import type { IEnterpriseRemainderComputationProtocolLayer } from "./IEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "./IComputationProtocolContext.js";

export interface IEnterpriseRemainderComputationProtocolStack {
  computeRemainder(dividend: number, divisor: number): number;
  computeRemainderWithContext(dividend: number, divisor: number, context: IComputationProtocolContext): number;
  getStackName(): string;
  getStackVersion(): string;
  getRegisteredLayerCount(): number;
  getRegisteredLayers(): readonly IEnterpriseRemainderComputationProtocolLayer[];
  isOperational(): boolean;
}
