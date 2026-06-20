import type { IModularArithmeticDivisibilityResolutionMediationVisitor } from "../contracts/IModularArithmeticDivisibilityResolutionMediationVisitor.js";

export abstract class AbstractBaseModularArithmeticDivisibilityResolutionMediationVisitor
  implements IModularArithmeticDivisibilityResolutionMediationVisitor
{
  private static readonly DEFAULT_VISITOR_VERSION = "1.0.0-BASE-VISITOR";

  private readonly visitorName: string;
  private readonly visitorVersion: string;
  private visitCount: number = 0;

  constructor(
    visitorName: string,
    visitorVersion: string = AbstractBaseModularArithmeticDivisibilityResolutionMediationVisitor.DEFAULT_VISITOR_VERSION,
  ) {
    this.visitorName = visitorName;
    this.visitorVersion = visitorVersion;
  }

  getVisitorName(): string {
    return this.visitorName;
  }

  getVisitorVersion(): string {
    return this.visitorVersion;
  }

  getVisitCount(): number {
    return this.visitCount;
  }

  abstract visitMediatorEvaluation(value: number, divisor: number): boolean;

  protected incrementVisitCount(): void {
    this.visitCount++;
  }
}
