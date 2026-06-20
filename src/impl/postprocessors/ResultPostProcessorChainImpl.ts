import type { IResultPostProcessor } from "../../contracts/IResultPostProcessor.js";
import type { IResultPostProcessorChain } from "../../contracts/IResultPostProcessorChain.js";

export class ResultPostProcessorChainImpl implements IResultPostProcessorChain {
  private readonly processors: IResultPostProcessor[] = [];

  addPostProcessor(processor: IResultPostProcessor): void {
    this.processors.push(processor);
    this.processors.sort((a, b) => b.getPostProcessorPriority() - a.getPostProcessorPriority());
  }

  process(input: number, result: string): string {
    let transformed = result;
    for (const processor of this.processors) {
      transformed = processor.postProcess(input, transformed);
    }
    return transformed;
  }

  getProcessorCount(): number {
    return this.processors.length;
  }
}
