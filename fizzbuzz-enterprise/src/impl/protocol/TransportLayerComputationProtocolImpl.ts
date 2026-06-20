import { AbstractBaseEnterpriseRemainderComputationProtocolLayer } from "../../abstracts/AbstractBaseEnterpriseRemainderComputationProtocolLayer.js";
import type { IComputationProtocolContext } from "../../contracts/IComputationProtocolContext.js";

export class TransportLayerComputationProtocolImpl extends AbstractBaseEnterpriseRemainderComputationProtocolLayer {
  private static readonly LAYER_NUMBER = 4;
  private static readonly LAYER_IDENTIFIER = "TransportLayer";
  private static readonly LAYER_DESCRIPTION = "Transport layer: provides reliable computation with retry and error recovery";
  private static readonly MAX_RETRY_ATTEMPTS = 2;

  private readonly maxRetryAttempts: number;
  private totalRetries: number = 0;

  constructor(maxRetryAttempts: number = TransportLayerComputationProtocolImpl.MAX_RETRY_ATTEMPTS) {
    super();
    this.maxRetryAttempts = maxRetryAttempts;
  }

  override getLayerIdentifier(): string {
    return TransportLayerComputationProtocolImpl.LAYER_IDENTIFIER;
  }

  override getLayerNumber(): number {
    return TransportLayerComputationProtocolImpl.LAYER_NUMBER;
  }

  override getLayerDescription(): string {
    return TransportLayerComputationProtocolImpl.LAYER_DESCRIPTION;
  }

  override processLayer(dividend: number, divisor: number, context: IComputationProtocolContext): number {
    return this.templateMethodProcessLayer(dividend, divisor, context);
  }

  getTotalRetries(): number {
    return this.totalRetries;
  }

  protected override executeLayerComputation(
    dividend: number,
    divisor: number,
    context: IComputationProtocolContext,
  ): number {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= this.maxRetryAttempts; attempt++) {
      try {
        if (attempt > 0) {
          this.totalRetries++;
          context.setAttribute(`transportLayer.retryAttempt.${attempt}`, performance.now());
        }
        return this.proceedToNextLayer(dividend, divisor, context);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (attempt < this.maxRetryAttempts) {
          context.setAttribute(`transportLayer.error.${attempt}`, lastError.message);
        }
      }
    }
    throw new Error(
      `[${this.getLayerIdentifier()} L${this.getLayerNumber()}] Transport error: ` +
      `computation failed after ${this.maxRetryAttempts + 1} attempts for ${dividend} / ${divisor}. ` +
      `Last error: ${lastError?.message ?? "Unknown"}`,
    );
  }
}
