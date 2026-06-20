export interface IResultPostProcessor {
  postProcess(input: number, result: string): string;
  getPostProcessorName(): string;
  getPostProcessorPriority(): number;
}
