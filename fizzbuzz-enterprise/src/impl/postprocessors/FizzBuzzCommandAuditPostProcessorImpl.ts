import { AbstractBaseFizzBuzzCommandPostProcessor } from "../../abstracts/AbstractBaseFizzBuzzCommandPostProcessor.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";

export class FizzBuzzCommandAuditPostProcessorImpl extends AbstractBaseFizzBuzzCommandPostProcessor {
  private static readonly POST_PROCESSOR_NAME = "FizzBuzzCommandAuditPostProcessor";
  private static readonly POST_PROCESSOR_ORDER = 500;

  override postProcessCommand(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    durationMs: number,
  ): IFizzBuzzComputationResponse {
    this.validatePostProcessorInputs(command, request, response);

    response.setComputationDurationMs(durationMs);

    console.debug(
      `[FizzBuzzCommandAuditPostProcessor] Command=${command.getCommandName()}, ` +
      `Request=${request.getRequestId()}, Value=${request.getRequestedValue()}, ` +
      `Result=${response.getComputedResult()}, Duration=${durationMs.toFixed(2)}ms, ` +
      `StatusCode=${response.getResponseStatusCode()}`,
    );

    return response;
  }

  override getPostProcessorName(): string {
    return FizzBuzzCommandAuditPostProcessorImpl.POST_PROCESSOR_NAME;
  }

  override getPostProcessorOrder(): number {
    return FizzBuzzCommandAuditPostProcessorImpl.POST_PROCESSOR_ORDER;
  }
}
