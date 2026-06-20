import type { IModuloRemainderComputationVisitor } from "../contracts/index.js";

export abstract class AbstractBaseModuloRemainderComputationVisitor
  implements IModuloRemainderComputationVisitor
{
  protected static readonly VISITOR_FRAMEWORK_VERSION = "1.0.0-MRC-VISITOR-FRAMEWORK";

  protected readonly visitorName: string;
  protected readonly visitorVersion: string;
  protected readonly visitLog: string[];

  constructor(visitorName: string, visitorVersion: string) {
    this.visitorName = visitorName;
    this.visitorVersion = visitorVersion;
    this.visitLog = [];
  }

  abstract visitModuloOperation(value: number, divisor: number, remainder: number): void;
  abstract visitModuloResult(remainder: number, isDivisible: boolean): void;

  getVisitorName(): string {
    return this.visitorName;
  }

  getVisitorVersion(): string {
    return this.visitorVersion;
  }

  getVisitLog(): readonly string[] {
    return [...this.visitLog];
  }

  protected appendToLog(entry: string): void {
    this.visitLog.push(`[${new Date().toISOString()}] ${entry}`);
  }
}
