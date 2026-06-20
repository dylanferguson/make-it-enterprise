import { AbstractBaseFizzBuzzComputationTemplate } from "../../abstracts/AbstractBaseFizzBuzzComputationTemplate.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzCommandPostProcessorChain } from "../../contracts/IFizzBuzzCommandPostProcessorChain.js";

export class StandardFizzBuzzComputationTemplateImpl extends AbstractBaseFizzBuzzComputationTemplate {
  private static readonly TEMPLATE_NAME = "StandardFizzBuzzComputationTemplate";
  private static readonly TEMPLATE_VERSION = "1.0.0-TEMPLATE";

  constructor(postProcessorChain: IFizzBuzzCommandPostProcessorChain) {
    super(postProcessorChain);
  }

  override executeComputation(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse {
    this.preExecutionHook(command, request);

    let response: IFizzBuzzComputationResponse;
    const startTime = performance.now();

    try {
      response = command.execute(request);
    } catch (error) {
      return this.handleExecutionError(
        command,
        request,
        error instanceof Error ? error : new Error(String(error)),
      );
    }

    const durationMs = performance.now() - startTime;

    this.postExecutionHook(command, request, response, durationMs);

    const postProcessors = this.postProcessorChain.getPostProcessors();
    for (const processor of postProcessors) {
      response = processor.postProcessCommand(command, request, response, durationMs);
    }

    return response;
  }

  override getTemplateName(): string {
    return StandardFizzBuzzComputationTemplateImpl.TEMPLATE_NAME;
  }

  override getTemplateVersion(): string {
    return StandardFizzBuzzComputationTemplateImpl.TEMPLATE_VERSION;
  }
}
