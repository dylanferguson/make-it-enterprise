import { AbstractBaseEnterpriseRemainderComputationProtocolLayer } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "../../contracts/IComputationProtocolContext.js";

export class ApplicationLayerComputationProtocolImpl extends AbstractBaseEnterpriseRemainderComputationProtocolLayer {
  private static readonly LAYER_NUMBER = 7;
  private static readonly LAYER_IDENTIFIER = "ApplicationLayer";
  private static readonly LAYER_DESCRIPTION = "Application layer: entry point for enterprise remainder computation requests";

  override getLayerIdentifier(): string {
    return ApplicationLayerComputationProtocolImpl.LAYER_IDENTIFIER;
  }

  override getLayerNumber(): number {
    return ApplicationLayerComputationProtocolImpl.LAYER_NUMBER;
  }

  override getLayerDescription(): string {
    return ApplicationLayerComputationProtocolImpl.LAYER_DESCRIPTION;
  }

  override processLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    return this.templateMethodProcessLayer(dividend, divisor, context);
  }

  protected override preProcessLayer(
    dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): void {
    context.setAttribute("applicationLayer.requestedDividend", dividend);
    context.setAttribute("applicationLayer.requestedDivisor", divisor);
    context.setAttribute("applicationLayer.entryTimestamp", performance.now());
  }

  protected override executeLayerComputation(
    dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): number {
    return this.proceedToNextLayer(dividend, divisor, context);
  }

  protected override postProcessLayer(
    dividend: number,
    divisor: number,
    result: number,
    context: IComputationProtocolContext,
  ): number {
    const exitTimestamp = performance.now();
    context.setAttribute("applicationLayer.exitTimestamp", exitTimestamp);
    context.setAttribute("applicationLayer.computationDurationMs", context.getTotalProcessingDurationMs());
    return result;
  }
}
