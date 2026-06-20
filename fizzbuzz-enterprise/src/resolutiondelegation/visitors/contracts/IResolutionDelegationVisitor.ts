export interface IResolutionDelegationVisitor {
  visitPreResolution(value: number, orchestratorContext: string): void;
  visitPostResolution(value: number, result: string, orchestratorContext: string): void;
  visitPreRangeResolution(start: number, end: number, orchestratorContext: string): void;
  visitPostRangeResolution(
    start: number,
    end: number,
    results: readonly string[],
    orchestratorContext: string,
  ): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
  getVisitorDescriptor(): string;
}
