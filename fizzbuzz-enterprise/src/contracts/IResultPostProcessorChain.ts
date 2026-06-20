import type { IResultPostProcessor } from "./IResultPostProcessor.js";

export interface IResultPostProcessorChain {
  addPostProcessor(processor: IResultPostProcessor): void;
  process(input: number, result: string): string;
  getProcessorCount(): number;
}
