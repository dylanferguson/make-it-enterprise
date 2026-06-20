import { AbstractBaseEnterpriseRemainderComputationProtocolLayer } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "../../contracts/IComputationProtocolContext.js";

export class DataLinkLayerComputationProtocolImpl extends AbstractBaseEnterpriseRemainderComputationProtocolLayer {
  private static readonly LAYER_NUMBER = 2;
  private static readonly LAYER_IDENTIFIER = "DataLinkLayer";
  private static readonly LAYER_DESCRIPTION = "Data link layer: validates operand framing and transaction boundaries";

  override getLayerIdentifier(): string {
    return DataLinkLayerComputationProtocolImpl.LAYER_IDENTIFIER;
  }

  override getLayerNumber(): number {
    return DataLinkLayerComputationProtocolImpl.LAYER_NUMBER;
  }

  override getLayerDescription(): string {
    return DataLinkLayerComputationProtocolImpl.LAYER_DESCRIPTION;
  }

  override processLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    return this.templateMethodProcessLayer(dividend, divisor, context);
  }

  protected override preProcessLayer(dividend: number, divisor: number, _context: IComputationProtocolContext): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.getLayerIdentifier()} L${this.getLayerNumber()}] Framing error: dividend must be finite, received: ${dividend}`,
      );
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(
        `[${this.getLayerIdentifier()} L${this.getLayerNumber()}] Framing error: divisor must be finite, received: ${divisor}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.getLayerIdentifier()} L${this.getLayerNumber()}] Division by zero intercepted at data link layer`,
      );
    }
  }

  protected override executeLayerComputation(
    dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): number {
    const truncatedDividend = Math.trunc(dividend);
    const truncatedDivisor = Math.trunc(divisor);
    context.setAttribute("dataLink.truncatedDividend", truncatedDividend);
    context.setAttribute("dataLink.truncatedDivisor", truncatedDivisor);
    return this.proceedToNextLayer(truncatedDividend, truncatedDivisor, context);
  }
}
