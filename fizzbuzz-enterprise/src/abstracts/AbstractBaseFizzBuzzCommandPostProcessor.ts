import type { IFizzBuzzCommandPostProcessor } from "../contracts/IFizzBuzzCommandPostProcessor.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";

export abstract class AbstractBaseFizzBuzzCommandPostProcessor implements IFizzBuzzCommandPostProcessor {
  protected static readonly DEFAULT_POST_PROCESSOR_ORDER = 1000;

  abstract postProcessCommand(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
    durationMs: number,
  ): IFizzBuzzComputationResponse;

  abstract getPostProcessorName(): string;

  abstract getPostProcessorOrder(): number;

  protected validatePostProcessorInputs(
    command: IFizzBuzzComputationCommand,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse,
  ): void {
    if (!command) {
      throw new Error("[AbstractBaseFizzBuzzCommandPostProcessor] Command must not be null");
    }
    if (!request) {
      throw new Error("[AbstractBaseFizzBuzzCommandPostProcessor] Request must not be null");
    }
    if (!response) {
      throw new Error("[AbstractBaseFizzBuzzCommandPostProcessor] Response must not be null");
    }
  }

  protected static POST_PROCESSOR_REGISTRY: Map<string, IFizzBuzzCommandPostProcessor> = new Map();

  static registerGlobalPostProcessor(processor: IFizzBuzzCommandPostProcessor): void {
    AbstractBaseFizzBuzzCommandPostProcessor.POST_PROCESSOR_REGISTRY.set(
      processor.getPostProcessorName(),
      processor,
    );
  }

  static getGlobalPostProcessor(name: string): IFizzBuzzCommandPostProcessor | undefined {
    return AbstractBaseFizzBuzzCommandPostProcessor.POST_PROCESSOR_REGISTRY.get(name);
  }
}
