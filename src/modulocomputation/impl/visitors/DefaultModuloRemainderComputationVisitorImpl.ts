import { AbstractBaseModuloRemainderComputationVisitor } from "../../abstracts/AbstractBaseModuloRemainderComputationVisitor.js";

export class DefaultModuloRemainderComputationVisitorImpl
  extends AbstractBaseModuloRemainderComputationVisitor
{
  private static readonly VISITOR_NAME = "DefaultModuloRemainderComputationVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-DEFAULT-VISITOR";

  private operationCount: number;
  private divisibleCount: number;
  private nonDivisibleCount: number;

  constructor() {
    super(
      DefaultModuloRemainderComputationVisitorImpl.VISITOR_NAME,
      DefaultModuloRemainderComputationVisitorImpl.VISITOR_VERSION,
    );
    this.operationCount = 0;
    this.divisibleCount = 0;
    this.nonDivisibleCount = 0;
  }

  visitModuloOperation(value: number, divisor: number, remainder: number): void {
    this.operationCount++;
    this.appendToLog(
      `operation=[${value} % ${divisor}], remainder=[${remainder}], visitSequence=[${this.operationCount}]`,
    );
  }

  visitModuloResult(remainder: number, isDivisible: boolean): void {
    if (isDivisible) {
      this.divisibleCount++;
    } else {
      this.nonDivisibleCount++;
    }
    this.appendToLog(
      `result: remainder=[${remainder}], isDivisible=[${isDivisible}], ` +
      `totals={operations=[${this.operationCount}], divisible=[${this.divisibleCount}], nonDivisible=[${this.nonDivisibleCount}]}`,
    );
  }

  getOperationCount(): number {
    return this.operationCount;
  }

  getDivisibleCount(): number {
    return this.divisibleCount;
  }

  getNonDivisibleCount(): number {
    return this.nonDivisibleCount;
  }
}
