import type { IFizzBuzzCommandPostProcessor } from "./IFizzBuzzCommandPostProcessor.js";

export interface IFizzBuzzCommandPostProcessorChain {
  addPostProcessor(processor: IFizzBuzzCommandPostProcessor): void;
  removePostProcessor(processorName: string): boolean;
  getPostProcessors(): readonly IFizzBuzzCommandPostProcessor[];
  getPostProcessorChainName(): string;
  getPostProcessorChainVersion(): string;
}
