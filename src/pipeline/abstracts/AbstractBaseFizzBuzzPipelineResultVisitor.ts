import type { IFizzBuzzPipelineResultVisitor } from "../contracts/IFizzBuzzPipelineResultVisitor.js";

export abstract class AbstractBaseFizzBuzzPipelineResultVisitor implements IFizzBuzzPipelineResultVisitor {
  abstract getVisitorName(): string;
  abstract getVisitorVersion(): string;

  visitPreSingleValueResolution(_value: number, _pipelineName: string): void {
  }

  visitPostSingleValueResolution(_value: number, _result: string, _pipelineName: string): void {
  }

  visitPreRangeResolution(_start: number, _end: number, _pipelineName: string): void {
  }

  visitPostRangeResolution(_start: number, _end: number, _results: readonly string[], _pipelineName: string): void {
  }
}
