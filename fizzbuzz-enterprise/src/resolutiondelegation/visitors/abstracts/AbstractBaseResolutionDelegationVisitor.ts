import type { IResolutionDelegationVisitor } from "../contracts/IResolutionDelegationVisitor.js";

export abstract class AbstractBaseResolutionDelegationVisitor
  implements IResolutionDelegationVisitor
{
  protected abstract get visitorName(): string;
  protected abstract get visitorVersion(): string;
  protected abstract get visitorDescriptor(): string;

  getVisitorName(): string { return this.visitorName; }
  getVisitorVersion(): string { return this.visitorVersion; }
  getVisitorDescriptor(): string { return this.visitorDescriptor; }

  abstract visitPreResolution(value: number, orchestratorContext: string): void;
  abstract visitPostResolution(value: number, result: string, orchestratorContext: string): void;
  abstract visitPreRangeResolution(start: number, end: number, orchestratorContext: string): void;
  abstract visitPostRangeResolution(
    start: number,
    end: number,
    results: readonly string[],
    orchestratorContext: string,
  ): void;
}
