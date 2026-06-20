import { AbstractBaseEnterpriseRemainderComputationProtocolLayer } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "../../contracts/IComputationProtocolContext.js";

export class PresentationLayerComputationProtocolImpl extends AbstractBaseEnterpriseRemainderComputationProtocolLayer {
  private static readonly LAYER_NUMBER = 6;
  private static readonly LAYER_IDENTIFIER = "PresentationLayer";
  private static readonly LAYER_DESCRIPTION = "Presentation layer: encodes and formats computation results";

  override getLayerIdentifier(): string {
    return PresentationLayerComputationProtocolImpl.LAYER_IDENTIFIER;
  }

  override getLayerNumber(): number {
    return PresentationLayerComputationProtocolImpl.LAYER_NUMBER;
  }

  override getLayerDescription(): string {
    return PresentationLayerComputationProtocolImpl.LAYER_DESCRIPTION;
  }

  override processLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    return this.templateMethodProcessLayer(dividend, divisor, context);
  }

  protected override executeLayerComputation(
    dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): number {
    return this.proceedToNextLayer(dividend, divisor, context);
  }

  protected override postProcessLayer(
    _dividend: number,
    _divisor: number,
    result: number,
    context: IComputationProtocolContext,
  ): number {
    if (Object.is(result, -0)) {
      context.setAttribute("presentationLayer.negativeZeroCorrected", true);
      return 0;
    }
    if (result < 0) {
      context.setAttribute("presentationLayer.negativeResultNormalized", true);
      return Math.abs(result);
    }
    if (!Number.isInteger(result)) {
      context.setAttribute("presentationLayer.nonIntegerResult", true);
      return Math.trunc(result);
    }
    context.setAttribute("presentationLayer.resultPreserved", true);
    return result;
  }
}
