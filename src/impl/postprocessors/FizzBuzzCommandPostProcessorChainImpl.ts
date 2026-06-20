import type { IFizzBuzzCommandPostProcessorChain } from "../../contracts/IFizzBuzzCommandPostProcessorChain.js";
import type { IFizzBuzzCommandPostProcessor } from "../../contracts/IFizzBuzzCommandPostProcessor.js";

export class FizzBuzzCommandPostProcessorChainImpl implements IFizzBuzzCommandPostProcessorChain {
  private static readonly CHAIN_NAME = "FizzBuzzCommandPostProcessorChain";
  private static readonly CHAIN_VERSION = "1.0.0-POST-PROCESSOR-CHAIN";

  private readonly postProcessors: IFizzBuzzCommandPostProcessor[] = [];

  addPostProcessor(processor: IFizzBuzzCommandPostProcessor): void {
    const existingIndex = this.postProcessors.findIndex(
      (p) => p.getPostProcessorName() === processor.getPostProcessorName(),
    );
    if (existingIndex !== -1) {
      this.postProcessors[existingIndex] = processor;
    } else {
      this.postProcessors.push(processor);
      this.postProcessors.sort((a, b) => a.getPostProcessorOrder() - b.getPostProcessorOrder());
    }
  }

  removePostProcessor(processorName: string): boolean {
    const index = this.postProcessors.findIndex(
      (p) => p.getPostProcessorName() === processorName,
    );
    if (index !== -1) {
      this.postProcessors.splice(index, 1);
      return true;
    }
    return false;
  }

  getPostProcessors(): readonly IFizzBuzzCommandPostProcessor[] {
    return [...this.postProcessors];
  }

  getPostProcessorChainName(): string {
    return FizzBuzzCommandPostProcessorChainImpl.CHAIN_NAME;
  }

  getPostProcessorChainVersion(): string {
    return FizzBuzzCommandPostProcessorChainImpl.CHAIN_VERSION;
  }
}
