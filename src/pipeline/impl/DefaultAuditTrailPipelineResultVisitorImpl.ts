import { AbstractBaseFizzBuzzPipelineResultVisitor } from "../abstracts/AbstractBaseFizzBuzzPipelineResultVisitor.js";

export class DefaultAuditTrailPipelineResultVisitorImpl
  extends AbstractBaseFizzBuzzPipelineResultVisitor
{
  private static readonly VISITOR_NAME = "DefaultAuditTrailPipelineResultVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-PIPELINE-AUDIT-VISITOR";
  private singleValueResolutionCount = 0;
  private rangeResolutionCount = 0;

  override getVisitorName(): string {
    return DefaultAuditTrailPipelineResultVisitorImpl.VISITOR_NAME;
  }

  override getVisitorVersion(): string {
    return DefaultAuditTrailPipelineResultVisitorImpl.VISITOR_VERSION;
  }

  override visitPreSingleValueResolution(value: number, pipelineName: string): void {
    this.singleValueResolutionCount++;
    console.debug(
      `[${this.getVisitorName()}] Pipeline [${pipelineName}] pre-single-value: value=[${value}], ` +
      `cumulativeResolutions=[${this.singleValueResolutionCount}]`,
    );
  }

  override visitPostSingleValueResolution(value: number, result: string, pipelineName: string): void {
    console.debug(
      `[${this.getVisitorName()}] Pipeline [${pipelineName}] post-single-value: value=[${value}], ` +
      `result=[${result}]`,
    );
  }

  override visitPreRangeResolution(start: number, end: number, pipelineName: string): void {
    this.rangeResolutionCount++;
    console.debug(
      `[${this.getVisitorName()}] Pipeline [${pipelineName}] pre-range: range=[${start}-${end}], ` +
      `cumulativeRanges=[${this.rangeResolutionCount}]`,
    );
  }

  override visitPostRangeResolution(
    start: number,
    end: number,
    results: readonly string[],
    pipelineName: string,
  ): void {
    console.debug(
      `[${this.getVisitorName()}] Pipeline [${pipelineName}] post-range: range=[${start}-${end}], ` +
      `resultCount=[${results.length}], firstResult=[${results[0] ?? "N/A"}], lastResult=[${results[results.length - 1] ?? "N/A"}]`,
    );
  }

  getSingleValueResolutionCount(): number {
    return this.singleValueResolutionCount;
  }

  getRangeResolutionCount(): number {
    return this.rangeResolutionCount;
  }
}
