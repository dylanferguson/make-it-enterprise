import type { IEnterpriseFizzBuzzResultFormattingVisitor } from "../contracts/IEnterpriseFizzBuzzResultFormattingVisitor.js";

export class StandardEnterpriseFizzBuzzResultFormattingVisitorImpl
  implements IEnterpriseFizzBuzzResultFormattingVisitor
{
  private static readonly VISITOR_NAME = "StandardEnterpriseFizzBuzzResultFormattingVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-FORMAT-VISITOR";
  private static readonly VISITOR_DESCRIPTOR = "STANDARD_RESULT_FORMATTING_VISITOR";

  private visitCount: number = 0;

  getVisitorName(): string {
    return StandardEnterpriseFizzBuzzResultFormattingVisitorImpl.VISITOR_NAME;
  }

  getVisitorVersion(): string {
    return StandardEnterpriseFizzBuzzResultFormattingVisitorImpl.VISITOR_VERSION;
  }

  getVisitorDescriptor(): string {
    return StandardEnterpriseFizzBuzzResultFormattingVisitorImpl.VISITOR_DESCRIPTOR;
  }

  visitFormattedResult(resolvedValue: string, originalInput: number, bridgeContext: string): string {
    this.visitCount++;
    console.debug(
      `[${StandardEnterpriseFizzBuzzResultFormattingVisitorImpl.VISITOR_NAME} v${StandardEnterpriseFizzBuzzResultFormattingVisitorImpl.VISITOR_VERSION}] ` +
      `Visiting formatted result: ` +
      `resolvedValue=[${resolvedValue}], ` +
      `originalInput=[${originalInput}], ` +
      `bridgeContext=[${bridgeContext}], ` +
      `visitCount=[${this.visitCount}]`,
    );
    return resolvedValue;
  }

  getVisitCount(): number {
    return this.visitCount;
  }
}
