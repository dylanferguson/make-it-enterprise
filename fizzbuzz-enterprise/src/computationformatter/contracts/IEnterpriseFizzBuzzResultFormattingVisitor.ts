export interface IEnterpriseFizzBuzzResultFormattingVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  getVisitorDescriptor(): string;
  visitFormattedResult(resolvedValue: string, originalInput: number, bridgeContext: string): string;
}
