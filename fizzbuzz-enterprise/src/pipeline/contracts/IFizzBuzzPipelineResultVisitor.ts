export interface IFizzBuzzPipelineResultVisitor {
  visitPreSingleValueResolution(value: number, pipelineName: string): void;
  visitPostSingleValueResolution(value: number, result: string, pipelineName: string): void;
  visitPreRangeResolution(start: number, end: number, pipelineName: string): void;
  visitPostRangeResolution(start: number, end: number, results: readonly string[], pipelineName: string): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
}
