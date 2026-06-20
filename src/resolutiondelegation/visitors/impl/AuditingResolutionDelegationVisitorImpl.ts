import { AbstractBaseResolutionDelegationVisitor } from "../abstracts/AbstractBaseResolutionDelegationVisitor.js";

const VISITOR_NAME = "AuditingResolutionDelegationVisitor";
const VISITOR_VERSION = "1.0.0-DELEGATION-AUDIT-VISITOR";
const VISITOR_DESCRIPTOR = "RESOLUTION_DELEGATION_AUDIT_TRAIL_VISITOR";

export class AuditingResolutionDelegationVisitorImpl extends AbstractBaseResolutionDelegationVisitor {
  protected readonly visitorName: string = VISITOR_NAME;
  protected readonly visitorVersion: string = VISITOR_VERSION;
  protected readonly visitorDescriptor: string = VISITOR_DESCRIPTOR;

  private preResolutionCount: number = 0;
  private postResolutionCount: number = 0;
  private preRangeResolutionCount: number = 0;
  private postRangeResolutionCount: number = 0;

  visitPreResolution(_value: number, _orchestratorContext: string): void {
    this.preResolutionCount++;
  }

  visitPostResolution(_value: number, _result: string, _orchestratorContext: string): void {
    this.postResolutionCount++;
  }

  visitPreRangeResolution(_start: number, _end: number, _orchestratorContext: string): void {
    this.preRangeResolutionCount++;
  }

  visitPostRangeResolution(
    _start: number,
    _end: number,
    _results: readonly string[],
    _orchestratorContext: string,
  ): void {
    this.postRangeResolutionCount++;
  }

  getPreResolutionCount(): number { return this.preResolutionCount; }
  getPostResolutionCount(): number { return this.postResolutionCount; }
  getPreRangeResolutionCount(): number { return this.preRangeResolutionCount; }
  getPostRangeResolutionCount(): number { return this.postRangeResolutionCount; }

  getTotalVisitationCount(): number {
    return this.preResolutionCount + this.postResolutionCount +
      this.preRangeResolutionCount + this.postRangeResolutionCount;
  }
}
