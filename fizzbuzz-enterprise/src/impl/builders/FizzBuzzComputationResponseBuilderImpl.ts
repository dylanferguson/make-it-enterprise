import { AbstractBaseFizzBuzzComputationResponseBuilder } from "../../abstracts/AbstractBaseFizzBuzzComputationResponseBuilder.js";
import type { IFizzBuzzComputationResponseBuilder } from "../../contracts/IFizzBuzzComputationResponseBuilder.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";

export class FizzBuzzComputationResponseBuilderImpl
  extends AbstractBaseFizzBuzzComputationResponseBuilder
  implements IFizzBuzzComputationResponseBuilder
{
  private static readonly BUILDER_NAME = "FizzBuzzComputationResponseBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-BUILDER";

  override withResolvedValue(value: number): IFizzBuzzComputationResponseBuilder {
    this.resolvedValue = value;
    return this;
  }

  override withComputedResult(result: string): IFizzBuzzComputationResponseBuilder {
    this.computedResult = result;
    return this;
  }

  override withCorrelationRequestId(correlationId: string): IFizzBuzzComputationResponseBuilder {
    this.correlationRequestId = correlationId;
    return this;
  }

  override withResponseStatusCode(statusCode: number): IFizzBuzzComputationResponseBuilder {
    this.responseStatusCode = statusCode;
    return this;
  }

  override withComputationDurationMs(durationMs: number): IFizzBuzzComputationResponseBuilder {
    this.computationDurationMs = durationMs;
    return this;
  }

  override build(): IFizzBuzzComputationResponse {
    const responseId = this.generateResponseId();
    return new FizzBuzzComputationResponseImpl(
      this.resolvedValue,
      this.computedResult,
      responseId,
      this.correlationRequestId,
      this.responseStatusCode,
    );
  }

  override reset(): IFizzBuzzComputationResponseBuilder {
    this.resetInternals();
    return this;
  }

  override getBuilderName(): string {
    return FizzBuzzComputationResponseBuilderImpl.BUILDER_NAME;
  }

  override getBuilderVersion(): string {
    return FizzBuzzComputationResponseBuilderImpl.BUILDER_VERSION;
  }
}
