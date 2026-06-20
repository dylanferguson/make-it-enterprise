import type { IFizzBuzzComputationTemplate } from "../contracts/IFizzBuzzComputationTemplate.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzCommandPostProcessorChain } from "../contracts/IFizzBuzzCommandPostProcessorChain.js";

export abstract class AbstractBaseFizzBuzzComputationTemplate implements IFizzBuzzComputationTemplate {
  protected static readonly DEFAULT_TEMPLATE_VERSION = "1.0.0-TEMPLATE";
  protected readonly postProcessorChain: IFizzBuzzCommandPostProcessorChain;

  constructor(postProcessorChain: IFizzBuzzCommandPostProcessorChain) {
    this.postProcessorChain = postProcessorChain;
  }

  abstract executeComputation(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse;

  abstract getTemplateName(): string;

  abstract getTemplateVersion(): string;

  getPostProcessorChain(): IFizzBuzzCommandPostProcessorChain {
    return this.postProcessorChain;
  }

  protected preExecutionHook(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
  ): void {
  }

  protected postExecutionHook(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    durationMs: number,
  ): void {
  }

  protected handleExecutionError(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    error: Error,
  ): IFizzBuzzComputationResponse {
    throw error;
  }
}
