import { AbstractBaseFizzBuzzComputationRequestBuilder } from "../../abstracts/AbstractBaseFizzBuzzComputationRequestBuilder.js";
import type { IFizzBuzzComputationRequestBuilder } from "../../contracts/IFizzBuzzComputationRequestBuilder.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import { FizzBuzzComputationRequestImpl } from "../dto/FizzBuzzComputationRequestImpl.js";

export class FizzBuzzComputationRequestBuilderImpl
  extends AbstractBaseFizzBuzzComputationRequestBuilder
  implements IFizzBuzzComputationRequestBuilder
{
  private static readonly BUILDER_NAME = "FizzBuzzComputationRequestBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-BUILDER";

  override withRequestedValue(value: number): IFizzBuzzComputationRequestBuilder {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(`[FizzBuzzComputationRequestBuilderImpl] Invalid requested value: ${value}`);
    }
    this.requestedValue = value;
    return this;
  }

  override withRequestOrigin(origin: string): IFizzBuzzComputationRequestBuilder {
    this.requestOrigin = origin;
    return this;
  }

  override withComputationContext(context: string): IFizzBuzzComputationRequestBuilder {
    this.computationContext = context;
    return this;
  }

  override withRequestIdPrefix(prefix: string): IFizzBuzzComputationRequestBuilder {
    this.requestIdPrefix = prefix;
    return this;
  }

  override build(): IFizzBuzzComputationRequest {
    const requestId = this.generateRequestId();
    const request = new FizzBuzzComputationRequestImpl(
      this.requestedValue,
      requestId,
      this.requestOrigin,
    );
    request.setComputationContext(this.computationContext);
    return request;
  }

  override reset(): IFizzBuzzComputationRequestBuilder {
    this.resetInternals();
    return this;
  }

  override getBuilderName(): string {
    return FizzBuzzComputationRequestBuilderImpl.BUILDER_NAME;
  }

  override getBuilderVersion(): string {
    return FizzBuzzComputationRequestBuilderImpl.BUILDER_VERSION;
  }
}
