import type { AuditTrailEntry } from "../contracts/IEnterpriseFizzBuzzResolutionAuditTrailVisitor.js";
import { AbstractBaseEnterpriseFizzBuzzResolutionAuditTrailVisitor } from "../abstracts/AbstractBaseEnterpriseFizzBuzzResolutionAuditTrailVisitor.js";

export class StandardEnterpriseFizzBuzzResolutionAuditTrailVisitorImpl
  extends AbstractBaseEnterpriseFizzBuzzResolutionAuditTrailVisitor
{
  private static readonly VISITOR_NAME = "StandardEnterpriseFizzBuzzResolutionAuditTrailVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-RESOLUTION-AUDIT-VISITOR";

  private resolutionCount: number = 0;
  private specificationEvaluationCount: number = 0;
  private moduloArithmeticCount: number = 0;

  override getVisitorName(): string {
    return StandardEnterpriseFizzBuzzResolutionAuditTrailVisitorImpl.VISITOR_NAME;
  }

  override getVisitorVersion(): string {
    return StandardEnterpriseFizzBuzzResolutionAuditTrailVisitorImpl.VISITOR_VERSION;
  }

  override visitResolution(value: number, strategyName: string, result: string): void {
    this.resolutionCount++;
    this.recordEntry("RESOLUTION", { value, strategyName, result, sequenceNumber: this.resolutionCount });
    console.debug(
      `[${this.getVisitorName()}] Resolution #${this.resolutionCount}: value=${value}, strategy=${strategyName}, result="${result}"`,
    );
  }

  override visitSpecificationEvaluation(divisor: number, value: number, satisfied: boolean): void {
    this.specificationEvaluationCount++;
    this.recordEntry("SPECIFICATION_EVALUATION", {
      divisor,
      value,
      satisfied,
      sequenceNumber: this.specificationEvaluationCount,
    });
  }

  override visitModuloArithmeticInvocation(dividend: number, divisor: number, remainder: number): void {
    this.moduloArithmeticCount++;
    this.recordEntry("MODULO_ARITHMETIC_INVOCATION", {
      dividend,
      divisor,
      remainder,
      sequenceNumber: this.moduloArithmeticCount,
    });
  }

  getResolutionCount(): number {
    return this.resolutionCount;
  }

  getSpecificationEvaluationCount(): number {
    return this.specificationEvaluationCount;
  }

  getModuloArithmeticCount(): number {
    return this.moduloArithmeticCount;
  }
}
