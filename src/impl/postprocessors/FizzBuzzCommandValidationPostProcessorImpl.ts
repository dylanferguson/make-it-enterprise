import { AbstractBaseFizzBuzzCommandPostProcessor } from "../../abstracts/AbstractBaseFizzBuzzCommandPostProcessor.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";

export class FizzBuzzCommandValidationPostProcessorImpl extends AbstractBaseFizzBuzzCommandPostProcessor {
  private static readonly POST_PROCESSOR_NAME = "FizzBuzzCommandValidationPostProcessor";
  private static readonly POST_PROCESSOR_ORDER = 100;

  override postProcessCommand(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    durationMs: number,
  ): IFizzBuzzComputationResponse {
    this.validatePostProcessorInputs(command, request, response);

    if (response.getResponseStatusCode() !== 200) {
      console.warn(
        `[FizzBuzzCommandValidationPostProcessor] Non-OK status code: ${response.getResponseStatusCode()}`,
      );
    }

    if (response.getComputedResult() === undefined || response.getComputedResult() === null) {
      response.setResponseStatusCode(500);
      console.error(
        `[FizzBuzzCommandValidationPostProcessor] Computed result was null/undefined for value: ${request.getRequestedValue()}`,
      );
    }

    return response;
  }

  override getPostProcessorName(): string {
    return FizzBuzzCommandValidationPostProcessorImpl.POST_PROCESSOR_NAME;
  }

  override getPostProcessorOrder(): number {
    return FizzBuzzCommandValidationPostProcessorImpl.POST_PROCESSOR_ORDER;
  }
}
