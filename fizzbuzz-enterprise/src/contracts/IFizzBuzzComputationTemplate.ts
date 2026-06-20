import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";
import type { IFizzBuzzCommandPostProcessorChain } from "./IFizzBuzzCommandPostProcessorChain.js";

export interface IFizzBuzzComputationTemplate {
  executeComputation(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse;
  getTemplateName(): string;
  getTemplateVersion(): string;
  getPostProcessorChain(): IFizzBuzzCommandPostProcessorChain;
}
