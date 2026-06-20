import type { IEnterpriseRemainderComputationProtocolLayer } from "../contracts/IEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "../contracts/IComputationProtocolContext.js";

export abstract class AbstractBaseEnterpriseRemainderComputationProtocolLayer
  implements IEnterpriseRemainderComputationProtocolLayer
{
  private nextLayer: IEnterpriseRemainderComputationProtocolLayer | null = null;

  abstract processLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number;
  abstract getLayerIdentifier(): string;
  abstract getLayerNumber(): number;
  abstract getLayerDescription(): string;

  setNextLayer(layer: IEnterpriseRemainderComputationProtocolLayer): IEnterpriseRemainderComputationProtocolLayer {
    this.nextLayer = layer;
    return layer;
  }

  isLayerEnabled(): boolean {
    return true;
  }

  protected proceedToNextLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    context.recordLayerVisit(this.getLayerNumber(), this.getLayerIdentifier());
    if (this.nextLayer !== null) {
      return this.nextLayer.processLayer(dividend, divisor, context);
    }
    throw new Error(
      `[${this.getLayerIdentifier()} L${this.getLayerNumber()}] Protocol stack terminated: ` +
      `no further layer available to compute remainder for ${dividend} / ${divisor}`,
    );
  }

  protected templateMethodProcessLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    this.preProcessLayer(dividend, divisor, context);
    const result = this.executeLayerComputation(dividend, divisor, context);
    return this.postProcessLayer(dividend, divisor, result, context);
  }

  protected preProcessLayer(_dividend: number, _divisor: number, _context: IComputationProtocolContext): void {
  }

  protected abstract executeLayerComputation(
    dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): number;

  protected postProcessLayer(
    _dividend: number,
    _divisor: number,
    result: number,
    _context: IComputationProtocolContext,
  ): number {
    return result;
  }
}
