import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IFizzBuzzCommandPostProcessor {
  postProcessCommand(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    durationMs: number,
  ): IFizzBuzzComputationResponse;
  getPostProcessorName(): string;
  getPostProcessorOrder(): number;
}
