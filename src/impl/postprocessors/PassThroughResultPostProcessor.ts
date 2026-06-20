import type { IResultPostProcessor } from "../../contracts/IResultPostProcessor.js";

export class PassThroughResultPostProcessor implements IResultPostProcessor {
  postProcess(_input: number, result: string): string {
    return result;
  }

  getPostProcessorName(): string {
    return "PassThroughResultPostProcessor";
  }

  getPostProcessorPriority(): number {
    return 0;
  }
}
