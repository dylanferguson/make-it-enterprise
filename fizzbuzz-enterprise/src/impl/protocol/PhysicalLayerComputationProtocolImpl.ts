import { AbstractBaseEnterpriseRemainderComputationProtocolLayer } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "../../contracts/IComputationProtocolContext.js";

export class PhysicalLayerComputationProtocolImpl extends AbstractBaseEnterpriseRemainderComputationProtocolLayer {
  private static readonly LAYER_NUMBER = 1;
  private static readonly LAYER_IDENTIFIER = "PhysicalLayer";
  private static readonly LAYER_DESCRIPTION = "Physical layer: performs the native modulo arithmetic operation";

  override getLayerIdentifier(): string {
    return PhysicalLayerComputationProtocolImpl.LAYER_IDENTIFIER;
  }

  override getLayerNumber(): number {
    return PhysicalLayerComputationProtocolImpl.LAYER_NUMBER;
  }

  override getLayerDescription(): string {
    return PhysicalLayerComputationProtocolImpl.LAYER_DESCRIPTION;
  }

  override processLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    return this.templateMethodProcessLayer(dividend, divisor, context);
  }

  protected override executeLayerComputation(
    dividend: number,
    divisor: number,
    _context: IComputationProtocolContext,
  ): number {
    let result = dividend % divisor;
    if (Object.is(result, -0)) {
      result = 0;
    }
    if (result < 0) {
      result = Math.abs(result);
    }
    return result;
  }
}
