import { AbstractBaseModularArithmeticDivisibilityResolutionMediationVisitor } from "../../abstracts/AbstractBaseModularArithmeticDivisibilityResolutionMediationVisitor.js";
import type { IModularArithmeticDivisibilityResolutionMediatorProvider } from "../../contracts/IModularArithmeticDivisibilityResolutionMediatorProvider.js";

export class DelegatingModularArithmeticDivisibilityResolutionMediationVisitorImpl
  extends AbstractBaseModularArithmeticDivisibilityResolutionMediationVisitor
{
  private static readonly VISITOR_NAME = "DelegatingModularArithmeticDivisibilityResolutionMediationVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-DELEGATING-VISITOR";

  private readonly mediatorProvider: IModularArithmeticDivisibilityResolutionMediatorProvider;

  constructor(mediatorProvider: IModularArithmeticDivisibilityResolutionMediatorProvider) {
    super(
      DelegatingModularArithmeticDivisibilityResolutionMediationVisitorImpl.VISITOR_NAME,
      DelegatingModularArithmeticDivisibilityResolutionMediationVisitorImpl.VISITOR_VERSION,
    );
    this.mediatorProvider = mediatorProvider;
  }

  override visitMediatorEvaluation(value: number, divisor: number): boolean {
    this.incrementVisitCount();
    const mediator = this.mediatorProvider.resolveMediator(divisor);
    return mediator.isDivisibleBy(value);
  }

  getMediatorProvider(): IModularArithmeticDivisibilityResolutionMediatorProvider {
    return this.mediatorProvider;
  }
}
